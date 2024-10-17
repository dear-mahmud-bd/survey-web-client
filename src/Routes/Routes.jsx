import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import SignUp from "../Pages/Public/SignUp";
import SignIn from "../Pages/Public/SignIn";
import Surveys from "../Pages/Public/Surveys";
import SurveyDetails from "../Pages/Public/SurveyDetails";
import Membership from "../Pages/Public/Membership";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../Pages/Private/UserProfile";
import SurveyReport from "../Pages/Private/SurveyReport";
import UserReport from "../Pages/Private/UserReport";
import UserParticipation from "../Pages/Private/UserParticipation";
import UserComments from "../Pages/Private/UserComments";
import VoterResult from "../Pages/Private/VoterResult";
import Dashboard from "../Layout/Dashboard";
import SurveyorRoute from "./SurveyorRoute";
import MySurveys from "../Pages/Surveyor/MySurveys";
import CreateSurvey from "../Pages/Surveyor/CreateSurvey";
import UpdateSurvey from "../Pages/Surveyor/UpdateSurvey";
import SurveyResult from "../Pages/Surveyor/SurveyResult";
import SurveyFeedback from "../Pages/Surveyor/SurveyFeedback";
import AdminRoute from "./AdminRoute";
import AllUsers from "../Pages/Admin/ManageUsers/AllUsers";
import AllSurvey from "../Pages/Admin/AllSurvey";
import PaymentList from "../Pages/Admin/PaymentList";
import NotFound from "../Layout/Shared/NotFound";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <NotFound />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/all-survey', element: <Surveys /> },
            { path: '/all-survey/:_id', element: <SurveyDetails />, },
            { path: '/sign-in', element: <SignIn /> },
            { path: '/sign-up', element: <SignUp /> },
            { path: '*', element: <NotFound /> },


            // This are private route...
            { path: '/profile', element: <PrivateRoute> <UserProfile /> </PrivateRoute> },
            { path: '/membership', element: <PrivateRoute> <Membership /> </PrivateRoute> },
            { path: '/survey-report/:_id', element: <PrivateRoute> <SurveyReport /> </PrivateRoute> },
            { path: '/survey-result/:_id', element: <PrivateRoute> <VoterResult /> </PrivateRoute> },
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute> <Dashboard> <App /> </Dashboard> </PrivateRoute>, // Helmet same as <UserProfile />
        errorElement: <NotFound />,
        children: [
            { path: '', element: <UserProfile /> },
            { path: 'profile', element: <UserProfile /> },
            { path: 'my-participation', element: <UserParticipation /> },
            { path: 'my-report', element: <UserReport /> },
            { path: 'my-comments', element: <UserComments /> },


            // Surveyor Route...
            { path: 'create-survey', element: <SurveyorRoute> <CreateSurvey /> </SurveyorRoute> },
            { path: 'my-survey', element: <SurveyorRoute> <MySurveys /> </SurveyorRoute> },
            { path: 'my-survey/:_id', element: <SurveyorRoute> <SurveyResult /> </SurveyorRoute> },
            { path: 'my-survey/update/:_id', element: <SurveyorRoute> <UpdateSurvey /> </SurveyorRoute> },
            { path: 'my-survey-feedback', element: <SurveyorRoute> <SurveyFeedback /> </SurveyorRoute> },


            // Admin Route...
            { path: 'users', element: <AdminRoute> <AllUsers /> </AdminRoute> },
            { path: 'survey-status', element: <AdminRoute> <AllSurvey /> </AdminRoute> },
            { path: 'all-payment', element: <AdminRoute> <PaymentList /> </AdminRoute> },


            { path: '*', element: <NotFound /> },
        ]
    },
]);

export default router;