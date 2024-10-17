import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Layout/Shared/Loading";
import User from "./User";
import { Helmet } from "react-helmet";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: usersData = [], isPending: loading, refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/all-users');
            return res.data;
        }
    });

    if (loading) return <Loading />;

    // Filter users by category
    const allUsers = usersData;
    const proUsers = usersData.filter(user => user.pro_user === true);
    const surveyors = usersData.filter(user => user.user_role === 'surveyor');
    const admins = usersData.filter(user => user.user_role === 'admin');

    if (!usersData) {
        return (
            <div>
                <Helmet>
                    <title>QueryQuotient | Users Not Found</title>
                </Helmet>
                <h1 className="text-4xl font-bold text-red-600">Users Not Found</h1>
                <p className="text-lg font-semibold text-gray-600 mt-2">Sorry, the Users you are looking for  not here.</p>
            </div>
        );
    }
    return (
        <div>
            <Helmet>
                <title> QueryQuotient | All Users</title>
            </Helmet>
            <div className='mb-5 py-5 bg-gray-200 rounded-lg text-center'>
                <h1 className=' text-4xl font-bold'>All Users</h1>
                <p>If the surveyor is given admin powers, he will lose the surveyor powers</p>
            </div>
            <div role="tablist" className="tabs tabs-lifted border-l-0">
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="All_Users" defaultChecked />
                <div role="tabpanel" className="tab-content bg-base-100 border-b-0 border-x-0 border-base-300 p-1">
                    <User allUsers={allUsers} refetch={refetch}></User>
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="ProUsers" />
                <div role="tabpanel" className="tab-content bg-base-100 border-b-0 border-x-0 border-base-300 p-1">
                    <User allUsers={proUsers} refetch={refetch}></User>
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Surveyors" />
                <div role="tabpanel" className="tab-content bg-base-100 border-b-0 border-x-0 border-base-300 p-1">
                    <User allUsers={surveyors} refetch={refetch}></User>
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Admins" />
                <div role="tabpanel" className="tab-content bg-base-100 border-b-0 border-x-0 border-base-300 p-1">
                    <User allUsers={admins} refetch={refetch}></User>
                </div>
            </div>
        </div>
    );
};

export default AllUsers;
