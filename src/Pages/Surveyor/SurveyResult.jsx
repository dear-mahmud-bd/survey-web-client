import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import Loading from "../../Layout/Shared/Loading";
import { Helmet } from "react-helmet";


const SurveyResult = () => {
    const { _id } = useParams();

    const { data: surveyResult = [], error, isLoading } = useQuery({
        queryKey: ['surveyResult', _id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/survey-result/${_id}`);
            return res.data;
        }
    });
    console.log(surveyResult);

    if (isLoading) return <Loading />
    if (error) {
        return (
            <div className="text-center flex flex-col items-center justify-center h-60 md:h-96">
                <Helmet>
                    <title>Survey Result Not Found</title>
                </Helmet>
                <h1 className="text-4xl font-bold text-red-600">Survey Result Not Found</h1>
                <p className="text-lg font-semibold text-gray-600 mt-2">Sorry, the Survey you are looking for not here.</p>
            </div>
        );
    }
    if (!surveyResult) {
        return (
            <div className="text-center flex flex-col items-center justify-center h-60 md:h-96">
                <Helmet>
                    <title>No one voted</title>
                </Helmet>
                <h1 className="text-4xl font-bold text-red-600">No one voted</h1>
                <p className="text-lg font-semibold text-gray-600 mt-2">Sorry, there are no votes on the survey results you entered yet.</p>
            </div>
        );
    }
    return (
        <div>
            <div className='mb-5 py-5 bg-gray-200 rounded-lg'>
                <h1 className='text-center text-4xl font-bold'>Survey Result</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-sm">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Vote Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {surveyResult.map((result, idx) => (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{result.name}</td>
                                <td>{result.email}</td>
                                <td>{result.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SurveyResult;