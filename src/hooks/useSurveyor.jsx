import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useSurveyor = () => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: isSurveyor, isPending: isSurveyorLoading } = useQuery({
        queryKey: [user?.email, 'isSurveyor'],
        enabled: !loading,
        queryFn: async () => {
            // console.log('asking or checking is Surveyor', user)
            const res = await axiosPublic.get(`/users/surveyor/${user?.email}`);
            // console.log(res.data);
            return res.data?.surveyor;
        }
    })
    return [isSurveyor, isSurveyorLoading]
};

export default useSurveyor;