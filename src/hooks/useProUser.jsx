import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";


const useProUser = () => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxiosPublic();
    const { data: isProUser, isPending: isProUserLoading } = useQuery({
        queryKey: ['isProUser'],
        enabled: !loading,
        queryFn: async () => {
            // console.log('Checking Pro_User: ', user?.email)
            const res = await axiosPublic.get(`/users/pro_user/${user.email}`);
            // console.log(res.data);
            return res.data?.pro_user;
            // return res.data;
        }
    })
    return [isProUser, isProUserLoading]
};

export default useProUser;