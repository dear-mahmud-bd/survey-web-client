import { useForm } from 'react-hook-form';
import { Helmet } from "react-helmet";
import { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import "react-day-picker/style.css";
import useAuth from '../../hooks/useAuth';
import { axiosPublic } from '../../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import { sweetToast } from '../../utility/useToast';

const CreateSurvey = () => {
    const { user } = useAuth();
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


    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    useEffect(() => {
        setValue('createdBy', user?.email || '');
        setValue('status', 'published');
        setValue('totalVote', 58);

    }, [user, setValue]);

    const onSubmit = (formData) => {
        const createdDate = new Date();
        const formattedCreatedDate = createdDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        const deadlineISO = new Date(formData.surveyDeadline).toISOString();
        const createdISO = createdDate.toISOString();
        console.log(deadlineISO, createdISO);


        // Construct the formatted data object
        const surveyData = {
            title: formData.title,
            description: formData.description,
            total_vote: parseInt(formData.totalVote, 10),
            category: formData.category,
            deadline: formData.surveyDeadline,
            deadlineISO: { $date: deadlineISO },
            status: formData.status,
            created: formattedCreatedDate, // formatted to 'Oct 11, 2024'
            createdISO: { $date: createdISO },
            createdBy: formData.createdBy,
            comments: [],
            question: formData.question,
            voters: [],
        };
        console.log('Formatted Survey Data:', surveyData);

        axiosPublic.post(`/all-survey`, surveyData)
            .then(() => {
                console.log("Survey Added ");
                sweetToast('Success!', 'Survey Added Successfully', 'success');
                navigate('/dashboard/my-survey');
            })
        reset();
    };


    return (
        <div className="max-w-4xl mx-auto my-5">
            <Helmet>
                <title>Create a Survey</title>
            </Helmet>
            <h3 className="font-bold text-2xl text-center mb-4">Create a Survey (YES-NO Question Only)</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                        <label className="block text-sm font-semibold">Survey Deadline</label>
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

                    {/* Default total vote */}
                    <div className="col-span-12 sm:col-span-7 ">
                        <label className="block text-sm font-semibold">Total Vote (It will not be affected by the original vote.)</label>
                        <input {...register("totalVote", { required: "TotalVote is required" })} type="number" disabled className={`input input-sm input-bordered w-full ${errors.totalVote ? 'input-error' : ''}`} />
                        {errors.totalVote && <p className="text-red-500 text-sm">{errors.totalVote.message}</p>}
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button type="submit" className="btn bg-customPurple2 hover:bg-customPurple3 text-white">
                        Create Survey
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateSurvey;