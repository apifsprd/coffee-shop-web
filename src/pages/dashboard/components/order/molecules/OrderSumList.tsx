import { Text } from "@/components/ui/Text";
import { transaction_items } from "@/lib/types/order";
import formatRupiah from "@/utils/formatRupiah";
import Image from "next/image";
import React from "react";

export default function OrderSumList({ item }: { item: transaction_items }) {
  return (
    <div className="w-full flex flex-row items-center justify-between gap-4 py-3 px-2">
      <div className="flex flex-row items-center gap-4 flex-1 min-w-0">
        {/* QUANTITY BADGE & IMAGE */}
        <div className="relative shrink-0">
          <div className="w-14 h-14 relative overflow-hidden rounded-xl border border-gray-100 shadow-sm">
            <Image
              src={item?.imageUrl || "/images/placeholder.png"}
              alt={item?.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
            {item?.quantity}
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div className="flex flex-col min-w-0">
          <Text
            variant="p"
            className="font-bold text-gray-900 leading-tight truncate"
          >
            {item?.name}
          </Text>
          <Text
            variant="span"
            className="text-gray-400 text-xs line-clamp-1 italic"
          >
            {item?.description || "No description provided"}
          </Text>
          <Text
            variant="span"
            className="text-[10px] text-gray-400 mt-1 uppercase tracking-tight"
          >
            Unit Price: {formatRupiah(item?.price)}
          </Text>
        </div>
      </div>

      {/* TOTAL PRICE PER LINE ITEM */}
      <div className="text-right shrink-0">
        <Text variant="p" className="font-extrabold text-gray-900">
          {formatRupiah(item?.price * item?.quantity)}
        </Text>
      </div>
    </div>
  );
}
