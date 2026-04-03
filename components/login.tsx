
"use client";

import axios from 'axios';
import error from 'next/dist/api/error';
import { useRouter } from 'next/navigation';
import React, { use, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

interface Response {
    data: {
        message: string;
        role: string;
        success: boolean;
        token: string;
    }
}

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const payload = {
                "type": "password",
                "email": username,
                "password": password
            }

            const api = "https://staging-backend.thebobproject.co/api/v2/login"

            const res: Response = await axios.post(api, payload)

            if (res.data.role == "member") {
                localStorage.setItem('token', res.data.token);
                router.push('/member')
            } else {
                // Handle other roles or unsuccessful login
                toast.error("Create your account first")
            }

            setLoading(false)

        } catch (error) {
            setLoading(false)
            toast.error("something went wrong")
        }
    }

    return (
        <div className=''>
            <div className='max-w-sm mx-auto'>
                <div className='bg-gray-200 rounded-lg p-4'>
                    <form onSubmit={handleSubmit}>
                        <div className=''>
                            <label htmlFor="username">Username</label>
                            <div>
                                <input value={username} onChange={(e) => setUsername(e.target.value)} required type="text" id="username" className='bg-white w-full rounded-lg p-2' />
                            </div>
                        </div>
                        <div className='mt-4'>
                            <label htmlFor="password">Password</label>
                            <div>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" id="password" className='bg-white w-full rounded-lg p-2' />
                            </div>
                        </div>

                        <div className='flex justify-center mt-6'>
                            <button type='submit' className='bg-blue-500 text-white w-32 cursor-pointer mx-auto p-2 rounded-lg' disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default Login