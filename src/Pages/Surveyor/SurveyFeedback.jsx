import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import Loading from "../../Layout/Shared/Loading";
import { Helmet } from "react-helmet";

const SurveyFeedback = () => {
    const { user } = useAuth();

    const { data: feedback = [], error, isLoading } = useQuery({
        queryKey: ['surveyFeedback', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/survey-feedback/${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) return <Loading/>;
    if (error || !feedback) {
        return (
            <div className="text-center flex flex-col items-center justify-center h-60 md:h-96">
                <Helmet>
                    <title>No Feedback</title>
                </Helmet>
                <h1 className="text-4xl font-bold text-green-600">No Feedback</h1>
                <p className="text-lg font-semibold text-gray-600 mt-2">There is no feedback you needed.</p>
            </div>
        );
    }

    return (
        <div>
            <div className='mb-5 py-5 bg-gray-200 rounded-lg'>
                <h1 className='text-center text-4xl font-bold'>Survey Feedback</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table ">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Reason</th>
                            <th>Take Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {feedback.length > 0 ? feedback.map((fb, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{fb.reason}</td>
                                <td>
                                    <Link to={`/dashboard/my-survey/update/${fb.surveyId}`} className="btn btn-sm btn-info text-white">
                                        Settings
                                    </Link>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4">No feedback found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SurveyFeedback;
