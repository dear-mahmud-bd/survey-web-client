import { Outlet, NavLink } from "react-router-dom";
import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    console.log(isAdmin);
    if (isAdmin) console.log("User is Admin");

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
                                    <li><NavLink to='profile'>My Profile</NavLink></li>
                                    {/* Admin content here */}
                                    {isAdmin && <>
                                        <li><NavLink to='users'>Users</NavLink></li>
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
