import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Survey = ({ survey, serial }) => {
    const { _id, title, category } = survey;

    return (
        <>
            <tr>
                <td>
                    <div className="font-semibold text-gray-400">
                        {serial}
                    </div>
                </td>
                <td>
                    <div className="font-semibold text-gray-400">
                        {title}
                    </div>
                </td>
                <td>
                    <div className="font-semibold text-gray-400">
                        {category}
                    </div>
                </td>
                <td>
                    <Link to={`/dashboard/my-survey/${_id}`} className="btn btn-info btn-link text-customPurple3">
                        Details
                    </Link>
                </td>
                <td>
                    <Link to={`/dashboard/my-survey/update/${_id}`} className="btn btn-info btn-sm text-white">
                        Update
                    </Link>
                </td>
            </tr>
        </>
    );
};

Survey.propTypes = {
    survey: PropTypes.object,
    serial: PropTypes.number,
};
export default Survey;