"use client";
import { useRouter } from "next/navigation";
import { FaUser, FaEnvelope, FaLock, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaArrowLeft } from "react-icons/fa";

export default function SignUp() {
    const router = useRouter();

    return (
        <>
            <div
                className="min-h-screen flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: "url('/images/Signup.png')" }}
            >

                <div className="max-w-4xl w-full flex overflow-hidden rounded-2xl border border-white/20 shadow-2xl">

                    {/* Left Side - Welcome Section (Less Blurred) */}
                    <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-10 backdrop-blur-sm text-white">
                        <h1 className="text-3xl font-bold">Welcome to CARTIFY</h1>
                        <p className="mt-3 text-center">Be Bold, Be Fashionable</p>
                        <div className="flex gap-4 mt-5 text-xl">
                            <FaLinkedin className="cursor-pointer hover:text-blue-500 transition" />
                            <FaFacebook className="cursor-pointer hover:text-blue-700 transition" />
                            <FaInstagram className="cursor-pointer hover:text-pink-500 transition" />
                            <FaTwitter className="cursor-pointer hover:text-blue-400 transition" />
                        </div>
                    </div>

                    {/* Right Side - Sign Up Form (More Blurred) */}
                    <div className="w-full md:w-1/2 p-10 bg-black/10 backdrop-blur-lg text-white">
                        <FaArrowLeft
                            className="absolute top-5 left-5 text-white text-2xl cursor-pointer hover:text-gray-300 transition"
                            onClick={() => router.push("/")}
                        />
                        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

                        <form className="space-y-4">
                            {/* Username */}
                            <div className="relative">
                                <FaUser className="absolute left-3 top-3 text-gray-300" />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    className="w-full px-10 py-3 border rounded-lg bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            {/* Email */}
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-3 text-gray-300" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full px-10 py-3 border rounded-lg bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <FaLock className="absolute left-3 top-3 text-gray-300" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full px-10 py-3 border rounded-lg bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <FaLock className="absolute left-3 top-3 text-gray-300" />
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    className="w-full px-10 py-3 border rounded-lg bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-red-500"
                                />
                            </div>

                            <button className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                                Sign Up
                            </button>
                        </form>

                        <p className="text-center mt-4">
                            Already have an account? <a href="#" onClick={() => router.push("/login")} className="text-red-400 hover:underline">Sign in</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
