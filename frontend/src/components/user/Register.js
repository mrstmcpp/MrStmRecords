import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../layouts/Layout';
import TextInput from '../shared/TextInput';
import PasswordInput from '../shared/PasswordInput';
import { unauthenticatedPostRequest } from '../../utils/ServerHelpers';

const RegisterComponent = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("success");

    const signUp = async () => {
        if (password !== confirmPassword) {
            setAlertMessage("Passwords do not match. Please try again.");
            setAlertType("error");
            return;
        }

        const data = { email, password, firstName, lastName, username };
        const response = await unauthenticatedPostRequest("/auth/register", data);
        
        if (response && !response.err) {
            setAlertMessage("Registration successful! Login through login page");
            setAlertType("success");
        } else {
            setAlertMessage("Registration failed. Please try again later.");
            setAlertType("error");
        }
    }

    return (
        <Layout>
            <div className='bg-app-color flex flex-col items-center justify-center py-40'>
                <div className='w-full max-w-lg px-6 py-10 bg-gray-800 shadow-md rounded-lg'>
                    <div className='text-center font-bold text-rev-color mb-6 text-2xl'>Register your account</div>
                    <TextInput placeholder="Enter your first name" label="First Name" value={firstName} setValue={setFirstName} />
                    <TextInput placeholder="Enter your last name" label="Last Name" value={lastName} setValue={setLastName} />
                    <TextInput placeholder="Enter your username" label="Username" value={username} setValue={setUsername} />
                    <TextInput placeholder="Enter your email" label="Email" value={email} setValue={setEmail} />
                    <PasswordInput placeholder="Enter your Password" label="Password" value={password} setValue={setPassword} />
                    <PasswordInput placeholder="Confirm your Password" label="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} />
                    <div className='flex items-center mt-4'>
                        <input
                            type='checkbox'
                            id='terms'
                            className='mr-2'
                            checked={agreedToTerms}
                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                        />
                        <label htmlFor='terms' className='text-rev-color'>I agree to the <Link to="/terms" className='text-sky-500 hover:text-sky-700'>Terms and Conditions</Link></label>
                    </div>
                    <div className='flex justify-center mt-6'>
                        <button
                            className={`bg-orange-500 font-semibold p-2 px-7 rounded-full block text-white ${agreedToTerms ? 'hover:bg-orange-400' : 'opacity-50 cursor-not-allowed'}`}
                            disabled={!agreedToTerms}
                            onClick={(e) => {
                                e.preventDefault();
                                signUp();
                            }}
                        >
                            Sign Up
                        </button>
                    </div>
                    <div className='flex justify-center mt-4'>
                        <Link to="/login" className='text-base text-sky-500 hover:text-sky-700'>
                            Already have an account? Login
                        </Link>
                    </div>
                    {alertMessage && (
                        <div className={`mt-4 p-3 rounded-md text-center ${alertType === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                            {alertMessage}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default RegisterComponent;
