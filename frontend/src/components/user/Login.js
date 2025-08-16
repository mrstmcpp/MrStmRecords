import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../layouts/Layout';
import TextInput from '../shared/TextInput';
import PasswordInput from '../shared/PasswordInput';
import { unauthenticatedGETRequest, unauthenticatedPostRequest } from '../../utils/ServerHelpers';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { backendURL } from "../../utils/config/backendUrl";
import { Icon } from '@iconify/react/dist/iconify.js';

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cookie, setCookie] = useCookies("token");
    const navigate = useNavigate();

    const login = async () => {
        const data = { email, password };

        try {
            const response = await unauthenticatedPostRequest('/user/login', data);
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
    const GoogleLoginEndpoint = `${backendURL}/user/auth/google`;
    const SpotifyLoginEndpoint = `${backendURL}/user/auth/spotify`;

    const handleGoogleLogin = () => {
        window.location.href = GoogleLoginEndpoint;
    };
    const handleSpotifyLogin = () => {
        window.location.href = SpotifyLoginEndpoint;
    };

    return (
        <Layout>
            <div className='bg-app-color flex flex-col items-center justify-center py-40'>
                <div className='w-full max-w-lg px-6 py-10 bg-gray-800 shadow-md rounded-lg'>
                    <div className='text-center font-bold text-white mb-6 text-2xl'>Login to continue</div>
                    <TextInput placeholder={"Enter your email"} label={"Email"} className="text-rev-color" value={email} setValue={setEmail} />
                    <PasswordInput placeholder={"Enter your Password"} label={"Password"} className="text-rev-color" value={password} setValue={setPassword} />
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
                        <div className='flex flex-col justify-items-center mb-4 space-y-4'>
                            <button
                                className='bg-slate-900 border font-semibold p-2 rounded-full block text-white hover:bg-slate-800'
                            >
                                    <Link to={"/register"}>
                                <div className='flex flex-wrap items-center place-content-center'>
                                        <Icon icon="mdi:register" width="28" height="28" />
                                        Create an account
                                </div>
                                    </Link>
                            </button>

                            <button
                                className='bg-slate-900 border font-semibold p-2 rounded-full block text-white hover:bg-slate-800'
                                onClick={handleGoogleLogin}
                            >
                                <div className='flex flex-wrap items-center place-content-center'>

                                    <Icon icon="flat-color-icons:google" width="28" height="28" />
                                    Login with Google
                                </div>
                            </button>

                            <button
                                className='bg-slate-900 border font-semibold p-2 rounded-full block text-white hover:bg-slate-800'
                                onClick={handleSpotifyLogin}
                            >
                                <div className='flex flex-wrap items-center place-content-center'>

                                    <Icon icon="logos:spotify-icon" width="28" height="28" />
                                    Login with Spotify
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default LoginComponent;
