"use client"

import { useShop } from '@/hooks/use-shop';
import { Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from "react";

const CheckoutView = () => {
    const { cart, cartTotal, clearCart } = useShop();
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => { setLoading(false); clearCart(); router.push('/success'); }, 1500);
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-4 lg:p-10 rounded-2xl lg:rounded-[2.5rem] border border-slate-200">
            <h2 className="text-3xl font-black mb-10">Checkout</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <input required className="w-full border p-4 rounded-2xl" placeholder="Full Name" />
                <input required type="email" className="w-full border p-4 rounded-2xl" placeholder="Email" />
                <input required className="w-full border p-4 rounded-2xl" placeholder="Address" />
                <button disabled={loading} className="w-full bg-indigo-600 cursor-pointer text-white py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 disabled:opacity-50">
                    {loading ? <Loader2 className="animate-spin" /> : `Pay $${(cartTotal * 1.08).toFixed(2)}`}
                </button>
            </form>
        </div>
    );
};

export default CheckoutView