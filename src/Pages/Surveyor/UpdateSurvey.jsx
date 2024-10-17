import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import Loading from "../../Layout/Shared/Loading";
import { DayPicker } from "react-day-picker";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { showToast } from "../../utility/useToast";


const UpdateSurvey = () => {
    const { user } = useAuth();
    const { _id } = useParams();
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(null);
    const [showCalendar, setShowCalendar] = useState(false);
    const today = new Date();
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(today.getDate() + 0);
    const isFriday = (date) => date.getDay() === 5;
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        const formattedDate = date?.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        setValue('surveyDeadline', formattedDate, { shouldValidate: true });
        setShowCalendar(false);
    };


    const { data: updateSurvey, error, isLoading } = useQuery({
        queryKey: ['updateSurvey', _id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-survey/${_id}`);
            return res.data;
        }
    });
    // console.log(_id, updateSurvey);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    useEffect(() => {
        setValue('title', updateSurvey?.title || '');
        setValue('category', updateSurvey?.category || '');
        setValue('surveyDeadline', updateSurvey?.deadline || '');
        setValue('status', updateSurvey?.status || '');
        setValue('createdBy', user?.email || '');
        setValue('question', updateSurvey?.question || '');
        setValue('description', updateSurvey?.description || '');
    }, [updateSurvey, user, setValue]);


    const handleUpdateSurvey = (formData) => {
        const deadlineISO = new Date(formData.surveyDeadline).toISOString();
        const data = { ...formData, deadlineISO: { $date: deadlineISO } };
        axiosPublic.put(`/my-survey/${updateSurvey?._id}`, data)
            .then(() => {
                // console.log("Survey Updated ");
                showToast('success', 'Survey Updated successfully');
                navigate('/dashboard/my-survey');
            })
    }

    if (isLoading) return <Loading />
    if (!updateSurvey || error) {
        return (
            <div className="text-center flex flex-col items-center justify-center h-60 md:h-96">
                <Helmet>
                    <title>QueryQuotient | Survey Not Found</title>
                </Helmet>
                <h1 className="text-4xl font-bold text-red-600">Survey Not Found</h1>
                <p className="text-lg font-semibold text-gray-600 mt-2">Sorry, the Survey you are looking for updating not here.</p>
            </div>
        );
    }
    return (
        <div className="max-w-4xl mx-auto my-5">
            <Helmet>
                <title>QueryQuotient | Update Survey -{updateSurvey?.title}</title>
            </Helmet>
            <h3 className="font-bold text-2xl text-center mb-4">Update Survey...</h3>

            <form onSubmit={handleSubmit(handleUpdateSurvey)} className="space-y-5">
                <div className="grid grid-cols-12 gap-2">
                    {/* Survey Title */}
                    <div className="col-span-12 sm:col-span-8">
                        <label className="block text-sm font-semibold">Survey Title</label>
                        <input {...register("title", {
                            required: "Title is required",
                            minLength: { value: 10, message: "Title must be at least 10 characters long", },
                            validate: {
                                twoWords: (value) => value.trim().split(/\s+/).length >= 2 || "Title must contain at least 2 words",
                            },
                        })} type="text" className={`input input-sm input-bordered w-full ${errors.title ? 'input-error' : ''}`} />
                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                    </div>

                    {/* Select Category... */}
                    <div className="col-span-12 sm:col-span-4">
                        <label className="block text-sm font-semibold ">Category</label>
                        <select {...register("category", { required: "Select a Category" })} className={`w-full select select-bordered select-sm max-w-xs mb-2 ${errors.category ? 'input-error' : ''}`} >
                            <option value="">All Categories</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Education">Education</option>
                            <option value="Technology">Technology</option>
                            <option value="Environmental">Environmental</option>
                            <option value="Public Policy">Public Policy</option>
                            <option value="Human Resources">Human Resources</option>
                            <option value="User Experience">User Experience</option>
                            <option value="Workplace Policies">Workplace Policies</option>
                            <option value="Customer Experience">Customer Experience</option>
                            <option value="Product Development">Product Development</option>
                            <option value="Product Satisfaction">Product Satisfaction</option>
                        </select>
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                    </div>

                    {/* Set a Deadline Date */}
                    <div className="col-span-6 sm:col-span-4">
                        <label className="block text-sm font-semibold">
                            Survey Deadline (<span className="text-[10px] text-warning">{updateSurvey?.deadline}</span>)
                        </label>
                        <input type="text" defaultValue={selectedDate ? selectedDate.toLocaleDateString('en-CA') : ""} placeholder="YYYY-MM-DD"
                            onClick={() => setShowCalendar(!showCalendar)} className={`input input-sm input-bordered w-full cursor-pointer ${errors.surveyDeadline ? 'border-red-500' : ''}`} />
                        <input type="hidden" {...register("surveyDeadline", { required: "Survey Deadline is required" })} />
                        {errors.surveyDeadline && (<p className="text-red-500 text-sm">{errors.surveyDeadline.message}</p>)}
                        {showCalendar && (
                            <div className="relative mt-2">
                                <DayPicker mode="single" disabled={[{ before: threeDaysLater }, isFriday]} selected={selectedDate} onSelect={handleDateSelect} modifiers={{
                                    selectable: (date) => date >= threeDaysLater && !isFriday(date)
                                }} />
                            </div>
                        )}
                    </div>

                    {/* Default Status */}
                    <div className="col-span-12 sm:col-span-4">
                        <label className="block text-sm font-semibold">Status</label>
                        <input {...register("status", { required: "Status is required" })} type="text" disabled className={`input input-sm input-bordered w-full ${errors.status ? 'input-error' : ''}`} />
                        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
                    </div>

                    {/* Surveyor Email */}
                    <div className="col-span-12 sm:col-span-4">
                        <label className="block text-sm font-semibold">Surveyor Email</label>
                        <input {...register("createdBy", { required: "Surveyor Email is required" })} type="email" disabled className={`input input-sm input-bordered w-full ${errors.createdBy ? 'input-error' : ''}`} />
                        {errors.createdBy && <p className="text-red-500 text-sm">{errors.createdBy.message}</p>}
                    </div>

                    {/* Survey Question */}
                    <div className="col-span-12 sm:col-span-12">
                        <label className="block text-sm font-semibold">Question</label>
                        <input {...register("question", {
                            required: "Question is required",
                            minLength: { value: 20, message: "Question must be at least 20 characters long" },
                            validate: {
                                threeWords: (value) =>
                                    value.trim().split(/\s+/).length >= 3 || "Question must contain at least 3 words",
                            },
                        })} type="text" className={`input input-sm input-bordered w-full ${errors.question ? 'input-error' : ''}`} />
                        {errors.question && <p className="text-red-500 text-sm">{errors.question.message}</p>}
                    </div>

                    {/* Survey description */}
                    <div className="col-span-12 sm:col-span-12">
                        <label className="block text-sm font-semibold">Description</label>
                        <textarea {...register("description", {
                            required: "Description is required",
                            minLength: { value: 50, message: "Description must be at least 50 characters long" },
                            validate: {
                                sixWords: (value) =>
                                    value.trim().split(/\s+/).length >= 6 || "Description must contain at least 6 words",
                            },
                        })} rows="2" className={`textarea textarea-bordered w-full ${errors.description ? 'input-error' : ''}`} />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button type="submit" className="btn bg-customPurple2 hover:bg-customPurple3 text-white">
                        Update Survey
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateSurvey;