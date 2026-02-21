import { ButtonIcon } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { addToCart } from "@/lib/api-list/cart";
import { likeFood } from "@/lib/api-list/like";
import formatRupiah from "@/utils/formatRupiah";
import { Heart, HeartIcon, Plus, Star } from "lucide-react";
import { toast } from "next-toast";
import Image from "next/image";
import React from "react";

export default function ProductList({
  item,
}: {
  item: {
    id: string;
    name: string;
    imageUrl: string;
    totalLikes: number;
    rating: number;
    price: number;
    isLike: boolean;
  };
}) {
  const handleLike = async (id: string) => {
    try {
      const response = await likeFood(id);
      if (response.code === "200") {
        toast.success("Product liked!");
      } else {
        toast.error(
          response.message || "Failed to like product, please try again.",
        );
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to like product, please try again.");
    }
  };
  const handleUnlike = async (id: string) => {
    console.log(id);
  };
  const handleAddToCart = async (id: string) => {
    try {
      const response = await addToCart({ foodId: id });

      if (response.code === "200") {
        toast.success("Added to cart!");
      } else {
        toast.error(
          response.message || "Failed to add to cart, please try again.",
        );
      }
    } catch (error) {
      toast.error(error.message || "Failed to add to cart, please try again.");
    }
  };

  return (
    <div
      key={item.id}
      className="bg-white h-32 rounded-2xl p-2 border border-gray-200 flex flex-row justify-start items-start gap-4"
    >
      <div className="w-24 h-24 aspect-square">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={100}
          height={100}
          className="w-full h-full object-cover rounded-xl"
          placeholder="blur"
          blurDataURL="https://commons.wikimedia.org/wiki/Category:Image_placeholders#/media/File:DefaultImage.png"
        />
      </div>
      <div className="w-full h-full flex flex-col gap-1 justify-between items-start">
        <div>
          <Text variant="h5" className="text-start text-gray-900">
            {item.name}
          </Text>
          <div className="flex flex-row justify-start items-center gap-4">
            <div className="flex flex-row justify-start items-center gap-1">
              <Heart className="w-4 h-4 text-red-600" />
              <Text variant="span" className="text-start text-gray-900">
                {item.totalLikes}
              </Text>
            </div>
            <div className="flex flex-row justify-start items-center gap-1">
              <Star className="w-4 h-4 text-yellow-600" />
              <Text variant="span" className="text-start text-gray-900">
                {item.rating}
              </Text>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-row justify-between items-center">
          <Text variant="h6" className="text-start text-black font-semibold">
            {formatRupiah(item.price)}
          </Text>
          <div className="flex flex-row justify-end items-center gap-2">
            <ButtonIcon
              variant={item.isLike ? "outlineDanger" : "outline"}
              shape="circle"
              icon={
                item.isLike ? (
                  <Heart className="w-4 h-4 text-red-600" />
                ) : (
                  <Heart className="w-4 h-4 text-primary" />
                )
              }
              eventClick={() => handleLike(item.id)}
            />

            <ButtonIcon
              variant="primary"
              shape="circle"
              icon={<Plus className="w-4 h-4 text-white" />}
              eventClick={() => handleAddToCart(item.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
