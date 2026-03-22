export const API_URL = "https://fakestoreapi.com/products";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ShopContextType {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  cart: CartItem[];
  wishlist: Product[];
  cartCount: number;
  cartTotal: number;
  setSearchQuery: (query: string) => void;
  addToCart: (product: Product) => void;
  updateQuantity: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
  toggleWishlist: (product: Product) => void;
  clearCart: () => void;
}
