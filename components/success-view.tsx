
"use client"

import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

const SuccessView = () => {
    const router = useRouter()
    return (
        <div className="text-center py-32">
            <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-green-600"><CheckCircle2 size={48} /></div>
            <h2 className="text-4xl font-black mb-6">Order Placed!</h2>
            <button onClick={() => router.push('/')} className="bg-slate-900 cursor-pointer text-white px-10 py-4 rounded-2xl font-bold">Back to Home</button>
        </div>
    );
};

export default SuccessView