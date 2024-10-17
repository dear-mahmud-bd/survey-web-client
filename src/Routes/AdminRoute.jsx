import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import Loading from "../Layout/Shared/Loading";


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if (loading || isAdminLoading) {
        return <Loading />
    }

    if (user && isAdmin) {
        return children;
    }

    return <Navigate state={location.pathname} to="/*"></Navigate>;
};

AdminRoute.propTypes = {
    children: PropTypes.node,
};
export default AdminRoute;