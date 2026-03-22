EcomShop - Modern E-Commerce Platform

A high-performance, responsive e-commerce application built with React, TypeScript, and Tailwind CSS. The app features a centralized state management system using React Context and a custom useShop hook to ensure clean, prop-drill-free architecture.

🚀 Features

Dynamic Catalog: Fetches real-time product data from FakeStoreAPI.

Centralized State: Custom useShop hook for managing Cart, Wishlist, and Navigation globally.

Client-Side Persistence: Automatic sync with localStorage to preserve user bags across sessions.

Responsive Design: Mobile-first UI using Tailwind CSS with glassmorphism effects.

Type Safety: Full TypeScript implementation for robust data handling.

Seamless Navigation: Custom view-switching logic for zero-latency page transitions.

🛠️ Tech Stack

Framework: React 18+

Language: TypeScript

Styling: Tailwind CSS

Icons: Lucide React

API: Fake Store API

📋 Setup Instructions

1. Prerequisites

Ensure you have Node.js (v16+) installed.

2. Installation

# Create a new React project (if starting from scratch)

npx create-next-app@latest my-store --typescript --tailwind --eslint

# Navigate to project

cd my-store

# Install dependencies

npm install lucide-react

3. Implementation

Copy the code from App.tsx into your project's main entry file. Ensure you include the "use client"; directive at the top if using Next.js App Router.

4. Running the App

npm run dev

📡 API Details

The application integrates with the Fake Store API for product data.

Endpoint

Method

Description

https://fakestoreapi.com/products

GET

Fetch all products for the home view.

https://fakestoreapi.com/products/{id}

GET

Fetch specific product details.

Data Model (Product)

interface Product {
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

🪝 Using the useShop Hook

Any component nested inside the ShopProvider can access the global state without props:

import { useShop } from './App';

const MyComponent = () => {
const { cart, addToCart, navigate } = useShop();

return (
<button onClick={() => addToCart(product)}>
Add to Bag ({cart.length})
</button>
);
};

⚠️ Important Note on "use client"

This application uses React Context and Hooks (useState, useEffect), which are browser-only features. In environments like Next.js, the "use client"; directive is required at the top of the file to prevent Server-Side Rendering errors related to localStorage and useContext.
