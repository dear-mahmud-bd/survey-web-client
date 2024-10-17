import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import useSurveyor from '../hooks/useSurveyor';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Layout/Shared/Loading';


const SurveyorRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isSurveyor, isSurveyorLoading] = useSurveyor();
    const location = useLocation();

    if (loading || isSurveyorLoading) {
        return <Loading />
    }

    if (user && isSurveyor) {
        return children;
    }

    return <Navigate state={location.pathname} to="/*"></Navigate>;
};

SurveyorRoute.propTypes = {
    children: PropTypes.node,
};
export default SurveyorRoute;