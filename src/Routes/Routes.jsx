import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import Surveys from "../Pages/Public/Surveys";
import SurveyDetails from "../Pages/Public/SurveyDetails";
import { axiosPublic } from "../hooks/useAxiosPublic";




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




            // { path: '*', element: <NotFound /> },


            // This are private route...


        ]
    },
]);

export default router;