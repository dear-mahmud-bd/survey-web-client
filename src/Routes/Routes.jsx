import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Surveys from "../Pages/Public/Surveys";
import SurveyDetails from "../Pages/Public/SurveyDetails";
import { axiosPublic } from "../hooks/useAxiosPublic";
import SignUp from "../Pages/Public/SignUp";
import SignIn from "../Pages/Public/SignIn";
import PrivateRoute from "./PrivateRoute";
import Membership from "../Pages/Public/Membership";
import UserProfile from "../Pages/Private/UserProfile";




const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        // errorElement: <ErrorElement />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/all-survey', element: <Surveys /> },
            {
                path: '/all-survey/:_id',
                element: <SurveyDetails />,
                loader: async ({ params }) => {
                    const res = await axiosPublic.get(`/all-survey/${params._id}`);
                    return res.data;
                }
            },
            { path: '/sign-in', element: <SignIn /> },
            { path: '/sign-up', element: <SignUp /> },
            { path: '/membership', element: <Membership /> },
            
            
            
            
            // { path: '*', element: <NotFound /> },
            
            
            // This are private route...
            { path: '/profile', element: <PrivateRoute> <UserProfile/> </PrivateRoute> },


        ]
    },
]);

export default router;