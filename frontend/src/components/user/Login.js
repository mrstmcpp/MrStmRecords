import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../layouts/Layout';
import TextInput from '../shared/TextInput';
import PasswordInput from '../shared/PasswordInput';

const LoginComponent = () => {
    return (
        <Layout>
            <div className='flex flex-col items-center justify-center py-40'>
                <div className='w-full max-w-lg px-6 py-10 bg-gray-200 shadow-md rounded-lg'>
                    <div className='font-semibold text-center mb-6'>Login to continue</div>
                    <TextInput placeholder={"Enter your email"} label={"Email"} />
                    <PasswordInput placeholder={"Enter your Password"} label={"Password"} />
                    <div className='flex justify-center mt-6'>
                        <button className='bg-sky-500 hover:bg-sky-700 text-lg font-semibold rounded-full p-2 px-7 text-white'>
                            LOG IN
                        </button>
                    </div>
                    <div className='flex justify-between mt-4'>
                        <Link to="/forgot-password" className='text-base text-sky-500 hover:text-sky-700'>
                            Forgot password?
                        </Link>
                        <Link to="/register" className='text-base text-sky-500 hover:text-sky-700'>
                            Don't have an account? Register
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default LoginComponent;
