"use client";

import { ShopContext } from "@/lib/shop-provider";
import { useContext } from "react";

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
};
