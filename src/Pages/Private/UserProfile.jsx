import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { showToast } from "../../utility/useToast";
import { Helmet } from "react-helmet";


const UserProfile = () => {
    const { loading, user, setUser, userUpdateProfile } = useAuth();


    const urlPattern = /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/;
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        setValue('newName', user?.displayName || '');
        setValue('photoUrl', user?.photoURL || '');
    }, [user, setValue]);

    const handleUpdateProfile = (formData) => {
        const { newName, photoUrl } = formData;
        userUpdateProfile(newName, photoUrl)
            .then(() => {
                setUser(prevUser => ({
                    ...prevUser,
                    displayName: newName,
                    photoURL: photoUrl,
                }));
                showToast('success', 'Account Updated Successfully');
            }).catch(() => {
                showToast('error', 'Something Went Wrong! Try Again');
            });
    };

    return (
        <div>
            <Helmet>
                <title>My Profile -{user?.displayName}</title>
            </Helmet>
            
            <div className='mb-5 py-5 bg-gray-200 rounded-lg'>
                <h1 className='text-center text-4xl font-bold'>My Profile</h1>
            </div>

            <div className="p-2 rounded-lg md:flex justify-between items-center">
                <div className="md:w-1/2 pb-5 flex justify-center items-cente mx-auto">
                    <div className='flex flex-col items-center'>
                        <img src={`${user?.photoURL ? user?.photoURL : 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'}`} alt="User Profile" className="w-32 h-32 rounded-full shadow-xl" />
                        <h2 className="text-2xl font-semibold mt-2">{user?.displayName}</h2>
                        <p className="text-gray-600">{user?.email}</p>
                    </div>
                </div>
                <div className="md:w-1/2 p-5 mx-auto border rounded-lg">
                    <h3 className="text-xl font-semibold mb-4 text-center">Update Profile</h3>

                    <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-2">
                        <div>
                            <label className="block text-sm font-medium">New Name</label>
                            <input {...register('newName', { required: true })}
                                type="text" className="input input-sm input-bordered w-full" placeholder="Enter your name" />
                            {errors.newName && <p className="text-red-500 text-sm">Name is required.</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium">New Photo URL</label>
                            <input {...register('photoUrl', {
                                required: "Photo URL is required.",
                                pattern: {
                                    value: urlPattern,
                                    message: "Please enter a valid URL."
                                }
                            })} type="url" className="input input-sm input-bordered w-full" placeholder="Enter your photo URL" />

                            {errors.photoUrl && <p className="text-red-500 text-sm">{errors.photoUrl.message}</p>}

                        </div>
                        <div>
                            <label className="block text-sm font-medium">Email</label>
                            <input type="email" placeholder={user?.email} disabled className="input input-sm input-bordered w-full hover:cursor-not-allowed" />
                        </div>
                        <button type="submit" className="btn bg-customPurple2 hover:bg-customPurple3 text-white w-full mt-4" disabled={loading}>
                            {loading ? <span className="loading loading-spinner loading-xs"></span> : 'Update Profile'}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default UserProfile;
