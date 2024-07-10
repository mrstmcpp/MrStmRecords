import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/Stmify-8-7-2024.png";
const Header = () => {
    
    return (
        <div className="z-10 relative">
            <div className='flex flex-grow px-8 items-center justify-between'>
                <div className="p-4">
                    <img src={logo} alt='logo' className='w-60' />
                
                </div>
                <div className='flex'>
                    <div className="p-4">
                        <Link to={"/"} className='block text-rev-color hover:text-gray-300 p-2'>
                            HOME
                        </Link>
                    </div>

                    <div className="p-4">
                        <Link to={"/about"} className='block text-rev-color hover:text-gray-300 p-2'>
                            ABOUT
                        </Link>
                    </div>

                    <div className="p-4">
                        <Link to={"/about"} className='block text-rev-color hover:text-gray-300 p-2'>
                            PORTFOLIO
                        </Link>
                    </div>

                    <div className="p-4">
                        <Link to={"/contact-us"} className='block text-rev-color hover:text-gray-300 p-2'>
                            CONTACT US
                        </Link>
                    </div>

                    <div className="p-4">
                        <Link to={"/login"} className='bg-orange-500 font-semibold p-2 px-7 rounded-full block text-white hover:bg-orange-400'>
                            LOGIN/SIGN UP
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
