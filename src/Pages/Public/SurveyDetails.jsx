import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Tooltip } from "react-tooltip";
import { useForm } from "react-hook-form";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Layout/Shared/Loading";
import useProUser from "../../hooks/useProUser";
import { FaCrown } from "react-icons/fa";


const SurveyDetails = () => {
    const { _id } = useParams();
    // console.log(_id);

    const [isProUser, isProUserLoading] = useProUser();
    // console.log(isProUser);

    const { data: survey, error, isLoading, refetch } = useQuery({
        queryKey: ['survey', _id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-survey/${_id}`);
            return res.data;
        }
    });

    const { user } = useAuth();
    // const [vote, setVote] = useState(null);
    // console.log(user);
    const tooltipContent = user ? "Click to cast your valuable vote" : "Only logged in users can vote";
    // const survey = useLoaderData();

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmitVote = (formData) => {
        const data = { ...formData, email: user?.email };
        console.log("User Vote:", data);
        axiosPublic.put(`/all-survey/${survey?._id}`, data)
            .then(() => {
                console.log("Vote Added ");
                refetch();
            })
        document.getElementById('voting_modal').close();
        reset();
    };

    const { register: registerComment,
        handleSubmit: handleSubmitComment,
        reset: resetComment,
        formState: { errors: commentErrors }
    } = useForm();
    const handleCommentSubmit = (data) => {
        console.log("Comment Submitted:", data);
        resetComment();
    };

    if (!survey || error) {
        return (
            <div className="text-center flex flex-col items-center justify-center h-60 md:h-96">
                <Helmet>
                    <title>Survey Not Found</title>
                </Helmet>
                <h1 className="text-4xl font-bold text-red-600">Survey Not Found</h1>
                <p className="text-lg font-semibold text-gray-600 mt-2">Sorry, the Survey you are looking for not here.</p>
            </div>
        );
    }

    if (isLoading) return <Loading />

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
                                <strong>Total Votes: </strong>{survey.total_vote}
                            </span>
                        </div>

                        {/* Take Survey Button */}
                        <div className="flex justify-between">
                            <span></span>
                            <button data-tooltip-id="my-tooltip" data-tooltip-content={tooltipContent} onClick={() => document.getElementById('voting_modal').showModal()} disabled={!user} className={`mt-4 px-6 py-2 text-white font-semibold rounded-lg shadow transition duration-300 ${user ? 'bg-customPurple2 hover:bg-customPurple4 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'}`}>
                                Take Survey
                            </button>
                        </div>
                        {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <dialog id="voting_modal" className="modal modal-bottom sm:modal-middle">
                            <div className="modal-box">
                                <div className=" flex justify-between items-center">
                                    <h3 >
                                        <span className="font-bold text-lg">Survey Question</span> (Be careful: You can only vote once)
                                    </h3>
                                    <form method="dialog">
                                        <button className="btn btn-sm btn-circle btn-outline text-red-500 hover:bg-red-500 hover:border-red-500">X</button>
                                    </form>
                                </div>
                                <p className="py-4 font-semibold">{survey.question}</p>

                                <form onSubmit={handleSubmit(onSubmitVote)}>
                                    <div className="flex justify-around py-2">
                                        <label className="flex items-center">
                                            <input type="radio" value="yes" {...register("vote", { required: "Please select an option." })} className="radio" />
                                            <span className="ml-2">Yes</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input type="radio" value="no" {...register("vote", { required: "Please select an option." })} className="radio" />
                                            <span className="ml-2">No</span>
                                        </label>
                                    </div>

                                    {/* Show error message if vote is not selected */}
                                    {errors.vote && (<p className="text-red-500">{errors.vote.message}</p>)}

                                    <div className="modal-action">
                                        <button type="submit" className="btn bg-customPurple2 text-white hover:bg-customPurple3" >
                                            Submit Vote
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </dialog>

                    </div>
                    <Tooltip id="my-tooltip" />
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
                        {user && (
                            <div className="flex justify-between w-full">
                                <span></span>
                                {isProUserLoading ? (
                                    <span className="loading loading-spinner loading-xs"></span>
                                ) : (
                                    <>
                                        {isProUser ? (
                                            <form className="w-full mt-4" onSubmit={handleSubmitComment(handleCommentSubmit)}>
                                                <div className="flex flex-col w-full">
                                                    <textarea {...registerComment("comment", { required: "Comment is required" })} name="comment" placeholder="Add your comment here..." rows="2" className="rounded-md border border-gray-300 py-1 px-2 w-full focus:outline-none focus:ring-1 focus:ring-customPurple2" />
                                                    {commentErrors.comment && <p className="text-red-500 text-sm mt-1">{commentErrors.comment.message}</p>}

                                                    {/* Submit button */}
                                                    <button type="submit" className="bg-customPurple2 text-white px-6 py-2 rounded-md mt-4 self-end hover:bg-customPurple3 focus:outline-none focus:ring-1 focus:ring-customPurple3">
                                                        Submit Comment
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            // If not a Pro user, show the link to membership page
                                            <Link to="/membership" className="mt-4 right-0 bottom-0 px-4 py-2 bg-customPurple2 text-white font-semibold rounded-lg shadow hover:bg-customPurple4 transition duration-300" >
                                                <span className="flex items-center gap-1"> Upgrade to Pro <FaCrown /></span>
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveyDetails;