import { useQuery } from "@tanstack/react-query";
import SurveyCard from "../../components/SurveyCard";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import Loading from "../../Layout/Shared/Loading";
import { Helmet } from "react-helmet";

const Surveys = () => {
    
    const { data: surveyData = [], isPending: loading } = useQuery({
        queryKey: ['allSurvey'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all-survey');
            return res.data;
        }
    })
    // console.log(surveyData);

    if(loading) return <Loading/>

    return (
        <div>
            <Helmet>
                <title>All Survey</title>
            </Helmet>
            <h1></h1>

            <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {surveyData.map((survey, index) => <SurveyCard key={index} survey={survey} />)}
                </div>
            </div>
        </div>
    );
};

export default Surveys;