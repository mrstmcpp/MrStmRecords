import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../layouts/Layout';
import TextInput from '../shared/TextInput';
import PasswordInput from '../shared/PasswordInput';

const LoginComponent = () => {
    return (
        <Layout>
            <div className='bg-app-color flex flex-col items-center justify-center py-40'>
                <div className='w-full max-w-lg px-6 py-10 bg-gray-800 shadow-md rounded-lg'>
                    <div className='text-center font-bold text-rev-color mb-6 text-2xl'>Login to continue</div>
                    <TextInput placeholder={"Enter your email"} label={"Email"} className="text-rev-color"/>
                    <PasswordInput placeholder={"Enter your Password"} label={"Password"} className="text-rev-color" />
                    <div className='flex justify-center mt-6'>
                        <button className='bg-orange-500 font-semibold p-2 px-7 rounded-full block text-white hover:bg-orange-400 '>
                            LOG IN
                        </button>
                    </div>
                    <div className='flex flex-col justify-center mt-4'>

                        <div className='flex justify-center mb-4'>
                        <Link to="/forgot-password" className='text-sky-500 hover:text-sky-700'>
                            Forgot password?
                        </Link>
                        </div>

                        <div className='flex justify-center mb-4'>
                        <Link to="/register" className='bg-slate-950 border font-semibold p-2 px-7 rounded-full block text-white hover:bg-slate-700 '>
                            Don't have an account? Register
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default LoginComponent;
