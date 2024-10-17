import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { axiosPublic } from "../../hooks/useAxiosPublic";
import { showToast } from "../../utility/useToast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useProUser from "../../hooks/useProUser";


const CheckoutForm = () => {
    const [isProUser] = useProUser();
    const { user } = useAuth();
    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        if(!isProUser){
            axiosPublic.post('/create-payment-intent', { price: 111 })
            .then(res => {
                // console.log('Client Secret:', res.data.clientSecret); // Ensure clientSecret is fetched
                setClientSecret(res.data.clientSecret);
            })
            .catch(err => console.log('Error fetching clientSecret:', err));
        }
    }, [isProUser]);



    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement)
        if (card === null) return;
        const { error, paymentMethod } = await stripe.createPaymentMethod({ type: 'card', card });

        if (error) {
            // console.log('payment error', error);
            setError(error.message);
        } else {
            console.log('payment method', paymentMethod)
            setError('');
        }


        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'Anonymous',
                    name: user?.displayName || 'Anonymous',
                    address: {
                        line1: '123 Main Street', // fetch this from the user data or ask in the form
                        city: 'Mumbai',           // fetch this from the user or ask in the form
                        postal_code: '400001',    // Add a valid postal code
                        country: 'IN',            // Country code for India
                    },
                }
            }
        });

        if (confirmError) {
            // console.log('Confirm error details:', confirmError); 
            setError(confirmError.message);
        } else {
            // console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                // console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);
                // now save the payment in the database
                const payment = {
                    name: user?.displayName,
                    email: user?.email,
                    price: 111,
                    transactionId: paymentIntent.id,
                    date: new Date(), // utc date convert. use moment js to 
                }

                const res = await axiosPublic.post('/payments', payment);
                // console.log('payment saved', res.data);
                if (res.data?.paymentResult?.insertedId) {
                    showToast('success', 'Thank You for your Subscription');
                    navigate('/dashboard/payment-history')
                }
            }
        }

    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4', }, },
                        invalid: { color: '#9e2146'},
                    }
                }}
            />
            <button className="btn btn-sm btn-block btn-accent text-white my-4" type="submit" disabled={!stripe || !clientSecret}>
                Pay Now
            </button>
            <p className="text-red-600">{error}</p>
            {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
        </form>
    );
};

export default CheckoutForm;