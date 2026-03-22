"use client"


import { useShop } from '@/hooks/use-shop';

const WishlistView = () => {
    const { wishlist, toggleWishlist, addToCart } = useShop();
    if (wishlist.length === 0) return <div className="text-center py-48 bg-white rounded-[2.5rem] border border-slate-200 max-w-2xl mx-auto"><h2 className="text-2xl font-bold">Wishlist is empty</h2></div>;
    return (
        <div>
            <h2 className="text-3xl font-black mb-10">Favorites</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {wishlist.map(product => (
                    <div key={product.id} className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col">
                        <img src={product.image} className="h-40 object-contain mb-4" alt={product.title} />
                        <h3 className="font-bold text-sm mb-4 line-clamp-1">{product.title}</h3>
                        <button onClick={() => addToCart(product)} className="mt-auto cursor-pointer bg-indigo-600 text-white py-2 rounded-xl text-sm font-bold">Add to Bag</button>
                        <button onClick={() => toggleWishlist(product)} className="mt-2 cursor-pointer text-slate-400 text-xs hover:text-red-500">Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WishlistView