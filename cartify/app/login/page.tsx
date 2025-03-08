'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        const getCookie = (name: string) => {
            const cookies = document.cookie.split('; ');
            for (const cookie of cookies) {
                const [cookieName, cookieValue] = cookie.split('=');
                if (cookieName === name) return cookieValue;
            }
            return null;
        };
    
        const token = getCookie('jwt');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);


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

    // Function to handle login
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
                    variables: {
                        username,
                        password,
                    },
                }),
            });
    
            const result = await response.json();
    
            if (result.errors) {
                setError('Invalid credentials');
            } else {
                const token = result.data?.login;
                if (token) {
                    setCookie('jwt', token, 7);
                    setIsAuthenticated(true);
                    router.push('/');
                }
            }
        } catch {
            setError('Something went wrong');
        }
    };

    // Function to handle logout
    const handleLogout = () => {
        document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        router.push('/login');
    };

    // Auto-redirect if user is already logged in
    useEffect(() => {
        const token = getCookie('jwt');
        if (token) {
            router.push('/');
        }
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-semibold mb-4">Login</h2>
                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border rounded mb-4"
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
                <button type="button" onClick={handleLogout} className="mt-2 w-full bg-red-500 text-white p-2 rounded">
                    Logout
                </button>
            </form>
        </div>
    );
}
