import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import Loading from "../../Layout/Shared/Loading";
import { Pie, PieChart, Cell } from "recharts";

const VoterResult = () => {
    const { _id } = useParams();

    const { data: survey, error: err, isLoading: loading } = useQuery({
        queryKey: ['survey', _id],
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
    console.log(isDeadlinePassed);
    if (!isDeadlinePassed) {
        return (<>
            Voting Result Not Published
        </>);
    }



    if (isLoading || loading) return <Loading />;
    if (error || err) {
        return (
            <div className="text-center">
                <h1 className="text-red-500 text-xl">Error loading survey results.</h1>
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
