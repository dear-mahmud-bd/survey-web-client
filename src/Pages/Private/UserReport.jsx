import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";
import Loading from "../../Layout/Shared/Loading";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const UserReport = () => {
    const { user } = useAuth();

    const { data: userReport = [], error, isLoading } = useQuery({
        queryKey: ['userReport'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/user-report/${user?.email}`);
            return res.data;
        }
    });

    if (isLoading) return <Loading />
    if (!userReport || error) {
        return (
            <div className="text-center flex flex-col items-center justify-center h-60 md:h-96">
                <Helmet>
                    <title>QueryQuotient | Report Not Found</title>
                </Helmet>
                <h1 className="text-4xl font-bold text-red-600">Report Not Found</h1>
                <p className="text-lg font-semibold text-gray-600 mt-2">Sorry, Failed to load report or no report available.</p>
            </div>
        );
    }
    return (
        <div className="container mx-auto">
            <Helmet>
                    <title>QueryQuotient | My Added Report</title>
                </Helmet>
            <div className='mb-5 py-5 bg-gray-200 rounded-lg'>
                <h1 className='text-center text-4xl font-bold'>My Report</h1>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-auto w-full">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Report Date</th>
                            <th>Reason</th>
                            <th>Message</th>
                            <th>See Survey</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userReport.map((report, idx) => (
                            <tr key={report._id} className="border-b">
                                <td className="py-2">{idx + 1}</td>
                                <td>{report.report_date}</td>
                                <td>{report.reason}</td>
                                <td>{report.message}</td>
                                <td>
                                    <Link to={`/all-survey/${report.survey_id}`} className="btn btn-link btn-xs text-customPurple3 font-bold text-base">View</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserReport;
