'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaUser, FaLock} from "react-icons/fa";
import Navbar from '../components/Navbar';

export default function Signup() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const setCookie = (name: string, value: string, days: number) => {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    const getCookie = (name: string) => {
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const [cookieName, cookieValue] = cookie.split('=');
            if (cookieName === name) return cookieValue;
        }
        return null;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/auth/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    query: `
                        mutation Login($username: String!, $password: String!) {
                            login(username: $username, password: $password)
                        }
                    `,
                    variables: { username, password },
                }),
            });

            const result = await response.json();
            if (result.errors) {
                setError('Invalid credentials');
            } else {
                const token = result.data?.login;
                if (token) {
                    setCookie('jwt', token, 7);
                    router.push('/');
                }
            }
        } catch {
            setError('Something went wrong');
        }
    };

    useEffect(() => {
        const token = getCookie('jwt');
        if (token) {
            router.push('/');
        }
    }, [router]);

    return (
        <>
        <Navbar/>
        <div className="mt-16 flex items-center justify-center">
            <div className="max-w-3xl w-full flex overflow-hidden rounded-2xl border shadow-2xl">
                <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-10 bg-blue-300 text-white">
                    <h1 className="text-5xl font-bold">Welcome to CARTIFY</h1>
                    <p className="mt-3 text-center">Be Bold, Be Fashionable</p>
                </div>
                <div className="w-full md:w-1/2 p-10 bg-white">
                    <h2 className="text-2xl font-semibold text-center mb-6 text-black">Sign Up</h2>
                    <form className="space-y-4" onSubmit={handleLogin}>
                        <div className="relative">
                            <FaUser className="absolute left-3 top-4 text-black" />
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-10 py-3 border border-black rounded-lg bg-transparent text-black placeholder-black focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div className="relative">
                        <FaEnvelope className="absolute left-3 top-4 text-black" />
                            <input
                                type="text"
                                placeholder="Email"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-10 py-3 border border-black rounded-lg bg-transparent text-black placeholder-black focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div className="relative">
                            <FaLock className="absolute left-3 top-4 text-black" />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-10 py-3 border border-black rounded-lg bg-transparent text-black placeholder-black focus:ring-2 focus:ring-red-500"
                            />
                        </div>
                        <div className="flex justify-between items-center text-black">
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" className="form-checkbox text-red-500" />
                                <span>Remember me</span>
                            </label>
                            <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
                        </div>
                        <button className="w-full py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition" type="submit">
                            Log In
                        </button>
                    </form>
                    {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                    <p className="text-center mt-4 text-black">
                        Have an account?  <a href="#" onClick={() => router.push("/login")} className="text-blue-500 hover:underline"> Log In</a>
                    </p>
                </div>
            </div>
        </div>
        </>
    );
}