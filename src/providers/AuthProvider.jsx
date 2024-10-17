import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import auth from '../Config/firebase.config';
import { axiosPublic } from '../hooks/useAxiosPublic';

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false));
    }

    const userSignIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
            .finally(() => setLoading(false));
    }

    const userSignOut = () => {
        setLoading(true);
        return signOut(auth)
            .finally(() => setLoading(false));
    }

    const userSignInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
            .finally(() => setLoading(false));
    }

    const userUpdateProfile = (name, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL,
        }).then(() => {
            setUser(prevUser => ({
                ...prevUser,
                displayName: name,
                photoURL: photoURL,
            }));
        }).finally(() => setLoading(false));
    };

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail };

            if (currentUser) {
                axiosPublic.post('/jwt', loggedUser)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false);
                        }
                    })
            } else {
                localStorage.removeItem('access-token');
                setLoading(false);
            }

        });
        return () => {
            return unSubscribe();
        };
    }, [user]);


    const authInfo = {
        user,
        loading,
        setUser,
        createUser,
        userSignIn,
        userSignOut,
        userSignInWithGoogle,
        userUpdateProfile,
    };
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};
export default AuthProvider;