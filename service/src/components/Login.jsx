import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginInfo;

        // Basic validation
        if (!email || !password) {
            return handleError('Email and password are required');
        }

        try {
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })  // Ensure only email and password are sent
            });

            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;

            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);

                // Redirecting after success
                setTimeout(() => {
                    navigate('/home');
                }, 1000);  // 1-second delay to display success message
            } else if (error && error.details) {
                // Handling validation errors from backend
                const details = error.details[0]?.message || "An error occurred during login.";
                handleError(details);
            } else {
                // Handling any other generic errors
                handleError(message || "Login failed. Please try again.");
            }

        } catch (err) {
            // Catching any unexpected errors
            handleError("An unexpected error occurred. Please try again later.");
            console.error(err);  // For debugging
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-b from-black to-gray-900'>
            <div className='bg-gray-800 p-8 rounded-lg shadow-md w-96'>
                <h1 className='text-2xl font-bold text-white mb-6 text-center'>Login</h1>
                <form onSubmit={handleLogin}>
                    <div className='mb-4'>
                        <label htmlFor='email' className='block text-gray-300'>Email</label>
                        <input
                            onChange={handleChange}
                            type='email'
                            name='email'
                            placeholder='Enter your email...'
                            value={loginInfo.email}
                            className='mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='password' className='block text-gray-300'>Password</label>
                        <input
                            onChange={handleChange}
                            type='password'
                            name='password'
                            placeholder='Enter your password...'
                            value={loginInfo.password}
                            className='mt-1 block w-full p-2 border border-gray-600 rounded bg-gray-700 text-white focus:outline-none focus:border-blue-500'
                        />
                    </div>
                    <button type='submit' className='w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded'>
                        Login
                    </button>
                    <span className='block text-gray-400 text-center mt-4'>
                        Doesn't have an account? <Link to="/signup" className='text-blue-500 hover:underline'>Signup</Link>
                    </span>
                </form>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;
