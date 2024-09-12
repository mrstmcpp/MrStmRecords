import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../assets/MR-STM-RECORDS-25-8-2024.png";
import { Icon } from '@iconify/react';
import './Header.css';
import { useCookies } from 'react-cookie';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cookies, setCookies, removeCookies] = useCookies(["token"]);
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleLogout = () => {
        removeCookies("token");
        navigate("/");
    }


    return (
        <div className="z-10 relative">
            <div className='flex flex-wrap justify-between items-center px-4 md:px-8 py-2'>
                <div className="">
                    <Link to={"/"}>
                        <img src={logo} alt='logo' className='w-36 md:w-48' />
                    </Link>
                </div>
                <div className='md:hidden'>
                    <button onClick={toggleMenu} className="block text-white font-bold hover:text-gray-300 p-2 focus:outline-none">
                        {isOpen ? (
                            <Icon icon="akar-icons:cross" className='w-6 h-6' />
                        ) : (
                            <Icon icon="charm:menu-hamburger" className='w-6 h-6' />
                        )}
                    </button>
                </div>
                <div className={`md:flex flex-wrap ${isOpen ? '' : 'hidden'}`}>
                    <NavLink to={"/"} label="HOME" toggleMenu={toggleMenu} className="hover:text-gray-300" />
                    <NavLink to={"/artist"} label="ARTISTS" toggleMenu={toggleMenu} className="hover:text-gray-300" />
                    <NavLink to={"/releases"} label="RELEASES" toggleMenu={toggleMenu} className="hover:text-gray-300" />
                    <NavLink to={"/about"} label="ABOUT" toggleMenu={toggleMenu} className="hover:text-gray-300" />
                    <NavLink to={"/contact-us"} label="CONTACT US" toggleMenu={toggleMenu} className="hover:text-gray-300" />
                    {cookies.token ?
                        <div className="relative p-4">
                            <div onClick={toggleDropdown} className="cursor-pointer mt-1 items-center">
                                <Icon icon="ic:baseline-account-circle" className="text-white w-8 h-8" />
                            </div>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-4 w-48 bg-app-color rounded-lg shadow-lg">
                                    <Link to="/user/profile" className="block px-4 py-2 text-white hover:bg-slate-600 hover:rounded-lg ">
                                        Profile
                                    </Link>
                                    <Link to="/user/settings" className="block px-4 py-2 text-white hover:bg-slate-600 hover:rounded-lg ">
                                        Settings
                                    </Link>
                                    <div onClick={handleLogout} className="block px-4 py-2 text-white hover:bg-slate-600 hover:rounded-lg cursor-pointer">
                                        Logout
                                    </div>
                                </div>
                            )}
                        </div>
                        :
                        <NavLink to={"/login"} label="LOGIN/SIGN UP" className="bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-400" toggleMenu={toggleMenu} />
                    }

                </div>
            </div>
        </div>
    );
}

const NavLink = ({ to, label, className, toggleMenu }) => (
    <div className="p-4">
        <Link to={to} onClick={toggleMenu} className={`block text-rev-color  p-2 ${className}`}>
            {label}
        </Link>
    </div>
);

export default Header;
