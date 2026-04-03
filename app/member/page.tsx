
"use client";

import axios from 'axios';
import { Building, Contact, Loader2Icon, Map, TowerControl } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const MemberPage = () => {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const api = "https://staging-backend.thebobproject.co/api/public/v2/event/list?page=1&per_page=100&who_can_register=public_users_bob_members&sort=newest"

    const fetchData = async () => {
        setLoading(true)
        // Implementation for fetching data
        try {
            const res = await axios.get(api)
            setData(res.data.data)
        } catch (error) {
            toast.error("something went wrong")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    if (loading) {
        return (
            <div className='flex justify-center h-56 items-center'>
                <Loader2Icon size={30} className=' animate-spin' />
            </div>
        )
    }


    console.log(data)

    return (
        <div className=' container mx-auto'>
            <div className='grid lg:grid-cols-2 gap-4'>
                <div className=''>
                    <img src={data?.data?.[0]?.thumbnail} className=' rounded-xl' alt={data?.title} />
                </div>
                <div className=''>
                    <h2 className='text-3xl font-medium'>{data?.data?.[0]?.title}</h2>
                    <p className='mt-1'>{data?.data?.[0]?.address_line_1}</p>

                    <div className='flex gap-2 mt-6'>
                        <div className='flex gap-1 text-blue-500'>
                            <TowerControl />
                            <span className='text-black'>{data?.data?.[0]?.city}</span>
                        </div>
                        <div className='flex gap-1 text-blue-500'>
                            <Building />
                            <span className='text-black'>{data?.data?.[0]?.state}</span>
                        </div>
                        <div className='flex gap-1 text-blue-500'>
                            <Map />
                            <span className='text-black'>{data?.data?.[0]?.pincode}</span>
                        </div>
                        <div className='flex gap-1 text-blue-500'>
                            <Contact />
                            <span className='text-black'>{data?.data?.[0]?.phone_number}</span>
                        </div>
                    </div>

                    <div className='mt-5'>{data?.data?.[0]?.description}</div>
                </div>
            </div>
        </div >
    )
}

export default MemberPage