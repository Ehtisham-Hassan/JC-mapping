'use client';
import { motion } from 'framer-motion';
import { Brain, Lock, Mail, User, Building, ArrowRight } from 'lucide-react';
import { SparklesCore } from '../ui/aceternity/SparklesCore';
import { BackgroundGradient } from '../ui/aceternity/BackgroundGradient';
import { TextReveal } from '../ui/aceternity/TextReveal';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/lib/api/auth';

const ComponentsAuthRegisterForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        organizationName: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const validateEmail = (email: string) => {
        // Gmail and general email validation
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return 'Email is required';
        if (!emailRegex.test(email)) return 'Please enter a valid email address';
        if (!gmailRegex.test(email)) return 'Only Gmail addresses are allowed';
        if (/\.\./.test(email)) return 'Email cannot have consecutive dots';
        if (/^\.|\.$/.test(email.split('@')[0])) return 'Email cannot start or end with a dot before @';
        return '';
    };
    const validatePassword = (password: string) => {
        if (!password) return 'Password is required';
        if (password.length < 8) return 'Password must be at least 8 characters';
        if (!/[A-Z]/.test(password)) return 'Password must contain an uppercase letter';
        if (!/[a-z]/.test(password)) return 'Password must contain a lowercase letter';
        if (!/[0-9]/.test(password)) return 'Password must contain a number';
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) return 'Password must contain a special character';
        return '';
    };

    const validateForm = () => {
        const errors: Record<string, string> = {};
        
        if (!formData.firstName.trim()) {
            errors.firstName = 'First name is required';
        }
        if (!formData.lastName.trim()) {
            errors.lastName = 'Last name is required';
        }
        if (!formData.organizationName.trim()) {
            errors.organizationName = 'Organization name is required';
        }
        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        } else {
            const emailErr = validateEmail(formData.email);
            if (emailErr) errors.email = emailErr;
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        } else {
            const passwordErr = validatePassword(formData.password);
            if (passwordErr) errors.password = passwordErr;
        }

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear field error when user starts typing
        if (fieldErrors[name]) {
            setFieldErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            await authService.register({
                first_name: formData.firstName,
                last_name: formData.lastName,
                organization_name: formData.organizationName,
                email: formData.email,
                password: formData.password
            });

            // Redirect to verification page
            router.push(`/verify-email?email=${encodeURIComponent(formData.email)}`);
        } catch (err) {
            if (err instanceof Error) {
                if (err.message.includes('email already exists')) {
                    setError('An account with this email already exists. Please try logging in or use a different email.');
                } else {
                    setError(err.message);
                }
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden p-4">
            <SparklesCore
                id="tsparticlesfullpage"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                className="absolute inset-0"
                particleColor="#FFFFFF"
            />

            <div className="w-full max-w-md relative z-10">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                    className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-8"
                >
                    <Brain className="w-10 h-10 text-white" />
                </motion.div>

                <TextReveal
                    text="Create Your Account"
                    className="text-white text-3xl font-bold text-center mb-2"
                />
                
                <TextReveal
                    text="Start your AI sales training journey"
                    className="text-white/60 text-center mb-8"
                />

                <BackgroundGradient className="rounded-[22px]" gradientClassName="opacity-20">
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        onSubmit={handleRegister}
                        className="p-8 rounded-[20px] bg-black/80 backdrop-blur-xl space-y-6"
                    >
                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-white/60 text-sm">First Name</label>
                                <div className="relative">
                                    <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className={`w-full bg-white/5 border ${fieldErrors.firstName ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-10 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                                        // placeholder="John"
                                    />
                                </div>
                                {fieldErrors.firstName && (
                                    <p className="text-red-500 text-xs">{fieldErrors.firstName}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-white/60 text-sm">Last Name</label>
                                <div className="relative">
                                    <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className={`w-full bg-white/5 border ${fieldErrors.lastName ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-10 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                                        placeholder="Doe"
                                    />
                                </div>
                                {fieldErrors.lastName && (
                                    <p className="text-red-500 text-xs">{fieldErrors.lastName}</p>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-white/60 text-sm">Organization Name</label>
                            <div className="relative">
                                <Building className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                                <input
                                    type="text"
                                    name="organizationName"
                                    value={formData.organizationName}
                                    onChange={handleChange}
                                    className={`w-full bg-white/5 border ${fieldErrors.organizationName ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-10 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                                    placeholder="Your Company Name"
                                />
                            </div>
                            {fieldErrors.organizationName && (
                                <p className="text-red-500 text-xs">{fieldErrors.organizationName}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-white/60 text-sm">Email</label>
                            <div className="relative">
                                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full bg-white/5 border ${fieldErrors.email ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-10 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                                    placeholder="john@company.com"
                                />
                            </div>
                            {fieldErrors.email && (
                                <p className="text-red-500 text-xs">{fieldErrors.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="text-white/60 text-sm">Password</label>
                            <div className="relative">
                                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full bg-white/5 border ${fieldErrors.password ? 'border-red-500/50' : 'border-white/10'} rounded-lg px-10 py-2 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/20`}
                                    placeholder="••••••••"
                                />
                            </div>
                            {fieldErrors.password && (
                                <p className="text-red-500 text-xs">{fieldErrors.password}</p>
                            )}
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isLoading}
                            className="w-full group relative inline-flex items-center justify-center px-8 py-3 font-medium text-white bg-gradient-to-r from-primary/80 to-secondary/80 rounded-lg overflow-hidden transition-all duration-300 hover:from-primary hover:to-secondary"
                            type="submit"
                        >
                            <span className="relative z-10 flex items-center justify-center w-full">
                                {isLoading ? 'Creating Account...' : 'Create Account'}
                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                            </span>
                            <div className="absolute inset-0 bg-white/20 backdrop-blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                        </motion.button>

                        <p className="text-center text-white/60 text-sm">
                            Already have an account?{' '}
                            <Link href="/login" className="text-primary hover:text-primary-light transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </motion.form>
                </BackgroundGradient>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent" />
        </div>
    );
};

export default ComponentsAuthRegisterForm;
