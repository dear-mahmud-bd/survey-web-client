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
            <LatestSurveys/> 
            <HowItWorks/>
            <FeaturedSurveys/> 
            <Faq/>
        </div>
    );
};

export default Home;