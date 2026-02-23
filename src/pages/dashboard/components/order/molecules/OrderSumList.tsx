import { Text } from "@/components/ui/Text";
import { transaction_items } from "@/lib/types/order";
import formatRupiah from "@/utils/formatRupiah";
import Image from "next/image";
import React from "react";

export default function OrderSumList({ item }: { item: transaction_items }) {
  return (
    <div className="w-full h-auto flex flex-row justify-between items-center gap-4">
      <div className="flex flex-row gap-4">
        <div className="flex flex-row gap-2 items-center">
          <Text variant="p">x{item.quantity}</Text>
          <Image
            src={item.imageUrl}
            alt={item.name}
            width={50}
            height={50}
            className="aspect-square object-cover rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-0 flex-1 flex-wrap">
          <Text variant="p">{item.name}</Text>
          <Text variant="span" className="text-gray-400">
            {item.description}
          </Text>
        </div>
      </div>
      <div className="flex flex-col gap-0">
        <Text variant="p" className="font-semibold">
          {formatRupiah(item.price)}
        </Text>
      </div>
    </div>
  );
}
