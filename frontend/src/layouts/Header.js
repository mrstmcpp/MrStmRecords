import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <div className="">
            <div className='flex px-8 border-b-4 border-solid items-center fixed top-0 left-0 right-0 bg-white z-10'>
                <div className="p-4">
                    <Icon icon="solar:bag-music-bold" width={80} />
                </div>
                <div className="flex-grow">
                    <p className='text-5xl'>Stmify</p>
                </div>
                <div className='flex'>
                    <div className="p-4">
                        <Link to={"/"} className='block text-2xl text-sky-500 hover:text-sky-700 p-2'>
                            Home
                        </Link>
                    </div>

                    <div className="p-4">
                        <Link to={"/about"} className='block text-2xl text-sky-500 hover:text-sky-700 p-2'>
                            About
                        </Link>
                    </div>

                    <div className="p-4">
                        <Link to={"/contact-us"} className='block text-2xl text-sky-500 hover:text-sky-700 p-2'>
                            Contact Us
                        </Link>
                    </div>

                    <div className="p-4">
                        <Link to={"/login"} className='block text-2xl text-sky-500 hover:text-sky-700 p-2'>
                            Login/Register
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
