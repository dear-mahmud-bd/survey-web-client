import axios from "axios";
import { useState, useEffect } from "react";
import SurveyCard from "../../components/SurveyCard";

const Surveys = () => {
    const [surveyData, setSurveyData] = useState([]);
    useEffect(() => {
        // Creating an async function inside the useEffect to handle async axios call
        const fetchSurveyData = async () => {
            try {
                const res = await axios.get('../../../public/surveys.json');
                setSurveyData(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchSurveyData();
    }, [])
    console.log(surveyData);

    return (
        <div>
            <h1></h1>

            <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {surveyData.map((survey, index) => <SurveyCard key={index} survey={survey} />)}
                </div>
            </div>
        </div>
    );
};

export default Surveys;