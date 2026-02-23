import Badge from "@/components/ui/Badge";
import { ButtonBase } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { order } from "@/lib/types/order";
import Image from "next/image";
import React from "react";

export default function OrderList({ item }: { item: order }) {
  return (
    <div className="p-2 border border-gray-200 rounded-xl flex flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        <Text variant="span">#{item.invoiceId}</Text>
        <Badge size="sm" variant="neutral">
          {item.status}
        </Badge>
      </div>
      <div className="flex flex-row justify-start items-start gap-8">
        <div>
          <Text variant="span" className="text-gray-400">
            Order Date
          </Text>
          <Text variant="p">
            {new Date(item.createdAt).toLocaleDateString("id-ID")}{" "}
          </Text>
        </div>
        <div>
          <Text variant="span" className="text-gray-400">
            Order Time
          </Text>
          <Text variant="p">
            {new Date(item.createdAt)
              .toLocaleTimeString("id-ID")
              .split(".")
              .join(":")}{" "}
            WIB
          </Text>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-2">
          <Text variant="span" className="text-gray-400">
            Item(s)
          </Text>
          <div className="flex flex-row justify-start items-center gap-4 flex-wrap">
            {item.transaction_items.map((item, index) => (
              <div
                key={index}
                className="flex flex-row justify-center items-center gap-2"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={50}
                  height={50}
                  className="aspect-square object-cover rounded-xl"
                />
                <div>
                  <Text variant="span">{item.name}</Text>
                  <Text variant="p">x {item.quantity}</Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div>
          <Text variant="span" className="text-gray-400">
            Total Amount
          </Text>
          <Text variant="h6">Rp. 100.000</Text>
        </div>
        <div>
          <ButtonBase
            label="See Detail"
            type="link"
            href={`/dashboard/order/${item.id}`}
          />
        </div>
      </div>
    </div>
  );
}
