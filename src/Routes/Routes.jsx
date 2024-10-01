import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";




const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        // errorElement: <ErrorElement />,
        children: [
            { path: '/', element: <Home /> },
            
            // { path: '*', element: <NotFound /> },

            
            // This are private route...


        ]
    },
]);

export default router;