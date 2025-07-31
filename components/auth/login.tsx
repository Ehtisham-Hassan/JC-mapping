'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { SparklesCore } from '@/components/ui/aceternity/SparklesCore';
import { BackgroundGradient } from '@/components/ui/aceternity/BackgroundGradient';
import { TextReveal } from '@/components/ui/aceternity/TextReveal';
import Link from 'next/link';
import { authService } from '@/lib/api/auth';

export default function LoginScreen() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        // VALIDATION
        const emailErr = validateEmail(email);
        const passwordErr = validatePassword(password);
        if (emailErr) {
            setError(emailErr);
            setIsLoading(false);
            return;
        }
        if (passwordErr) {
            setError(passwordErr);
            setIsLoading(false);
            return;
        }

        try {
            // Template version - always succeeds
            await authService.login({
                email,
                password,
                rememberMe: true,
                enterprise_id: 'default'
            });

            // Redirect to the original URL or dashboard
            const redirectUrl = searchParams.get('redirect') || '/dashboard';
            router.push(redirectUrl);
        } catch (err) {
            console.error('Login error:', err);
            setError('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden p-4">
            {/* Background Effects */}
            <SparklesCore
                id="tsparticlesfullpage"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                className="absolute inset-0"
                particleColor="#FFFFFF"
            />

            {/* Login Form Container */}
            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                    }}
                    className="w-16 h-16 rounded-xl bg-transparent flex items-center justify-center mx-auto mb-8"
                >
                    <img src="/assets/icons/login-Group 43071.svg" alt="GemText Logo" className="w-14 h-14" />
                </motion.div>

                <TextReveal
                    text="Welcome Back"
                    className="text-white text-3xl font-bold text-center mb-2"
                />
                
                <TextReveal
                    text="Sign in to continue your journey"
                    className="text-white/60 text-center mb-8"
                />

                <BackgroundGradient className="rounded-2xl" gradientClassName="opacity-75">
                    <motion.form
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        onSubmit={handleLogin}
                        className="p-8 rounded-2xl bg-black/95 backdrop-blur-xl space-y-6"
                    >
                        {error && (
                            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-white/60 text-sm" htmlFor="email">Email</label>
                            <div className="relative">
                                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-white/60 text-sm" htmlFor="password">Password</label>
                            <div className="relative">
                                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-10 py-2.5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                    placeholder="Enter your password"
                                />
                            </div>
                            <div className="text-right">
                                <Link href="/forgot-password" className="text-purple-400 hover:text-purple-300 transition-colors text-sm">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            disabled={isLoading}
                            className="w-full relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg animate-gradient-xy opacity-70" />
                            <div className="relative px-8 py-2.5 rounded-lg bg-black/50 backdrop-blur-xl transition-all duration-200 group-hover:bg-black/40">
                                <span className="relative z-10 flex items-center justify-center w-full text-white font-medium">
                                    {isLoading ? 'Signing in...' : 'Sign In'}
                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </span>
                            </div>
                        </motion.button>
                        
                        <p className="text-center text-white/60 text-sm pt-2">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-purple-400 hover:text-purple-300 transition-colors">
                                Create one
                            </Link>
                        </p>
                    </motion.form>
                </BackgroundGradient>
            </div>

            {/* Background Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-transparent" />
        </div>
    );
}

