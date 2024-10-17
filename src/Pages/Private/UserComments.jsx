import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import Loading from "../../Layout/Shared/Loading";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";


const UserComments = () => {
    const { user } = useAuth();

    // Fetching the user's comments using React Query
    const { data: comments = [], error, isLoading } = useQuery({
        queryKey: ['userComments', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/comment-survey/${user?.email}`);
            return res.data;
        }
    });


    if (isLoading) return <Loading />;

    if (error) {
        return (
            <div className="text-center flex flex-col items-center justify-center h-60 md:h-96">
                <Helmet>
                    <title>QueryQuotient | Comments Not Found</title>
                </Helmet>
                <h1 className="text-4xl font-bold text-red-600">Comments Not Found</h1>
                <p className="text-lg font-semibold text-gray-600 mt-2">
                    Sorry, failed to load comments or no comments available.
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <Helmet>
                <title>QueryQuotient | My Comments </title>
            </Helmet>
            <div className='mb-5 py-5 bg-gray-200 rounded-lg'>
                <h1 className='text-center text-4xl font-bold'>My Comments</h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {comments.map((comment) => (
                    <div key={comment._id} className="bg-white shadow-md rounded-lg p-4">
                        <h2 className="text-lg font-bold">{comment.name}</h2>
                        <p className="text-sm text-gray-500 mb-2">{comment.comment_date}</p>
                        <p className="text-gray-800">{comment.comment}</p>
                        <div className="mt-2">
                            <Link to={`/all-survey/${comment.surveyId}`} className="text-blue-500 hover:underline" >
                                View Survey
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {comments.length === 0 && <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-600">No Comments Available</h1>
                <p className="text-lg font-semibold text-gray-500 mt-2">
                    You have not made any comments yet.
                </p>
            </div>}
        </div>
    );
};

export default UserComments;
