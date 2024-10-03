import { Helmet } from "react-helmet";
import Banner from "../../Layout/Home/Banner";
import LatestSurveys from "../../Layout/Home/LatestSurveys";
import FeaturedSurveys from "../../Layout/Home/FeaturedSurveys";
import Faq from "../../Layout/Home/Faq";
import HowItWorks from "../../Layout/Home/HowItWorks";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>QueryQuotient | Home</title>
            </Helmet>
            <Banner/>
            <LatestSurveys/> {/* TODO: Show 6 Letest Survey */}
            <HowItWorks/>
            <FeaturedSurveys/> {/* TODO: Show 6 Most Voted Survey */}
            <Faq/>
        </div>
    );
};

export default Home;