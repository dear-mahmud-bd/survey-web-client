import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import Loading from '../Layout/Shared/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    // console.log(location.pathname);

    if (loading) return <Loading />
    if (user) return children;

    return <Navigate state={location.pathname} to="/sign-in"></Navigate>;
};

PrivateRoute.propTypes = {
    children: PropTypes.node,
};
export default PrivateRoute;