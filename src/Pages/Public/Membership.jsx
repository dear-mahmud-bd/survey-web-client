import { CgInfinity } from "react-icons/cg";
import Payment from "../Payment/Payment";
import useProUser from "../../hooks/useProUser";
import { Helmet } from "react-helmet";

const Membership = () => {
    const [isProUser] = useProUser();
    const subscriptionDetails = {
        title: "Pro Membership Subscription",
        description: "Join QueryQuotient Pro for exclusive features, enhanced analytics, and priority support.",
        amount: 111, // Subscription amount in USD
        benefits: [
            // "Access to premium surveys",
            "Enhanced data analytics",
            "Priority customer support",
            "Ability to create unlimited surveys",
            "Comment on any survey"
        ],
        duration: "Lifetime",
    };

    return (
        <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
            <Helmet>
                <title> QueryQuotient | Membership</title>
            </Helmet>
            <div className="flex-1 p-6 border-r border-gray-300">
                <h1 className="text-3xl font-bold">{subscriptionDetails.title}</h1>
                <p className="mt-2 text-lg">{subscriptionDetails.description}</p>
                <div className="mt-2 rounded-lg border border-gray-300 p-4">
                    <h2 className="text-2xl font-semibold">Total Amount: ${subscriptionDetails.amount}</h2>
                    <p className="mt-1 text-gray-700 flex items-center ">Duration: <CgInfinity className="ml-2 text-2xl" />{subscriptionDetails.duration}</p>
                    <h3 className="mt-2 text-xl font-bold">Benefits: </h3>
                    <ul className="mt-1 list-disc list-inside text-left">
                        {subscriptionDetails.benefits.map((benefit, index) => (
                            <li key={index} className="text-gray-600">{benefit}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {isProUser ?
                <div className="flex-1 p-6 flex items-center justify-center">
                    <p className="text-3xl font-bold m-2">You Are Already in Pro-User</p>
                </div>
                :
                <div className="flex-1 p-6 ">
                    <p className="mb-10"><a target="_blank" className="btn-link" href="https://docs.stripe.com/testing">Show Card Demo</a></p>
                    <Payment />
                </div>
            }
        </div>
    );
};

export default Membership;
