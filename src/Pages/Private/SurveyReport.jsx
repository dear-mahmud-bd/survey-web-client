import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet";
import Loading from "../../Layout/Shared/Loading";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { sweetToast } from "../../utility/useToast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SurveyReport = () => {
    const { user } = useAuth();
    const { _id } = useParams();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    // console.log(_id);
    const { data: survey, error, isLoading } = useQuery({
        queryKey: ['surveyReport', _id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-survey/${_id}`);
            return res.data;
        }
    });


    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // Handle report form submission
    const onSubmitReport = (data) => {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
        const reportData = {
            name: user?.displayName,
            email: user?.email,
            survey_id: _id,
            report_date: formattedDate,
            ...data,
        };
        // console.log("Report Data:", reportData);
        axiosSecure.post(`/report-survey`, reportData)
            .then(() => {
                // console.log("Report Added ");
                sweetToast('Success!', 'Report Added Successfully', 'success');
                navigate('/membership');
            })
        // Your axios post request or logic to send data to backend
        reset();
    };

    if (!survey || error) {
        return (
            <div className="text-center flex flex-col items-center justify-center h-60 md:h-96">
                <Helmet>
                    <title>QueryQuotient | Survey Not Found</title>
                </Helmet>
                <h1 className="text-4xl font-bold text-red-600">Survey Not Found</h1>
                <p className="text-lg font-semibold text-gray-600 mt-2">Sorry, the Survey you are looking for is not here.</p>
            </div>
        );
    }

    if (isLoading) return <Loading />

    return (
        <div className="container mx-auto p-6">
            <Helmet>
                <title>QueryQuotient | Report Survey -{survey.title}</title>
            </Helmet>

            <div className="max-w-xl mx-auto">
                <h1 className="text-2xl font-bold mb-4">Report Survey: {survey.title}</h1>

                <form onSubmit={handleSubmit(onSubmitReport)} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="mb-4">
                        <label htmlFor="reason" className="block text-lg font-medium text-gray-700">Reason for Reporting:</label>
                        <select {...register("reason", { required: "Please select a reason." })} className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customPurple3" >
                            <option value="">Select a reason...</option>
                            <option value="spam">Spam</option>
                            <option value="inappropriate">Inappropriate content</option>
                            <option value="misleading">Misleading information</option>
                            <option value="others">Others</option>
                        </select>
                        {errors.reason && <p className="text-red-500">{errors.reason.message}</p>}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="message" className="block text-lg font-medium text-gray-700">Additional Information:</label>
                        <textarea {...register("message", { required: "Message is required." })} rows="3" className="mt-1 block w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-customPurple3" placeholder="Provide additional details about your report" />
                        {errors.message && <p className="text-red-500">{errors.message.message}</p>}
                    </div>

                    <button type="submit" className="bg-customPurple2 text-white font-semibold py-2 px-4 rounded-md hover:bg-customPurple3 focus:outline-none focus:ring-2 focus:ring-customPurple3" >
                        Submit Report
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SurveyReport;
