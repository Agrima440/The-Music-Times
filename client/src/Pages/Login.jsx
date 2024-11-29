import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { IoMailOutline, IoKeyOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showToast } from '../utils/toast';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const navigate = useNavigate();
    const formRef = useRef(null);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!formData.email || !formData.password) {
                showToast('Registered Email/Password required', 'warning')
                return
            } else {
                const response = await axios.post('/api/user/login', formData);
                console.log(response.data);
                // Handle successful login (e.g., save token, redirect)

                if (response.data.success) {
                    showToast('Login Successful', 'success')
                                            navigate('/')

                    // setTimeout(() => {
                    //     navigate('/')
                    // }, 1000);

                    localStorage.setItem('username',response.data.user.name)
                } else {
                    showToast(response.data.message, 'warning')
                }
            }
        } catch (error) {
            console.log('Login failed:', error);
            // Handle login error
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const decoded = jwtDecode(credentialResponse.credential);
            
            const googleUser = {
                name: decoded.name,
                email: decoded.email,
                googleId: decoded.sub,
                picture: decoded.picture
            };

            const response = await axios.post('/api/user/google-auth', googleUser);
            
            if (response.data.success) {
                showToast('Successfully signed in with Google', 'success');
                localStorage.setItem('username', response.data.user.name);
                navigate('/');
            } else {
                showToast(response.data.message, 'warning');
            }
        } catch (error) {
            console.error('Google auth failed:', error);
            showToast('Google authentication failed', 'error');
        }
    };

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo('.form-container',
            {
                y: 20,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
            }
        );
    }, []);

    return (
        <div className="min-h-screen bg-main dark:bg-black flex items-center justify-center">
            <div ref={formRef} className="relative w-full max-w-md">
                <form className="form-container dark:bg-black/50 bg-gray-100 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20 shadow-[0_0_25px_-5px_rgba(66,153,225,0.3)]">
                    <div className="space-y-2 mb-8">
                        <h2 className="text-3xl font-bold text-blue-400 text-center glow-text">
                            Welcome Back
                        </h2>
                        <p className="dark:text-blue-200/60 text-sm text-center">
                            Enter your credentials to access your account
                        </p>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-4 mb-6">
                        <div className="relative group">
                            <IoMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email address"
                                className="w-full dark:bg-black/50 dark:text-blue-100 rounded-xl px-11 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 border border-blue-500/20 transition-all placeholder:text-blue-300/30 group-hover:border-blue-500/40"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative group">
                            <IoKeyOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Password"
                                className="w-full dark:bg-black/50 dark:text-blue-100 rounded-xl px-11 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 border border-blue-500/20 transition-all placeholder:text-blue-300/30 group-hover:border-blue-500/40"
                            />
                        </div>
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-500/80 text-white font-medium rounded-xl py-3 transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_-5px_rgba(66,153,225,0.9)] mb-6"
                    >
                        Sign In
                    </button>

                    {/* Google Login */}
                    <div className="mb-6">
                        <GoogleOAuthProvider clientId="932432627604-ec4g0g4f4h0eql0bou8a6hqhau7ofmoq.apps.googleusercontent.com">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={() => {
                                    showToast('Google Sign In Failed', 'error');
                                }}
                                theme="filled_blue"
                                shape="rectangular"
                                text="continue_with"
                                useOneTap={true}
                                auto_select={true}
                            />
                        </GoogleOAuthProvider>
                    </div>

                    {/* Links */}
                    <div className="flex items-center justify-between text-sm dark:text-blue-300/60">
                        <Link to="/forgot-password" className="hover:text-blue-600 rounded-lg hover:bg-blue-500/10 p-2 transition-colors">
                            Forgot password?
                        </Link>
                        <Link to="/signup" className="hover:text-blue-600 rounded-lg hover:bg-blue-500/10 p-2 transition-colors">
                            Create account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
