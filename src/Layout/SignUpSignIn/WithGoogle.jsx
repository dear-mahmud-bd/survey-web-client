import useAuth from "../../hooks/useAuth";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import { showToast } from "../../utility/useToast";
import { useLocation, useNavigate } from "react-router-dom";


const WithGoogle = () => {
    const { userSignInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoogleSignIn = () => {
        userSignInWithGoogle()
            .then((result) => {
                showToast('success', 'Sign In with Google');
                navigate(location?.state ? location.state : '/profile');
                const userInfo = { email: result.user?.email, user_role: 'user', pro_user: false };
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        if (res.data.insertedId) {
                            console.log("User Added ");
                        }
                    })
            })
            .catch(() => {
                showToast('error', 'Not Sign In via Google');
            });
    };
    return (
        <>
            <div className="mb-5 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm bg-white rounded p-1 tracking-wide font-medium transform translate-y-2/3">
                    Or
                </div>
            </div>
            <div className="mt-4">
                <button onClick={handleGoogleSignIn} type="button" className="w-full flex justify-center items-center gap-2 bg-gray-100 text-sm text-gray-600 p-2 rounded-md hover:bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4" id="google">
                        <path fill="#fbbb00" d="M113.47 309.408 95.648 375.94l-65.139 1.378C11.042 341.211 0 299.9 0 256c0-42.451 10.324-82.483 28.624-117.732h.014L86.63 148.9l25.404 57.644c-5.317 15.501-8.215 32.141-8.215 49.456.002 18.792 3.406 36.797 9.651 53.408z"></path> <path fill="#518ef8" d="M507.527 208.176C510.467 223.662 512 239.655 512 256c0 18.328-1.927 36.206-5.598 53.451-12.462 58.683-45.025 109.925-90.134 146.187l-.014-.014-73.044-3.727-10.338-64.535c29.932-17.554 53.324-45.025 65.646-77.911h-136.89V208.176h245.899z"></path> <path fill="#28b446" d="m416.253 455.624.014.014C372.396 490.901 316.666 512 256 512c-97.491 0-182.252-54.491-225.491-134.681l82.961-67.91c21.619 57.698 77.278 98.771 142.53 98.771 28.047 0 54.323-7.582 76.87-20.818l83.383 68.262z"></path> <path fill="#f14336" d="m419.404 58.936-82.933 67.896C313.136 112.246 285.552 103.82 256 103.82c-66.729 0-123.429 42.957-143.965 102.724l-83.397-68.276h-.014C71.23 56.123 157.06 0 256 0c62.115 0 119.068 22.126 163.404 58.936z"></path>
                    </svg>
                    Continue with Google
                </button>
            </div>
        </>
    );
};

export default WithGoogle;