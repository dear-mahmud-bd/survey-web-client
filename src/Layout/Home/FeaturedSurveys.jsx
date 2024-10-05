import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import SurveyCard from "../../components/SurveyCard";
import Loading from "../Shared/Loading";


const FeaturedSurveys = () => {
    const { data: surveyData = [], isPending: loading } = useQuery({
        queryKey: ['featuredSurvey'],
        queryFn: async () => {
            const res = await axiosPublic.get('/mostvoted-surveys');
            return res.data;
        }
    })

    if (loading) return <Loading />
    return (
        <div className="mb-5 md:mb-10">
            <div className="border-t-2 border-b-2 border-dashed text-center space-y-2 py-5 mb-2">
                <h1 className="text-3xl font-extrabold text-customPurple3">Most Voted Surveys</h1>
                <p className="mx-auto md:mx-[20%]">
                    Discover the surveys that have garnered the highest engagement from participants. Explore the top-voted topics and see what matters most to our community.
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

export default FeaturedSurveys;