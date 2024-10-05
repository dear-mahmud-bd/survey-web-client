import { Helmet } from "react-helmet";
import { useLoaderData } from "react-router-dom";


const SurveyDetails = () => {
    const survey = useLoaderData();
    // console.log(survey);


    return (
        <div>
            <Helmet>
                <title>{survey.title}</title>
            </Helmet>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Portion: Survey Details (2/3) */}
                <div className="md:col-span-2 bg-white rounded-lg overflow-hidden">
                    <div className="m-1 p-5 rounded-lg shadow-md">
                        {/* Survey Title */}
                        <p className="text-gray-700 mb-4">
                            <strong>Category: </strong>{survey.category}
                        </p>

                        <h2 className="text-2xl font-bold mb-4">{survey.title}</h2>

                        {/* Created & Deadline Info */}
                        <div className="flex justify-between mb-4">
                            <div className="text-gray-600">
                                <strong>Created: </strong>{survey.created}
                            </div>
                            <div className="text-gray-600">
                                <strong>Deadline: </strong>{survey.deadline}
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 mb-4">
                            <strong>Description: </strong>{survey.description}
                        </p>

                        <div className="flex justify-between mb-4">
                            {/* Survey Status */}
                            <span>
                                <strong>Status: </strong>
                                <span className={`px-4 py-1 rounded-full ${survey.status === 'published' ? 'bg-green-400 text-white' : 'bg-red-400 text-white'
                                    }`}>
                                    {survey.status}
                                </span>
                            </span>

                            {/* Total Votes */}
                            <span className="text-lg text-gray-500">
                                <strong>Total Votes: </strong>{survey.yes_vote + survey.no_vote}
                            </span>
                        </div>

                        {/* Take Survey Button */}
                        <div className="flex justify-between">
                            <span></span>
                            <button className="mt-4 px-6 py-2 bg-customPurple2 text-white font-semibold rounded-lg shadow hover:bg-customPurple4 transition duration-300">
                                Take Survey
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Portion: Comments Section (1/3) */}
                <div className="md:col-span-1 bg-white relative" >
                    <div className="rounded-lg shadow-md p-6">
                        <h3 className="text-xl font-bold mb-4">User Comments</h3>

                        {/* If there are comments */}
                        {survey.comments.length > 0 ? (
                            <div className="space-y-4">
                                {survey.comments.map((comment, index) => (
                                    <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
                                        <p className="text-gray-700">{comment}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                        )}

                        {/* Add Comment Button (optional) */}
                        <div className="flex justify-between">
                            <span></span>
                            <button className="mt-4 right-0 bottom-0 px-4 py-2 bg-customPurple2 text-white font-semibold rounded-lg shadow hover:bg-customPurple4 transition duration-300">
                                Add Comment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveyDetails;


// if (!survey) {
//     return (
//         <div className="text-center flex flex-col items-center justify-center h-60 md:h-96">
//             <Helmet>
//                 <title>Survey Not Found</title>
//             </Helmet>
//             <h1 className="text-4xl font-bold text-red-600">Survey Not Found</h1>
//             <p className="text-lg font-semibold text-gray-600 mt-2">Sorry, the Survey you are looking for not here.</p>
//         </div>
//     );
// }