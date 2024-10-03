import { FaClipboardList, FaVoteYea, FaChartBar } from 'react-icons/fa';

const HowItWorks = () => {
    return (
        <div className="mb-5 md:mb-10">
            <div className="container mx-auto text-center">
                <div className="border-t-2 border-b-2 border-dashed text-center space-y-2 py-5 mb-2">
                    <h1 className="text-3xl font-extrabold text-customPurple3">How It Works</h1>
                    <p className="mx-auto md:mx-[20%]">
                        Discover how you can engage in our survey process, from creation to participation and analysis.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <FaClipboardList className="text-4xl text-customPurple4 mb-4" />
                        <h3 className="text-2xl font-semibold mb-4">Create a Survey</h3>
                        <p className="text-gray-600">Sign up as a surveyor to create and customize surveys on different topics. Choose from a variety of question types and categories.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <FaVoteYea className="text-4xl text-customPurple4 mb-4" />
                        <h3 className="text-2xl font-semibold mb-4">Vote & Participate</h3>
                        <p className="text-gray-600">Users can vote on public surveys and submit their responses. You can explore survey results once the voting period ends.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                        <FaChartBar className="text-4xl text-customPurple4 mb-4" />
                        <h3 className="text-2xl font-semibold mb-4">Analyze the Results</h3>
                        <p className="text-gray-600">Surveyors and pro-users can view detailed reports, charts, and insights from the surveys to make data-driven decisions.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;