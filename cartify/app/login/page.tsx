"use client";
import { FaEnvelope, FaLock, FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Login() {
    const router = useRouter();

    return (
        <>
            <div
                className="min-h-screen flex items-center justify-center bg-cover bg-center"
                style={{ backgroundImage: "url('/images/Signup.png')" }}>
                <div className="max-w-4xl w-full flex overflow-hidden rounded-2xl border border-white/20 shadow-2xl">

                    <div className="hidden md:flex flex-col justify-center items-center w-1/2 p-10 bg-black/10 backdrop-blur-xs text-white">
                        <h1 className="text-3xl font-bold">Welcome to CARTIFY</h1>
                        <p className="mt-3 text-center">Be Bold, Be Fashionable</p>
                        <div className="flex gap-4 mt-5 text-xl">
                            <FaLinkedin className="cursor-pointer hover:text-blue-500 transition" />
                            <FaFacebook className="cursor-pointer hover:text-blue-700 transition" />
                            <FaInstagram className="cursor-pointer hover:text-pink-500 transition" />
                            <FaTwitter className="cursor-pointer hover:text-blue-400 transition" />
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 p-10 bg-black/15 backdrop-blur-sm">
                        <FaArrowLeft
                            className="absolute top-5 left-5 text-white text-2xl cursor-pointer hover:text-gray-300 transition"
                            onClick={() => router.push("/")}
                        />
                        <h2 className="text-2xl font-semibold text-center mb-6 text-white">Sign In</h2>

                        <form className="space-y-4">
                            <div className="relative">
                                <FaEnvelope className="absolute left-3 top-3 text-gray-300" />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full px-10 py-3 border rounded-lg bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-red-500"
                                />
                            </div>
                            <div className="relative">
                                <FaLock className="absolute left-3 top-3 text-gray-300" />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full px-10 py-3 border rounded-lg bg-transparent text-white placeholder-gray-300 focus:ring-2 focus:ring-red-500"
                                />
                            </div>
                            <div className="flex justify-between items-center text-white">
                                <label className="flex items-center space-x-2">
                                    <input type="checkbox" className="form-checkbox text-red-500" />
                                    <span>Remember me</span>
                                </label>
                                <a href="#" className="text-red-400 hover:underline">Forgot password?</a>
                            </div>
                            <button className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                                Sign In
                            </button>
                        </form>

                        <p className="text-center mt-4 text-white">
                            Don't have an account? <a href="#" onClick={() => router.push("/signup")} className="text-red-400 hover:underline">Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
