import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FcGoogle } from 'react-icons/fc';
import { IoMailOutline, IoKeyOutline, IoPersonOutline } from 'react-icons/io5';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { showToast } from '../utils/toast';
import { jwtDecode } from 'jwt-decode';

const SignUp = () => {
    
    
    const navigate = useNavigate()
    const formRef = useRef(null);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!formData.email || !formData.password || !formData.confirmPassword || !formData.name) {
                showToast('All fields required', 'error')
                return
            }

            else if (formData.password !== formData.confirmPassword) {
                showToast('Confirm your password', 'info')
                return;
            } else {

                const response = await axios.post('/api/user/register', formData);
                if (response.data.success) {
                    showToast(response.data.message, 'success')
                    navigate('/')
                }
                else {
                    showToast(response.data.message, 'warning')
                   
                        navigate('/login')
                    
                }
            }
        } catch (error) {
            console.error('Signup failed:', error);
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
                navigate('/');
            } else {
                showToast(response.data.message, 'warning');
            }
        } catch (error) {
            console.error('Google auth failed:', error);
            showToast('Google authentication failed', 'error');
        }
    };

    return (
        <div className="min-h-screen bg-main dark:bg-black flex items-center justify-center">
            <div
                ref={formRef}
                className="relative w-full max-w-md"
            >
                {/* Form Container */}
                <div className="form-container dark:bg-black/50 bg-gray-100 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/20 shadow-[0_0_25px_-5px_rgba(66,153,225,0.3)]">
                    <div className="space-y-2 mb-8">
                        <h2 className="text-3xl font-bold text-blue-400 text-center glow-text">
                            Create Account
                        </h2>
                        <p className="dark:text-blue-200/60 text-sm text-center">
                            Sign up to get started with your new account
                        </p>
                    </div>

                    {/* Input Fields */}
                    <div className="space-y-4 mb-6">
                        {/* Name Input */}
                        <div className="relative group">
                            <IoPersonOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                            <input
                                type="text"
                                placeholder="Full Name"
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full dark:bg-black/50 dark:text-blue-100 rounded-xl px-11 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 border border-blue-500/20 transition-all placeholder:text-blue-300/30 group-hover:border-blue-500/40"
                            />
                        </div>

                        {/* Email Input */}
                        <div className="relative group">
                            <IoMailOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                            <input
                                type="email"
                                placeholder="Email address"
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full dark:bg-black/50 dark:text-blue-100 rounded-xl px-11 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 border border-blue-500/20 transition-all placeholder:text-blue-300/30 group-hover:border-blue-500/40"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="relative group">
                            <IoKeyOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                            <input
                                type="password"
                                placeholder="Password"
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full dark:bg-black/50 dark:text-blue-100 rounded-xl px-11 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 border border-blue-500/20 transition-all placeholder:text-blue-300/30 group-hover:border-blue-500/40"
                            />
                        </div>

                        {/* Confirm Password Input */}
                        <div className="relative group">
                            <IoKeyOutline className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400" size={20} />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full dark:bg-black/50 dark:text-blue-100 rounded-xl px-11 py-3 outline-none focus:ring-2 focus:ring-blue-500/50 border border-blue-500/20 transition-all placeholder:text-blue-300/30 group-hover:border-blue-500/40"
                            />
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <button className="w-full bg-blue-500/80 text-white font-medium rounded-xl py-3 transition-all hover:bg-blue-500 hover:shadow-[0_0_20px_-5px_rgba(66,153,225,0.9)] mb-6" onClick={handleSubmit}>
                        Sign Up
                    </button>

                    {/* Google Sign Up */}
                    <button className="w-full dark:bg-black/50 backdrop-blur-sm border border-blue-500/20 rounded-xl p-3 flex items-center justify-center gap-3 transition-all group mb-6">
                        <FcGoogle size={22} className="group-hover:scale-110 transition-transform" />
                        <span className="dark:text-blue-100">Continue with Google</span>
                    </button>

                    {/* Login Link */}
                    <div className="text-center text-sm dark:text-blue-300/60">
                        <span>Already have an account? </span>
                        <Link to="/login" className="hover:text-blue-600 rounded-lg hover:bg-blue-500/10 p-2 transition-colors">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
