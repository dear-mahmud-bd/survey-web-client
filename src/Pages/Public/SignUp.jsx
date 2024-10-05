import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useTogglePassword from "../../utility/useTogglePassword";
import { useForm } from "react-hook-form";
import { showToast } from "../../utility/useToast";
import { Helmet } from "react-helmet";
import registerPhoto from "../../assets/signupin.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import WithGoogle from "../../Layout/SignUpSignIn/WithGoogle";


const SignUp = () => {
    const { loading, createUser, userUpdateProfile } = useAuth();
    const navigate = useNavigate();

    const [passwordVisible, togglePasswordVisibility] = useTogglePassword();
    const [confirmPasswordVisible, toggleConfirmPasswordVisibility] = useTogglePassword();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const password = watch('password');

    const onSubmit = (formData) => {
        const { name, url, email, password } = formData;
        // create user
        createUser(email, password)
            .then(() => {
                userUpdateProfile(name, url)
                    .then(() => {
                        showToast('success', 'Profile Updated');
                    }).catch(() => {
                        showToast('warn', 'Profile Not Updated');
                    });
                showToast('success', 'Account Created Successfully');
                navigate('/profile');
            })
            .catch(error => {
                if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
                    showToast('error', 'Email already in use.');
                } else {
                    showToast('error', 'Something went wrong! Try again.');
                }
            });
    };

    return (
        <div>
            <Helmet>
                <title>QueryQuotient | Sign Up</title>
            </Helmet>
            {/* <!-- Left column container with background--> */}
            <div className="flex h-full flex-wrap items-center justify-center lg:justify-between">
                <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
                    <img src={registerPhoto} className="w-full" alt="Sample image" />
                </div>

                {/* <!-- Right column container --> */}
                <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
                    <div className="max-w-md w-full p-6 mx-auto lg:mx-0">
                        <h1 className="text-4xl font-bold mb-6 text-center">Register Now</h1>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* User Name */}
                            <input {...register('name', { required: true })}
                                type="text" placeholder="Name" className="input input-sm input-bordered w-full" />
                            {errors.name && <p className="text-red-500 text-sm">Name is required.</p>}

                            {/* User Email */}
                            <input {...register('email', {
                                required: true,
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: 'Enter a valid email address',
                                },
                            })} type="email" placeholder="Email" className="input input-sm input-bordered w-full mt-4" />
                            {errors.email && <p className="text-red-500 text-sm">Valid email is required.</p>}

                            {/* Password */}
                            <div className="relative">
                                <input {...register('password', {
                                    required: true,
                                    minLength: {
                                        value: 8, message: 'Password must be at least 8 characters',
                                    },
                                    validate: {
                                        hasNumber: (value) => /[0-9]/.test(value) || 'Password must have a number',
                                        hasLowerCase: (value) => /[a-z]/.test(value) || 'Password must have a lowercase letter',
                                        hasUpperCase: (value) => /[A-Z]/.test(value) || 'Password must have an uppercase letter',
                                        hasSpecialChar: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value) || 'Password must have a special character',
                                    },
                                })} type={passwordVisible ? "text" : "password"} placeholder="Password" className="input input-sm input-bordered w-full mt-4" />
                                <span onClick={togglePasswordVisibility} className="absolute right-3 top-4 cursor-pointer text-3xl">
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                            {/* Confirm Password */}
                            <div className="relative">
                                <input {...register('confirmPassword', {
                                    required: true,
                                    validate: (value) => value === password || 'Passwords do not match',
                                })} type={confirmPasswordVisible ? "text" : "password"} placeholder="Confirm Password" className="input input-sm input-bordered w-full mt-4" />
                                <span onClick={toggleConfirmPasswordVisibility} className="absolute right-3 top-4 cursor-pointer text-3xl">
                                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

                            <button className="mt-5 tracking-wide font-semibold bg-customPurple2 text-gray-100 w-full py-2 rounded-lg hover:bg-customPurple4 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none" >
                                <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /> <circle cx="8.5" cy="7" r="4" /> <path d="M20 8v6M23 11h-6" />  </svg>
                                <span className="ml-2"> {loading ? <span className="loading loading-spinner loading-xs"></span> : 'Sign Up'}</span>
                            </button>
                        </form>

                        <div className="mt-4 text-sm text-center">
                            <p>
                                Already have an account? <Link to="/sign-in" className="underline">Sign In</Link>
                            </p>
                        </div>
                        
                        <WithGoogle></WithGoogle>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;