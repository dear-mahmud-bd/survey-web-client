import useAllSurveys from "../../hooks/useAllSurveys";
import Loading from "../../Layout/Shared/Loading";
import Survey from "./Survey";


const AllSurvey = () => {
    const [surveyData, loading, refetch] = useAllSurveys();

    if (loading) return <Loading />;

    const publishedSurveys = surveyData.filter(survey => survey.status === 'published');
    const unpublishedSurveys = surveyData.filter(survey => survey.status !== 'published');

    return (
        <div>
            <div className='mb-5 py-5 bg-gray-200 rounded-lg'>
                <h1 className='text-center text-4xl font-bold'>All Survey Status</h1>
            </div>

            <div role="tablist" className="tabs tabs-lifted border-l-0">
                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Published" defaultChecked />
                <div role="tabpanel" className="tab-content bg-base-100 border-b-0 border-x-0 border-base-300 p-1">
                    <Survey surveys={publishedSurveys} refetch={refetch}></Survey>
                </div>

                <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Unpublished" />
                <div role="tabpanel" className="tab-content bg-base-100 border-b-0 border-x-0 border-base-300 p-1">
                    <Survey surveys={unpublishedSurveys} refetch={refetch}></Survey>
                </div>
            </div>
        </div>
    );
};

export default AllSurvey;