import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { showToast } from "../utility/useToast";

// Create axios instance
const axiosSecure = axios.create({
    baseURL: 'https://survey-app-server-03.vercel.app',
    // withCredentials: true // this for http cookie
});

const useAxiosSecure = () => {
    const { userSignOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Request interceptor to add token to headers
        axiosSecure.interceptors.request.use(config => {
            console.log("Stoped by interceptor");

            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        }, error => {
            // Handle request error
            return Promise.reject(error);
        });

        // Response interceptor to handle 401/403 errors and network errors
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            // console.log('Error tracked in the interceptor:', error);
            if (!error.response) {
                showToast('error', 'Network error. Please try again later.');
                return Promise.reject(error);
            }
            // Handle 401 or 403 errors (unauthorized or forbidden)
            if (error.response.status === 401 || error.response.status === 403) {
                userSignOut()
                    .then(() => {
                        navigate('/sign-in');
                        showToast('success', 'Sign-out successful');
                    })
                    .catch(() => {
                        showToast('error', 'Sign-out unsuccessful');
                    });
            }
            return Promise.reject(error);
        });
    }, [userSignOut, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
