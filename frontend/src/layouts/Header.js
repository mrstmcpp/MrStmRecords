import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="fixed z-10">
            <div className='flex px-8 items-center fixed top-0 left-0 right-0 bg-app-color'>
                <div className="p-4">
                    <Icon icon="solar:bag-music-bold" className='text-cyan-50' width={40} />
                </div>
                <div className="flex-grow">
                    <p className='text-3xl text-cyan-50'>Stmify</p>
                </div>
                <div className='flex justify-end'>
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
                        <div className='flex flex-auto space-x-2'>

                        <Link to={"/login"} className='bg-orange-500 font-semibold p-2 px-7 rounded-full block text-white hover:bg-orange-400'>
                            LOGIN
                        </Link>
                        <Link to={"/register"} className='bg-orange-500 font-semibold p-2 px-7 rounded-full block text-white hover:bg-orange-400 '>
                            REGISTER
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
