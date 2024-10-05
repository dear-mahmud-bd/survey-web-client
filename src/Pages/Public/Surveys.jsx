import { useQuery } from "@tanstack/react-query";
import SurveyCard from "../../components/SurveyCard";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import Loading from "../../Layout/Shared/Loading";
import { Helmet } from "react-helmet";
import { useState } from "react";

const Surveys = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [sortOrder, setSortOrder] = useState(''); // 'asc' or 'desc'

    const { data: surveyData = [], isPending: loading } = useQuery({
        queryKey: ['allSurvey'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all-survey');
            return res.data;
        }
    });

    const filteredSurveys = selectedCategory ? surveyData.filter(survey => survey.category === selectedCategory) : surveyData;

    const sortedSurveys = [...filteredSurveys].sort((a, b) => {
        return sortOrder === 'asc' ? a.total_vote - b.total_vote : b.total_vote - a.total_vote;
    });

    if (loading) return <Loading />;
    return (
        <div>
            <Helmet>
                <title>QueryQuotient | All Surveys</title>
            </Helmet>
            <div className="m-2">
                <select className="select select-bordered select-sm max-w-xs mb-2 mr-2" onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
                    <option value="">All Categories</option>
                    <option value="Customer Experience">Customer Experience</option>
                    <option value="Product Development">Product Development</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="User Experience">User Experience</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Workplace Policies">Workplace Policies</option>
                    <option value="Product Satisfaction">Product Satisfaction</option>
                    <option value="Public Policy">Public Policy</option>
                    <option value="Education">Education</option>
                    <option value="Environmental">Environmental</option>
                    <option value="Technology">Technology</option>
                </select>

                <select className="select select-bordered select-sm max-w-xs" onChange={(e) => setSortOrder(e.target.value)} value={sortOrder}>
                    <option value="desc">Sort by Votes (High to Low)</option>
                    <option value="asc">Sort by Votes (Low to High)</option>
                </select>
            </div>

            <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedSurveys.map((survey, index) => (
                        <SurveyCard key={index} survey={survey} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Surveys;
