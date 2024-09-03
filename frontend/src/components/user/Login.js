import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../layouts/Layout';
import TextInput from '../shared/TextInput';
import PasswordInput from '../shared/PasswordInput';
import { unauthenticatedPostRequest } from '../../utils/ServerHelpers';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookie, setCookie] = useCookies("token"); 
    const navigate = useNavigate();
    
    const login = async() => {
        const data = { email, password };
        
        try {
            const response = await unauthenticatedPostRequest('/account/login', data);
            if (response && response.token) {
                const token = response.token;
                const date = new Date();
                date.setDate(date.getDate() + 30);
                setCookie('token', token, { path: '/', expires: date });
                navigate("/");
            } else {
                toast.error('Login failed. Please check your credentials.');
            }
        } catch (error) {
            toast.error('An error occurred while trying to log in.');
        }
    }

    return (
        <Layout>
            <div className='bg-app-color flex flex-col items-center justify-center py-40'>
                <div className='w-full max-w-lg px-6 py-10 bg-gray-800 shadow-md rounded-lg'>
                    <div className='text-center font-bold text-rev-color mb-6 text-2xl'>Login to continue</div>
                    <TextInput placeholder={"Enter your email"} label={"Email"} className="text-rev-color" value={email} setValue={setEmail}/>
                    <PasswordInput placeholder={"Enter your Password"} label={"Password"} className="text-rev-color" value={password} setValue={setPassword}/>
                    <div className='flex justify-center mt-6'>
                        <button
                            onClick={login}
                            className='bg-orange-500 font-semibold p-2 px-7 rounded-full block text-white hover:bg-orange-400'
                        >
                            LOG IN
                        </button>
                    </div>
                    <div className='flex flex-col justify-center mt-4'>
                        <div className='flex justify-center mb-4'>
                            <Link to='/forgot-password' className='text-sky-500 hover:text-sky-700'>
                                Forgot password?
                            </Link>
                        </div>
                        <div className='flex justify-center mb-4'>
                            <Link
                                to='/register'
                                className='bg-slate-950 border font-semibold p-2 px-7 rounded-full block text-white hover:bg-slate-700'
                            >
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
