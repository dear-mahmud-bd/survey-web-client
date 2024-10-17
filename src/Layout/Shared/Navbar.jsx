import { CiLogin, CiLogout } from 'react-icons/ci';
import { Link, NavLink, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { showToast } from '../../utility/useToast';
import { LuLayoutDashboard } from 'react-icons/lu';

const Navbar = () => {
    const location = useLocation();
    // console.log(location);
    const isDashboard = location.pathname.includes("/dashboard");

    const { user, userSignOut } = useAuth();
    // console.log(user);
    const handleSignOut = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: `You want to LogOut`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33333',
            cancelButtonColor: '#008000',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                userSignOut()
                    .then(() => {
                        showToast('success', 'Log-out successful');
                    })
                    .catch(() => {
                        showToast('error', 'Log-out unsuccessful');
                    });
            }
        })
    };


    const addClass = isActive => isActive ? 'font-semibold underline underline-offset-2' : 'font-semibold';
    const navLinks = <>
        <li><NavLink className={({ isActive }) => addClass(isActive)} to="/">Home</NavLink></li>
        <li><NavLink className={({ isActive }) => addClass(isActive)} to="/all-survey">Surveys</NavLink></li>
        {user &&
            <li><NavLink className={({ isActive }) => addClass(isActive)} to="/dashboard">Dashboard</NavLink></li>
        }
    </>;

    return (
        <nav className='container max-w-7xl mx-auto'>
            <div className="navbar bg-base-100">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm bg-base-100 dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {navLinks}
                        </ul>
                    </div>
                    <Link to="/" className="text-3xl font-bold text-customPurple1">QueryQuotient</Link>
                </div>
                <div className="navbar-end gap-2">
                    <div className="navbar-center hidden md:flex">
                        <ul className="menu menu-horizontal px-1 space-x-1">
                            {navLinks}
                        </ul>
                    </div>

                    {user ? (
                        <>
                            {isDashboard &&
                                <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
                                    <LuLayoutDashboard className='text-xl' />
                                </label>
                            }

                            <div className="dropdown dropdown-hover dropdown-end">
                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                    <div className="w-20 rounded-full ring ring-offset-2 ring-customPurple4">
                                        <img src={`${user?.photoURL ? user?.photoURL : 'https://i.ibb.co.com/jD1GTj4/user.png'}`} alt="Profile Img" />
                                    </div>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt--2 w-52 p-2 shadow">
                                    <li className=' font-semibold text-gray-500 mb-1'>
                                        <p className=''>{user?.displayName}</p>
                                    </li>
                                    <li>
                                        <Link to='/membership'>Membership</Link>
                                    </li>
                                    <li>
                                        <Link to='/dashboard'>Dashboard</Link>
                                    </li>
                                    <li>
                                        <a onClick={handleSignOut}> <CiLogout />Sign Out</a>
                                    </li>
                                </ul>
                            </div>
                        </>
                    ) : (
                        <Link to='/sign-in' className="btn font-bold text-white bg-customPurple2 hover:bg-customPurple3">
                            Sign In<CiLogin className='text-2xl' />
                        </Link>
                    )}

                </div>
            </div>
        </nav>
    );
};

export default Navbar;
