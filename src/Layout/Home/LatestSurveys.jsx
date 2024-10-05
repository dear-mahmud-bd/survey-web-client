import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import Loading from "../Shared/Loading";
import SurveyCard from "../../components/SurveyCard";
import { Link } from "react-router-dom";


const LatestSurveys = () => {
    const { data: surveyData = [], isPending: loading } = useQuery({
        queryKey: ['latestSurvey'],
        queryFn: async () => {
            const res = await axiosPublic.get('/recent-surveys');
            return res.data;
        }
    })
    // console.log(surveyData);

    if (loading) return <Loading />
    return (
        <div className="mb-5 md:mb-10">
            <div className="border-t-2 border-b-2 border-dashed text-center space-y-2 py-5 mb-2">
                <h1 className="text-3xl font-extrabold text-customPurple3">Latest Surveys</h1>
                <p className="mx-auto md:mx-[20%]">
                    Stay informed with our Latest Surveys and discover fresh insights on trending topics. Participate now to share your opinion and help shape the future!
                </p>
            </div>

            <div className="container mx-auto py-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {surveyData.map((survey, index) => <SurveyCard key={index} survey={survey} />)}
                </div>
                <div className="flex justify-center mt-4">
                    <Link to='/all-survey' className="btn font-bold text-white bg-customPurple2 hover:bg-customPurple3">
                        To See All Survey
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LatestSurveys;