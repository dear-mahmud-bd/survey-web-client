import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet";
import Loading from "../../Layout/Shared/Loading";
import { Link } from "react-router-dom";

const UserParticipation = () => {
    const { user } = useAuth();

    const { data: userParticipation = [], error, isLoading } = useQuery({
        queryKey: ['userParticipation'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users-participation/${user?.email}`);
            return res.data;
        }
    });
    console.log(userParticipation);
    

    if (isLoading) return <Loading />;
    if (!userParticipation.length || error) {
        return (
            <div className="text-center flex flex-col items-center justify-center h-60 md:h-96">
                <Helmet>
                    <title>No Participation Found</title>
                </Helmet>
                <h1 className="text-4xl font-bold text-red-600">No Participation Found</h1>
                <p className="text-lg font-semibold text-gray-600 mt-2">It seems like you haven&apos;t participated in any surveys yet.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <div className='mb-5 py-5 bg-gray-200 rounded-lg'>
                <h1 className='text-center text-4xl font-bold'>My Survey Participation</h1>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-auto w-full">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Survey Title</th>
                            <th>Your Vote</th>
                            <th>See Survey</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userParticipation.map((participation, idx) => (
                            <tr key={idx} className="border-b">
                                <td className="py-2">{idx + 1}</td>
                                <td>{participation?.title}</td>
                                <td>{participation.type}</td>
                                <td>
                                    <Link to={`/all-survey/${participation.surveyId}`} className="btn btn-link btn-xs text-customPurple3 font-bold">View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserParticipation;
