
import { useQuery } from '@tanstack/react-query';
import { axiosPublic } from '../../hooks/useAxiosPublic';
import Loading from '../../Layout/Shared/Loading';
import { Helmet } from 'react-helmet';

const PaymentList = () => {
    const { data: payments = [], isPending: loading } = useQuery({
        queryKey: ['allPayments'],
        queryFn: async () => {
            const res = await axiosPublic.get('/payments');
            return res.data;
        }
    });

    if (loading) return <Loading />
    if (!payments) {
        return <div>
            <Helmet>
                <title> QueryQuotient | Payment History Not Available</title>
            </Helmet>
            <h1 className="text-4xl font-bold text-green-600">No Payment History</h1>
            <p className="text-lg font-semibold text-gray-600 mt-2">There is no Payment History or something wrong.</p>
        </div>;
    }
    return (
        <div>
            <Helmet>
                <title> QueryQuotient | All Payment History</title>
            </Helmet>
            <div className='mb-5 py-5 bg-gray-200 rounded-lg'>
                <h1 className='text-center text-4xl font-bold'>All Payment History</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-auto w-full">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Email</th>
                            <th>TransactionId</th>
                            <th>Date</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, idx) => (
                            <tr key={payment._id} className="border-b">
                                <td className="py-2">{idx + 1}</td>
                                <td>{payment.email}</td>
                                <td>{payment.transactionId}</td>
                                <td>
                                    {/* Format the date */}
                                    {new Date(payment.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                    })}
                                </td>
                                <td>${payment.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentList;
