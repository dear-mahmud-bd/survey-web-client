import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import Loading from "../../Layout/Shared/Loading";
import { Pie, PieChart, Cell } from "recharts";
import { Helmet } from "react-helmet";

const VoterResult = () => {
    const { _id } = useParams();

    const { data: survey, error: err, isLoading: loading } = useQuery({
        queryKey: ['surveyRes', _id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-survey/${_id}`);
            return res.data;
        }
    });
    const { data: surveyResult, error, isLoading } = useQuery({
        queryKey: ['voterResult', _id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/voter-result/${_id}`);
            return res.data;
        }
    });



    const deadlineISO = survey?.deadlineISO?.$date; // ISO deadline from your API
    const deadlineDate = new Date(deadlineISO);  // Convert the deadlineISO to a Date object
    const currentDate = new Date(); // Get the current date and time    
    const isDeadlinePassed = currentDate > deadlineDate; // Compare the deadline date with the current date
    // console.log(isDeadlinePassed);
    if (!isDeadlinePassed) {
        return (
            <div className="text-center flex flex-col items-center justify-center h-60 md:h-96">
                <Helmet>
                    <title>QueryQuotient | Survey Result Not Available</title>
                </Helmet>
                <h1 className="text-4xl font-bold text-red-600">Survey Result Not Available</h1>
                <p className="text-lg font-semibold text-gray-600 mt-2">Sorry, the Survey Result you are looking for not published yet.</p>
            </div>
        );
    }



    if (isLoading || loading) return <Loading />;

    if (error || err || !survey || !surveyResult) {
        return (
            <div className="text-center flex flex-col items-center justify-center h-60 md:h-96">
                <Helmet>
                    <title>QueryQuotient | Survey Result Not Found</title>
                </Helmet>
                <h1 className="text-4xl font-bold text-red-600">Survey Result Not Found</h1>
                <p className="text-lg font-semibold text-gray-600 mt-2">Sorry, the Survey Result you are looking for not here.</p>
            </div>
        );
    }

    const { title, category, yes_count, no_count } = surveyResult || {};
    const COLORS = ['#0088FE', '#FF8042'];
    const pieData = [
        { name: 'Yes Votes', value: yes_count },
        { name: 'No Votes', value: no_count }
    ];
    return (
        <div className="container mx-auto">
            <Helmet>
                <title>QueryQuotient | Survey Result -{title}</title>
            </Helmet>

            <div className="mb-2">
                <h1 className="text-3xl font-bold text-center">{title}</h1>
                <p className="text-lg text-center text-gray-500 mt-2">Category: {category}</p>
            </div>

            {/* Pie Chart */}
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
                </PieChart>
            </div>
        </div>
    );
};

export default VoterResult;
