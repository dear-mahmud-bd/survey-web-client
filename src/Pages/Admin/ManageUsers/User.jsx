import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { axiosPublic } from '../../../hooks/useAxiosPublic';
import { showToast } from '../../../utility/useToast';


const User = ({ allUsers, refetch }) => {
    // console.log(allUsers);
    const handleRoleChange = (_id, role) => {
        const data = { role: role };
        console.log(_id, role, data);
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to change User Role as ${role}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#008000',
            cancelButtonColor: '#d33333',
            confirmButtonText: 'Yes!',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.put(`/user-role/${_id}`, data)
                    .then(() => {
                        showToast('success', `User role updated to ${role}`);
                        refetch();
                    })
            }
        })

    };
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Pro-User</th>
                            <th>Change Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((user, idx) => (
                            <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td>{user.email}</td>
                                <td>{user.user_role}</td>
                                <td>{user.pro_user ? 'Yes' : 'No'}</td>
                                <td>
                                    {/* Dropdown for changing the user role */}
                                    <select onChange={(e) => handleRoleChange(user._id, e.target.value)} value={user.user_role} className="font-semibold select select-bordered select-xs" disabled={user.user_role === "admin"} >
                                        <option className="font-semibold" value="user">User</option>
                                        <option className="font-semibold" value="surveyor">Surveyor</option>
                                        <option className="font-semibold" value="admin">Admin</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

User.propTypes = {
    allUsers: PropTypes.array,
    refetch: PropTypes.func,
};
export default User;