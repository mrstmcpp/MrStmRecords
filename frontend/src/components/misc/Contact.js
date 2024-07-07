import React from 'react';
import Layout from '../../layouts/Layout';
import TextInput from '../shared/TextInput';

const ContactUs = () => {
    return (
        <Layout>
            <div className='bg-app-color flex flex-col items-center justify-center py-40'>
                <div className='w-full max-w-lg px-6 py-10 bg-gray-800 shadow-md rounded-lg'>
                    <div className='text-center text-rev-color mb-6 text-2xl font-bold'>Contact Us</div>
                    <TextInput placeholder="Your Name" label="Name" />
                    <TextInput placeholder="you@example.com" label="Email" type="email" />
                    <div className="flex flex-col mb-4">
                        <label htmlFor="message" className="mb-2 font-semibold text-rev-color">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            className="border border-gray-400 rounded border-solid p-3 placeholder-slate-500"
                            placeholder="Your message"
                        ></textarea>
                    </div>
                    <div className='flex justify-center mt-6'>
                        <button className='bg-orange-500 font-semibold p-2 px-7 rounded-full block text-white hover:bg-orange-400'>
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ContactUs;
