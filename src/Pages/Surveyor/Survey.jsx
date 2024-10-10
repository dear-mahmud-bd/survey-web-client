import PropTypes from 'prop-types';

const Survey = ({ survey, serial }) => {
    const { _id, title, category } = survey;

    const handleViewDetails = (_id, category) => {
        console.log(_id, category);
        
    };

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
                    <button
                        onClick={() => handleViewDetails(_id, category)}
                        className="btn btn-info btn-xs text-white">Details</button>
                </td>
                <td>
                    <button
                        onClick={() => handleViewDetails(_id, category)}
                        className="btn btn-info text-white">Update</button>
                </td>
            </tr>
        </>
    );
};

Survey.propTypes = {
    survey: PropTypes.object,
    serial: PropTypes.number,
    // services: PropTypes.array.isRequired,
    // setServices: PropTypes.func.isRequired,
};
export default Survey;