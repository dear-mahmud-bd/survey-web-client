import PropTypes from 'prop-types';
import { useState } from 'react';
import { showToast, sweetToast } from '../../utility/useToast';
import { axiosPublic } from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const Survey = ({ surveys, refetch }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSurvey, setSelectedSurvey] = useState(null);
    const [reason, setReason] = useState('');


    const handleSubmitFeedback = () => {
        if (!reason) {
            alert("Please provide a reason for unpublishing");
            return;
        }
        const feedbackData = { ...selectedSurvey, reason: reason };
        console.log(feedbackData);
        axiosPublic.post(`/survey-feedback`, selectedSurvey)
            .then(() => {
                axiosPublic.patch(`/survey-status/${selectedSurvey.surveyId}`, selectedSurvey)
                    .then(() => {
                        console.log("Survey");
                        sweetToast('Success!', 'Feedback Added Successfully', 'success');
                        refetch();
                    })
            })
        setIsModalOpen(false);
        setReason('');
    };

    
    const handleStatusChange = (_id, value) => {
        const updatedSurvey = { surveyId: _id, value };
        if (value === 'unpublished') {
            setSelectedSurvey(updatedSurvey);
            setIsModalOpen(true);
        } else {
            setSelectedSurvey(updatedSurvey);
            Swal.fire({
                title: 'Are you sure?',
                text: `You want to Published this`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#008000',
                cancelButtonColor: '#d33333',
                confirmButtonText: 'Yes!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosPublic.patch(`/survey-status/${selectedSurvey.surveyId}`, selectedSurvey)
                        .then(() => {
                            console.log("Survey");
                            showToast('success','Status updated to published')
                            refetch();
                        })
                }
            })
        }
    };
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Category</th>
                            <th>Title</th>
                            <th>Created By</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {surveys.map((survey, idx) => (
                            <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{survey.category}</td>
                                <td>{survey.title}</td>
                                <td><span className='text-xs'>{survey.createdBy}</span></td>
                                <td>
                                    <select onChange={(e) => handleStatusChange(survey._id, e.target.value)} value={survey.status} className="font-semibold select select-bordered select-xs" >
                                        <option value="published">Published</option>
                                        <option value="unpublished">Unpublished</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Reason Input */}
            {isModalOpen && (
                <dialog id="unpublishModal" className="modal" open>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Provide a Reason for Unpublishing</h3>
                        <textarea className="textarea textarea-bordered w-full mt-4" value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Enter the reason for unpublishing" />
                        <div className="modal-action">
                            <button className="btn btn-sm btn-success text-white" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className="btn btn-sm bg-customPurple2 hover:bg-customPurple3 text-white" onClick={handleSubmitFeedback}>Submit</button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

Survey.propTypes = {
    surveys: PropTypes.array,
    refetch: PropTypes.func,
};

export default Survey;
