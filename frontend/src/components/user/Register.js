import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../layouts/Layout';
import TextInput from '../shared/TextInput';
import PasswordInput from '../shared/PasswordInput';

const RegisterComponent = () => {
    return (
        <Layout>
            <div className='bg-app-color flex flex-col items-center justify-center py-40'>
                <div className='w-full max-w-lg px-6 py-10 bg-gray-800 shadow-md rounded-lg'>
                    <div className='text-center font-bold text-rev-color mb-6 text-2xl'>Register your account</div>
                    <TextInput placeholder={"Enter your full name"} label={"Name"} />
                    <TextInput placeholder={"Enter your email"} label={"Email"} />
                    <PasswordInput placeholder={"Enter your Password"} label={"Password"} />
                    <PasswordInput placeholder={"Confirm your Password"} label={"Confirm Password"} />
                    <div className='flex justify-center mt-6'>
                        <button className='bg-orange-500 font-semibold p-2 px-7 rounded-full block text-white hover:bg-orange-400'>
                            Sign Up
                        </button>
                    </div>
                    <div className='flex justify-center mt-4'>
                        <Link to="/login" className='text-base text-sky-500 hover:text-sky-700'>
                            Already have an account? Login
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default RegisterComponent;
