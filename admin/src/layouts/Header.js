import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import './Header.css';
import logo from "../assets/MR-STM-RECORDS-25-8-2024.png";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="z-10 relative">
            <div className='flex flex-wrap justify-between items-center px-4 md:px-8 py-2'>
                
                <div className="">
                    <Link to={"/admin"}>
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
                    <AdminNavLink to={"/admin"} label="DASHBOARD" toggleMenu={toggleMenu} />
                    <AdminNavLink to={"/admin/users"} label="USERS" toggleMenu={toggleMenu} />
                    <AdminNavLink to={"/admin/settings"} label="SETTINGS" toggleMenu={toggleMenu} />
                    <AdminNavLink to={"/admin/reports"} label="REPORTS" toggleMenu={toggleMenu} />
                    <AdminNavLink to={"/admin/profile"} label="PROFILE" toggleMenu={toggleMenu} />
                    <AdminNavLink to={"/admin/logout"} label="LOGOUT" className="bg-red-500 text-white font-semibold rounded-full hover:bg-red-400" toggleMenu={toggleMenu} />
                </div>
            </div>
        </div>
    );
}

const AdminNavLink = ({ to, label, className, toggleMenu }) => (
    <div className="p-4">
        <Link to={to} onClick={toggleMenu} className={`block text-rev-color p-2 hover:text-gray-300 ${className}`}>
            {label}
        </Link>
    </div>
);

export default Header;
