"use client"

import { useShop } from '@/hooks/use-shop';
import { Heart, Search, ShoppingBag, ShoppingBasket } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent } from 'react'

const Header = ({

}) => {
    const router = useRouter()

    const { searchQuery, setSearchQuery, wishlist, cartCount } = useShop();

    return (
        <div>
            <nav className="sticky top-0 z-50 bg-white backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div
                            className="flex items-center gap-2 cursor-pointer group"
                            onClick={() => router.push('/')}
                        >
                            <div className="bg-indigo-600 p-2 rounded-lg text-white group-hover:bg-indigo-700 transition-colors">
                                <ShoppingBasket size={24} />
                            </div>
                            <span className="font-bold text-xl tracking-tight">ECOM<span className="text-indigo-600">SHOP</span></span>
                        </div>

                        <div className="hidden md:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400 transition-all text-sm text-gray-700 font-medium"
                                    value={searchQuery}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button onClick={() => router.push('/wishlist')} className="relative p-2 cursor-pointer hover:bg-slate-100 rounded-full transition-colors text-slate-600">
                                <Heart size={22} className={wishlist.length > 0 ? "fill-red-500 text-red-500" : ""} />
                                {wishlist.length > 0 && (
                                    <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full animate-pulse">
                                        {wishlist.length}
                                    </span>
                                )}
                            </button>
                            <button onClick={() => router.push('/cart')} className="relative p-2 cursor-pointer hover:bg-slate-100 rounded-full transition-colors text-slate-600">
                                <ShoppingBag size={22} />
                                {cartCount > 0 && (
                                    <span className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header