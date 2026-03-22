
"use client"


import { useShop } from '@/hooks/use-shop';
import { Heart, Loader2 } from "lucide-react";
import Link from 'next/link';
import { useMemo } from "react";

const HomeView = () => {
    const { products, loading, error, toggleWishlist, wishlist, searchQuery } = useShop();

    const filteredProducts = useMemo(() =>
        products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase())),
        [products, searchQuery]
    );

    if (loading) return <div className="flex flex-col items-center justify-center py-32 gap-4"><Loader2 className="animate-spin text-indigo-600" size={48} /><p className="text-slate-500">Fetching bestsellers...</p></div>;
    if (error) return <div className="max-w-md mx-auto text-center p-8 bg-red-50 rounded-3xl"><p className="text-red-600 font-bold">{error}</p></div>;

    return (
        <div>
            <div className="mb-10"><h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Our Collection</h1></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map(product => (
                    <Link href={`/details/${product.id}`} key={product.id} className="group bg-white rounded-3xl border border-slate-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
                        <div className="relative h-64 bg-white p-8 overflow-hidden">
                            <img src={product.image} alt={product.title} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                            <button onClick={() => toggleWishlist(product)} className="absolute top-4 right-4 p-2.5 bg-white/90 rounded-full shadow-sm">
                                <Heart size={18} className={wishlist.some(i => i.id === product.id) ? "fill-red-500 text-red-500" : "text-slate-400"} />
                            </button>
                        </div>
                        <div className="p-6 cursor-pointer">
                            <span className="text-[10px] font-black uppercase text-indigo-600 mb-2 block">{product.category}</span>
                            <h3 className="font-bold text-slate-900 line-clamp-1 mb-2">{product.title}</h3>
                            <div className="flex items-center justify-between mt-4">
                                <span className="text-2xl font-black text-slate-900">${product.price.toFixed(2)}</span>
                                <span className="text-indigo-600 font-bold text-sm">Details →</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomeView