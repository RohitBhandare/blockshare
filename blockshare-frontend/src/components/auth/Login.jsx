import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import AuthService from '../../services/AuthService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const SignupModal = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSignup = async () => {
        try {
            // Call the AuthService.signup() method and wait for the response
            const response = await AuthService.signup(username, email, password);
    
            // Check if the signup was successful
            if (response) {
                alert('Signup successful');
                console.log('Signup successful:');
                // Handle successful signup, e.g., redirect to another page
            } else {
                console.error('Signup failed:', response.data.error);
                // Handle failed signup, e.g., display error message to the user
            }
        } catch (error) {
            console.error('Signup error:');
            // Handle error, e.g., display error message to the user
        }
    };
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
                <h2 className="text-3xl font-bold mb-4 text-center">Sign Up</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-400"
                        required
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-400"
                    />
                    {/* {email && !isValidEmail(email) && (
                        <p className="text-red-500 text-sm mt-1">Please enter a valid email address for verification.</p>
                    )} */}
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        onClick={handleSignup}
                        className="w-2/5 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline relative"
                        disabled={loading}
                    >
                        {loading && (
                            <FontAwesomeIcon icon={faSpinner} spin className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        )}
                        {!loading ? 'Sign Up' : 'Signing Up...'}
                    </button>
                    <button
                        onClick={onClose}
                        className="w-2/5 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSignupModal, setShowSignupModal] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            if (!username || !password) {
                alert('Please fill in all fields');
                return;
            }

            setLoading(true);

            const success = await login(username, password);

            if (success) {
                alert('Login successful');
                navigate('/app/dashboard');
            } else {
                alert('Login failed');
            }
        } catch (error) {
            alert('Error during login');
            console.error('Error during login:', error.message);
        } finally {
            setLoading(false);
        }
    };

    const openSignupModal = () => {
        setShowSignupModal(true);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900">
            <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
                <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-400"
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full px-4 py-2 rounded border focus:outline-none focus:border-blue-400"
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline relative"
                    disabled={loading}
                >
                    {loading && (
                        <FontAwesomeIcon icon={faSpinner} spin className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    )}
                    {!loading ? 'Login' : 'Logging In...'}
                </button>
                <div className="mt-4 text-center">
                    <button
                        onClick={openSignupModal}
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sign Up
                    </button>
                </div>
            </div>
            {showSignupModal && (
                <SignupModal onClose={() => setShowSignupModal(false)} />
            )}
        </div>
    );
};

export default Login;
