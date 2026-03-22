"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { API_URL, CartItem, Product, ShopContextType } from "./type";
import { getStorageItem } from "./constants";

export const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [cart, setCart] = useState<CartItem[]>(() => getStorageItem('shop_cart', []));
    const [wishlist, setWishlist] = useState<Product[]>(() => getStorageItem('shop_wishlist', []));

    useEffect(() => {
        if (typeof window !== 'undefined') localStorage.setItem('shop_cart', JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        if (typeof window !== 'undefined') localStorage.setItem('shop_wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error('Failed to fetch products');
                const data = await response.json();
                setProducts(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id: number, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) return { ...item, quantity: Math.max(1, item.quantity + delta) };
            return item;
        }));
    };

    const removeFromCart = (id: number) => setCart(prev => prev.filter(item => item.id !== id));

    const toggleWishlist = (product: Product) => {
        setWishlist(prev => {
            const isWishlisted = prev.some(item => item.id === product.id);
            return isWishlisted ? prev.filter(item => item.id !== product.id) : [...prev, product];
        });
    };

    const clearCart = () => setCart([]);

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const value = {
        products, loading, error, searchQuery,
        cart, wishlist, cartCount, cartTotal,
        setSearchQuery, addToCart, updateQuantity, removeFromCart, toggleWishlist, clearCart
    };

    return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};