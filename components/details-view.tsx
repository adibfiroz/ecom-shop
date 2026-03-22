"use client"


import { useShop } from '@/hooks/use-shop';
import { API_URL, Product } from '@/lib/type';
import { ChevronLeft, Heart, Loader2, ShoppingBag, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const DetailsView = ({ prodId }: { prodId: string }) => {
    const router = useRouter()
    const { addToCart, toggleWishlist, wishlist } = useShop();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!prodId) return;
        const fetchItem = async () => {
            try {
                const res = await fetch(`${API_URL}/${prodId}`);
                const data = await res.json();
                setProduct(data);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchItem();
    }, [prodId]);

    if (loading) return <div className="flex justify-center py-32"><Loader2 className="animate-spin text-indigo-600" size={48} /></div>;
    if (!product) return <p>Product not found.</p>;

    const isWishlisted = wishlist.some(item => item.id === product.id);

    return (
        <div className="max-w-6xl mx-auto">
            <button onClick={() => router.push('/')} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 transition-colors">
                <ChevronLeft size={20} /> Back to Catalog
            </button>

            <div className="grid lg:grid-cols-2 gap-16 bg-white  p-4 lg:p-10 rounded-2xl lg:rounded-[2.5rem] border border-slate-200 shadow-sm">
                <div className="flex items-center justify-center p-4">
                    <img src={product.image} alt={product.title} className="max-h-125 w-auto object-contain hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex flex-col">
                    <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full w-fit mb-6">
                        {product.category}
                    </span>
                    <h1 className="text-2xl lg:text-5xl font-black text-slate-900 mb-6 leading-[1.1]">{product.title}</h1>
                    <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                            <Star size={20} className="fill-yellow-400 text-yellow-400" />
                            <span className="font-bold text-lg">{product.rating?.rate}</span>
                        </div>
                        <span className="text-slate-400 font-medium">{product.rating?.count} verified reviews</span>
                    </div>
                    <p className="text-slate-600 text-lg leading-relaxed mb-10">{product.description}</p>
                    <div className="text-5xl font-black text-slate-900 mb-10">${product.price.toFixed(2)}</div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
                        <button
                            onClick={() => { addToCart(product); router.push('/cart'); }}
                            className="bg-indigo-600 text-white  cursor-pointer py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3"
                        >
                            <ShoppingBag size={22} /> Add to Cart
                        </button>
                        <button
                            onClick={() => toggleWishlist(product)}
                            className={`py-5 rounded-2xl cursor-pointer font-bold text-lg border-2 transition-all flex items-center justify-center gap-3 ${isWishlisted ? "bg-red-50 border-red-100 text-red-600" : "border-slate-200 text-slate-700 hover:border-indigo-600"
                                }`}
                        >
                            <Heart size={22} className={isWishlisted ? "fill-red-500" : ""} /> {isWishlisted ? "Saved" : "Save for Later"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DetailsView