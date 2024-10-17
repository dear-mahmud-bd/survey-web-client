import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useProUser = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isProUser, isPending: isProUserLoading } = useQuery({
        queryKey: ['isProUser'],
        enabled: !loading,
        queryFn: async () => {
            // console.log('Checking Pro_User: ', user?.email)
            const res = await axiosSecure.get(`/users/pro_user/${user.email}`);
            // console.log(res.data);
            return res.data?.pro_user;
            // return res.data;
        }
    })
    return [isProUser, isProUserLoading]
};

export default useProUser;