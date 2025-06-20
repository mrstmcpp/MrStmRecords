import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../layouts/Layout';
import TextInput from '../shared/TextInput';
import PasswordInput from '../shared/PasswordInput';
import { unauthenticatedPostRequest } from '../../utils/ServerHelpers';
import { toast } from 'react-toastify';

const RegisterComponent = () => {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const navigate = useNavigate();

    const signUp = async () => {
        if (!email || !firstName || !lastName || !password || !confirmPassword) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match. Please try again.");
            return;
        }

        if (!agreedToTerms) {
            toast.error("You must agree to the terms and conditions.");
            return;
        }

        const data = { email, password, firstName, lastName };
        try {
            const response = await unauthenticatedPostRequest("/user/register", data);
            if (response && !response.err) {
                toast.success("Registration successful! Login through the login page.");
                navigate('/login');  // Navigate to login page on successful registration
            } else {
                toast.error("Registration failed. Please try again later.");
            }
        } catch (error) {
            toast.error("An error occurred during registration.");
        }
    }

    return (
        <Layout>
            <div className='bg-app-color flex flex-col items-center justify-center py-40'>
                <div className='w-full max-w-lg px-6 py-10 bg-gray-800 shadow-md rounded-lg'>
                    <div className='text-center font-bold text-rev-color mb-6 text-2xl'>Register your account</div>
                    <TextInput placeholder="Enter your first name" label="First Name" value={firstName} setValue={setFirstName} />
                    <TextInput placeholder="Enter your last name" label="Last Name" value={lastName} setValue={setLastName} />
                    <TextInput placeholder="Enter your email" label="Email" value={email} setValue={setEmail} />
                    <PasswordInput placeholder="Enter your Password" label="Password" value={password} setValue={setPassword} />
                    <PasswordInput placeholder="Confirm your Password" label="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} />
                    <div className='flex justify-center items-center mt-4'>
                        <input
                            type='checkbox'
                            id='terms'
                            className='mr-2 accent-green-500 items-center'
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
                </div>
            </div>
        </Layout>
    );
}

export default RegisterComponent;
