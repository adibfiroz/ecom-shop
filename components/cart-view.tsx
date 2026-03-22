"use client"

import { useShop } from "@/hooks/use-shop";
import { CreditCard, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const CartView = () => {
    const router = useRouter()
    const { cart, updateQuantity, removeFromCart, cartTotal } = useShop();

    if (cart.length === 0) return (
        <div className="text-center py-32 bg-white rounded-[2.5rem] border border-slate-200 max-w-2xl mx-auto">
            <ShoppingBag size={48} className="mx-auto mb-8 text-slate-300" />
            <h2 className="text-3xl font-black mb-4">Bag is empty</h2>
            <button onClick={() => router.push('/')} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold">Start Shopping</button>
        </div>
    );

    return (
        <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
                <h2 className="text-3xl font-black mb-8">Shopping Bag</h2>
                {cart.map(item => (
                    <div key={item.id} className="flex gap-6 p-4 lg:p-6 flex-wrap bg-white rounded-xl lg:rounded-3xl border border-slate-200 items-center">
                        <img src={item.image} className="w-24 h-24 object-contain" alt={item.title} />
                        <div className="flex-1">
                            <h3 className="font-bold line-clamp-1">{item.title}</h3>
                            <p className="text-indigo-600 font-bold mb-4">${item.price.toFixed(2)}</p>
                            <div className="flex items-center gap-4">
                                <div className="flex border rounded-xl overflow-hidden bg-slate-50">
                                    <button onClick={() => updateQuantity(item.id, -1)} className="p-2"><Minus size={16} /></button>
                                    <span className="w-10 text-center font-bold flex items-center justify-center">{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.id, 1)} className="p-2"><Plus size={16} /></button>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500"><Trash2 size={18} /></button>
                            </div>
                        </div>
                        <div className="text-xl font-black">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                ))}
            </div>
            <div className="bg-white p-4 lg:p-8 rounded-xl lg:rounded-[2.5rem] border border-slate-200 h-fit">
                <h3 className="text-2xl font-black mb-8">Summary</h3>
                <div className="flex justify-between text-2xl font-black text-indigo-600 mb-8"><span>Total</span><span>${cartTotal.toFixed(2)}</span></div>
                <button onClick={() => router.push('/checkout')} className="w-full cursor-pointer  bg-slate-900 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3"><CreditCard size={22} /> Checkout</button>
            </div>
        </div>
    );
};

export default CartView