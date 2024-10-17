import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Layout/Shared/Loading";
import Survey from "./Survey";
import { Link } from "react-router-dom";


const MySurveys = () => {
    const { user } = useAuth();

    const { data: mySurveyData = [], isPending: loading } = useQuery({
        queryKey: ['mySurvey'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/my-survey/${user?.email}`);
            return res.data;
        }
    });
    // console.log(mySurveyData);

    if (loading) return <Loading />;

    return (
        <div className="max-w-5xl mx-auto">
            <Helmet>
                <title>QueryQuotient | All My Surveys</title>
            </Helmet>

            <h2 className="text-center text-3xl font-semibold mb-8 underline decoration-customPurple2 underline-offset-8">My added Survey</h2>

            <div className="overflow-x-auto my-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>View Details</th>
                            <th>Survey Update</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            mySurveyData.map((survey, index) => (
                                <Survey key={index} survey={survey} serial={index + 1} />
                            ))
                        }
                    </tbody>
                </table>

            </div>

            {
                mySurveyData.length == 0 &&
                <div className="my-10 text-center">
                    <p className=" text-3xl font-semibold text-customPurple3">
                        You have not added any survey yet <br />
                    </p>
                    <Link to='/create-survey' className="btn btn-sm bg-customPurple2 hover:bg-customPurple3 text-white mt-2">
                        Create Survey
                    </Link>
                </div>
            }
        </div>
    );
};

export default MySurveys;