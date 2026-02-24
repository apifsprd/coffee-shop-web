import { ButtonIcon } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { addToCart, removeFromCart, updateQtyCart } from "@/lib/api-list/cart";
import { likeFood, unlikeFood } from "@/lib/api-list/like";
import formatRupiah from "@/utils/formatRupiah";
import { Heart, Minus, Plus, Star, Trash } from "lucide-react";
import { toast } from "next-toast";
import Image from "next/image";
import React, { useState, useEffect } from "react";

interface ProductProps {
  item: {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    totalLikes: number;
    rating: number;
    price: number;
    isLike: boolean;
  };
  variant?: "add" | "cart"; // Using explicit string literals for better DX
  onRefetch: () => void;
  cartID?: string;
  cartQty?: number;
}

export default function ProductList({
  item,
  variant = "add",
  onRefetch,
  cartID = "",
  cartQty = 0,
}: ProductProps) {
  const [qty, setQty] = useState(cartQty);
  const [isUpdating, setIsUpdating] = useState(false);

  // Keep local qty in sync with cartQty from parent
  useEffect(() => {
    setQty(cartQty);
  }, [cartQty]);

  const handleLikeToggle = async () => {
    try {
      const action = item.isLike ? unlikeFood : likeFood;
      const response = await action(item.id);
      if (response.code === "200") {
        toast.success(
          item.isLike ? "Removed from favorites" : "Added to favorites",
        );
        onRefetch();
      }
    } catch (error: any) {
      toast.error("Action failed. Please try again.");
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await addToCart({ foodId: item.id });
      if (response.code === "200") {
        toast.success("Added to cart!");
        onRefetch();
      }
    } catch (error: any) {
      toast.error("Failed to add to cart.");
    }
  };

  const handleUpdateQty = async (newQty: number) => {
    if (newQty < 1 || isUpdating) return;
    setIsUpdating(true);
    try {
      const response = await updateQtyCart({ cartID, qty: newQty });
      if (response.code === "200") {
        setQty(newQty);
        onRefetch();
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    try {
      const response = await removeFromCart({ cartId: cartID });
      if (response.code === "200") {
        toast.success("Item removed");
        onRefetch();
      }
    } catch (error: any) {
      toast.error("Remove failed.");
    }
  };

  // --- RENDER LOGIC ---

  // Dashboard / Favorite Style (Vertical Card)
  if (variant === "add") {
    return (
      <div className="bg-white rounded-2xl p-3 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col gap-3 h-full">
        <div className="relative w-full aspect-square overflow-hidden rounded-xl bg-gray-50">
          <Image
            src={item.imageUrl || "/images/placeholder.png"}
            alt={item.name}
            fill
            className="object-cover"
          />
          <button
            onClick={handleLikeToggle}
            className="absolute top-2 right-2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
          >
            <Heart
              size={18}
              className={
                item.isLike ? "fill-red-500 text-red-500" : "text-gray-400"
              }
            />
          </button>
        </div>

        <div className="flex flex-col flex-1 gap-1">
          <div className="flex justify-between items-start gap-2">
            <Text
              variant="p"
              className="font-bold text-gray-900 line-clamp-1 truncate"
            >
              {item.name}
            </Text>
            <div className="flex items-center gap-1 shrink-0">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium text-gray-600">
                {item.rating}
              </span>
            </div>
          </div>

          <Text
            variant="span"
            className="text-xs text-gray-400 line-clamp-2 mb-2"
          >
            {item.description}
          </Text>

          <div className="mt-auto flex justify-between items-center">
            <Text variant="p" className="font-extrabold text-primary">
              {formatRupiah(item.price)}
            </Text>
            <ButtonIcon
              variant="primary"
              shape="circle"
              icon={<Plus size={18} />}
              eventClick={handleAddToCart}
              className="scale-90"
            />
          </div>
        </div>
      </div>
    );
  }

  // Cart Style (Horizontal Row)
  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-4 shadow-sm">
      <div className="w-20 h-20 relative shrink-0 overflow-hidden rounded-xl">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <Text variant="p" className="font-bold text-gray-900 truncate">
          {item.name}
        </Text>
        <Text variant="p" className="text-primary font-bold text-sm">
          {formatRupiah(item.price)}
        </Text>

        <div className="flex items-center gap-3 mt-2">
          <div className="flex items-center border border-gray-200 rounded-lg p-1">
            <button
              disabled={qty <= 1 || isUpdating}
              onClick={() => handleUpdateQty(qty - 1)}
              className="p-1 hover:bg-gray-50 disabled:opacity-30"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-bold">{qty}</span>
            <button
              disabled={isUpdating}
              onClick={() => handleUpdateQty(qty + 1)}
              className="p-1 hover:bg-gray-50"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={handleRemove}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
      >
        <Trash size={20} />
      </button>
    </div>
  );
}
