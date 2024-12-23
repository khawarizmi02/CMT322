'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import fireauth from '@/firebase/services/fireauth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Mail, Lock, LogIn, Globe } from 'lucide-react';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fireauth.signIn(email, password);
            console.log('Sign In Successful');
            //router.push('/dashboard');
        } catch (error) {
            setError('Failed to sign in. Please check your credentials.');
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await fireauth.signInWithGoogle();
            console.log('Google Sign In Successful');
            //router.push('/dashboard');
        } catch (error) {
            setError('Failed to sign in with Google.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-semibold">Login</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && (
                        <div className="flex items-center gap-2 p-3 mb-4 bg-red-100 text-red-600 rounded">
                            <AlertCircle className="w-5 h-5" />
                            <p>{error}</p>
                        </div>
                    )}
                    <form onSubmit={handleSignIn} className="space-y-4">
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <Input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={handleEmailChange}
                                className="pl-10"
                                required
                            />
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                            <Input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                                className="pl-10"
                                required
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center gap-2"
                        >
                            <LogIn className="w-5 h-5" />
                            Sign In
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center space-y-3">
                    <Button
                        onClick={handleGoogleSignIn}
                        className="flex items-center gap-2 w-full bg-red-500 hover:bg-red-600 text-white"
                    >
                        <Globe className="w-5 h-5" />
                        Sign In with Google
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage;
