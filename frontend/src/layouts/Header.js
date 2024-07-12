import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/Stmify-8-7-2024.png";
import { Icon } from '@iconify/react';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="z-10 relative">
            <div className='flex flex-wrap justify-around items-center px-4 md:px-8 py-2'>
                <div className="">
                    <img src={logo} alt='logo' className='w-32 md:w-48' />
                </div>
                <div className='md:hidden'>
                    <button onClick={toggleMenu} className="block text-white font-bold hover:text-gray-300 p-2 focus:outline-none">
                        {isOpen ? (
                            <Icon icon="akar-icons:cross" className='w-6 h-6'/>
                        ) : (
                            <Icon icon="charm:menu-hamburger" className='w-6 h-6'/>
                        )}
                    </button>
                </div>
                <div className={`md:flex flex-wrap items-center ${isOpen ? 'block' : 'hidden'}`}>
                    <NavLink to={"/"} label="HOME" toggleMenu={toggleMenu} className="hover:text-gray-300" />
                    <NavLink to={"/about"} label="ABOUT" toggleMenu={toggleMenu} className="hover:text-gray-300"/>
                    <NavLink to={"/portfolio"} label="PORTFOLIO" toggleMenu={toggleMenu} className="hover:text-gray-300"/>
                    <NavLink to={"/contact-us"} label="CONTACT US" toggleMenu={toggleMenu} className="hover:text-gray-300" />
                    <NavLink to={"/login"} label="LOGIN/SIGN UP" className="bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-400" toggleMenu={toggleMenu} />
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
