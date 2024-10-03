import PropTypes from 'prop-types';

const SurveyCard = ({ survey }) => {
    return (
        <div>
            <div className="card bg-base-100 rounded-lg shadow-md">
                <div className="card-body">
                    <h2 className="card-title text-xl pb-2">{survey?.title}</h2>
                    <div className="flex items-center justify-between border-b-2 border-dashed pb-2">
                        <span className=""><strong>Created:</strong> {survey.created}</span>
                        <span className=""><strong>Deadline:</strong> {survey.deadline}</span>
                    </div>
                    <p className="font-semibold text-gray-600">{survey?.description}</p>
                    <p className="text-lg text-gray-500 border-b-2 border-dashed pb-2">
                        <strong>Total Votes:</strong> {survey.yes_vote + survey.no_vote}
                    </p>
                    <div className="flex items-center justify-between font-semibold">
                        <span className={`px-4 py-1 ${survey?.status === 'published' ? 'bg-customPurple4D' : 'bg-red-400'} rounded-full text-customPurple4`}>{survey?.status}</span>
                        <button className="btn bg-customPurple2 hover:bg-customPurple3 text-white font-semibold rounded-full">
                            <span className="text-lg">View Details</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

SurveyCard.propTypes = {
    survey: PropTypes.object.isRequired
};
export default SurveyCard;