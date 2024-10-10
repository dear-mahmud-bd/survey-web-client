import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const SurveyCard = ({ survey }) => {
    const navigate = useNavigate();
    const handleDetails = (_id) => {
        // console.log(_id);
        navigate(`/all-survey/${_id}`)
    };
    return (
        <div className="card bg-base-100 rounded-lg shadow-md">
            <div className="card-body flex-grow">
                <h2 className="card-title text-xl pb-2">{survey?.title}</h2>
                <div className="flex items-center justify-between border-b-2 border-dashed pb-2">
                    <span className=""><strong>Created:</strong> {survey.created}</span>
                    <span className=""><strong>Deadline:</strong> {survey.deadline}</span>
                </div>
                <p className="font-semibold text-gray-600">{survey?.description}</p>
                <p className="text-lg text-gray-500 border-b-2 border-dashed pb-2">
                    <strong>Total Votes:</strong> {survey.total_vote}
                </p>
                <div className="flex items-center justify-between font-semibold">
                    <span className={`px-4 py-1 ${survey?.status === 'published' ? 'bg-customPurple4D' : 'bg-red-400'} rounded-full text-customPurple4`}>{survey?.status}</span>
                    <button onClick={() => handleDetails(survey?._id)} className="btn bg-customPurple2 hover:bg-customPurple3 text-white font-semibold rounded-full">
                        <span className="text-lg">View Details</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

SurveyCard.propTypes = {
    survey: PropTypes.object.isRequired
};
export default SurveyCard;