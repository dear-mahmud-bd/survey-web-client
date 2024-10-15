import { Outlet, NavLink, Link } from "react-router-dom";
import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAdmin from "../hooks/useAdmin";
import useSurveyor from "../hooks/useSurveyor";
import useProUser from "../hooks/useProUser";
import { FaCrown } from "react-icons/fa";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isSurveyor] = useSurveyor();
    const [isProUser] = useProUser();

    console.log('Admin: ', isAdmin);
    console.log('Surveyor: ', isSurveyor);
    console.log('ProUser: ', isProUser);

    return (
        <>
            <div className="flex flex-col min-h-screen">
                <header className="fixed top-0 left-0 w-full z-10 shadow-md">
                    <Navbar />
                </header>

                {/* Drawer and main content */}
                <main className="flex flex-grow mt-[69px]">
                    <div className="container max-w-7xl mx-auto">
                        <div className="drawer lg:drawer-open">
                            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                            <div className="drawer-content p-4">
                                <Outlet></Outlet>
                            </div>
                            <div className="drawer-side">
                                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                                <ul className="menu bg-base-200 text-base-content min-h-full w-56 p-4 mt-[69px] lg:mt-0">

                                    <div className="divider m-0 p-0"></div>
                                    <li><NavLink to='profile'>My Profile</NavLink></li>
                                    <li><NavLink to='my-participation'>My Participation</NavLink></li>
                                    <li><NavLink to='my-report'>My Report</NavLink></li>
                                    <li className='mb-5'>{isProUser ?
                                        <NavLink to='my-comments'>
                                            My Comments
                                        </NavLink>
                                        :
                                        <Link to="/membership">
                                            <span className="flex items-center gap-1">My Comments <FaCrown /></span>
                                        </Link>
                                    }</li>

                                    {/* Admin content here */}
                                    {isSurveyor && <>
                                        <div className="divider m-0 p-0">As Surveyor</div>
                                        <li><NavLink to='create-survey'>Create Survey</NavLink></li>
                                        <li><NavLink to='my-survey' className='mb-5'>My Survey</NavLink></li>
                                    </>}

                                    {/* Admin content here */}
                                    {isAdmin && <>
                                        <div className="divider m-0 p-0">As Admin</div>
                                        <li><NavLink to='users'>Users</NavLink></li>
                                        <li><NavLink to='survey-status'>Survey Status</NavLink></li>
                                        <li><NavLink to='all-payment'>All Payments</NavLink></li>
                                    </>}
                                </ul>
                            </div>
                        </div>

                    </div>
                </main>

                <footer className="mt-auto w-full bg-customPurple2">
                    <Footer />
                </footer>

                <ToastContainer />
            </div>
        </>
    );
};

export default Dashboard;
