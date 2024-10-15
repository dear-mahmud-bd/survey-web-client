import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "./useAxiosPublic";


const useAllSurveys = () => {
    const { data: surveyData = [], isPending: loading, refetch } = useQuery({
        queryKey: ['allSurvey'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all-survey');
            return res.data;
        }
    });
    return [surveyData, loading, refetch]
};

export default useAllSurveys;