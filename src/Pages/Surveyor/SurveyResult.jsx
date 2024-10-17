import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Loading from "../../Layout/Shared/Loading";
import { Helmet } from "react-helmet";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const SurveyResult = () => {
    const { _id } = useParams();
    const axiosSecure = useAxiosSecure();

    const { data: surveyResult = [], error, isLoading } = useQuery({
        queryKey: ['surveyResult', _id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/survey-result/${_id}`);
            return res.data;
        }
    });
    // console.log(surveyResult);

    if (isLoading) return <Loading />
    if (error) {
        return (
            <div className="text-center flex flex-col items-center justify-center h-60 md:h-96">
                <Helmet>
                    <title>QueryQuotient | Survey Result Not Found</title>
                </Helmet>
                <h1 className="text-4xl font-bold text-red-600">Survey Result Not Found</h1>
                <p className="text-lg font-semibold text-gray-600 mt-2">Sorry, the Survey you are looking for not here.</p>
            </div>
        );
    }
    if (!surveyResult) {
        return (
            <div className="text-center flex flex-col items-center justify-center h-60 md:h-96">
                <Helmet>
                    <title>QueryQuotient | No one voted</title>
                </Helmet>
                <h1 className="text-4xl font-bold text-red-600">No one voted</h1>
                <p className="text-lg font-semibold text-gray-600 mt-2">Sorry, there are no votes on the survey results you entered yet.</p>
            </div>
        );
    }
    const COLORS = ['#0088FE', '#FF8042'];
    const pieData = [
        { name: 'Yes Votes', value: surveyResult.yes_count },
        { name: 'No Votes', value: surveyResult.no_count }
    ];
    return (
        <div>
            <Helmet>
                <title>QueryQuotient | My Survey Result -{surveyResult.title}</title>
            </Helmet>
            <div className='mb-5 py-5 bg-gray-200 rounded-lg'>
                <h1 className='text-center text-4xl font-bold'>Survey Result</h1>
            </div>
            <div className="mb-2">
                <h1 className="text-3xl font-bold text-center">{surveyResult.title}</h1>
                <p className="text-lg text-center text-gray-500 mt-2">Category: {surveyResult.category}</p>
            </div>
            <div role="tablist" className="tabs tabs-lifted border-l-0">
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Chart_View" defaultChecked />
                <div role="tabpanel" className="tab-content bg-base-100 border-b-0 border-x-0 border-base-300 p-1">
                    <div className="flex justify-center mb-10">
                        <PieChart width={400} height={400}>
                            <Pie
                                data={pieData}
                                cx={200}
                                cy={200}
                                labelLine={false}
                                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={150}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Table_View" />
                <div role="tabpanel" className="tab-content bg-base-100 border-b-0 border-x-0 border-base-300 p-1">
                    <div className="overflow-x-auto">
                        <table className="table table-sm">
                            <thead>
                                <tr>
                                    <th>Serial</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Vote Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {surveyResult.voters.map((result, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        <td>{result.name}</td>
                                        <td>{result.email}</td>
                                        <td>{result.type}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveyResult;