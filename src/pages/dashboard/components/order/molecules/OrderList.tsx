import Badge from "@/components/ui/Badge";
import { ButtonBase } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { cancelTransaction } from "@/lib/api-list/transaction";
import { order } from "@/lib/types/order";
import formatRupiah from "@/utils/formatRupiah";
import { toast } from "next-toast";
import Image from "next/image";
import React, { useState } from "react";
import { Calendar, Clock, ShoppingBag } from "lucide-react";

export default function OrderList({ item }: { item: order }) {
  const [isCancelling, setIsCancelling] = useState(false);

  // Calculate total amount dynamically if not provided by API
  const totalAmount = item.transaction_items.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  );

  const handleCancelOrder = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    setIsCancelling(true);
    try {
      const response = await cancelTransaction({ transactionID: id });
      if (response.code === "200") {
        toast.success("Order cancelled successfully");
        // Instead of hard reload, a state update from parent is better,
        // but for now, we'll keep it simple:
        setTimeout(() => window.location.reload(), 500);
      } else {
        toast.error(response.errors?.[0]?.message || "Failed to cancel");
      }
    } catch (error: any) {
      toast.error("An error occurred while cancelling.");
    } finally {
      setIsCancelling(false);
    }
  };

  return (
    <div className="p-5 border border-gray-100 bg-white rounded-2xl flex flex-col gap-4  hover:ring-1 hover:ring-primary">
      {/* HEADER: Invoice & Status */}
      <div className="flex justify-between items-center pb-3 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <ShoppingBag size={18} className="text-primary" />
          <Text variant="span" className="font-bold text-gray-900">
            #{item.invoiceId}
          </Text>
        </div>
        <Badge
          size="sm"
          variant={
            item.status === "pending"
              ? "neutral"
              : item.status === "success"
                ? "success"
                : "danger"
          }
          className="capitalize px-3 py-1 rounded-full font-semibold"
        >
          {item.status}
        </Badge>
      </div>

      {/* BODY: Date, Time & Items */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-gray-400">
            <Calendar size={14} />
            <Text
              variant="span"
              className="text-xs uppercase font-bold tracking-wider"
            >
              Date
            </Text>
          </div>
          <Text variant="p" className="text-sm font-medium">
            {new Date(item.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Text>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-gray-400">
            <Clock size={14} />
            <Text
              variant="span"
              className="text-xs uppercase font-bold tracking-wider"
            >
              Time
            </Text>
          </div>
          <Text variant="p" className="text-sm font-medium">
            {new Date(item.createdAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </Text>
        </div>

        <div className="col-span-2 flex flex-col gap-1">
          <Text
            variant="span"
            className="text-xs text-gray-400 uppercase font-bold tracking-wider"
          >
            Total Amount
          </Text>
          <Text variant="h6" className="text-primary font-bold">
            {formatRupiah(totalAmount)}
          </Text>
        </div>
      </div>

      {/* PREVIEW ITEMS */}
      <div className="bg-gray-50 p-3 rounded-xl">
        <div className="flex flex-row gap-3 overflow-x-auto pb-1 no-scrollbar">
          {item.transaction_items.map((food, index) => (
            <div
              key={index}
              className="flex items-center gap-3 shrink-0 bg-white p-2 rounded-lg border border-gray-100"
            >
              <div className="relative w-10 h-10 overflow-hidden rounded-md">
                <Image
                  src={food.imageUrl || "/images/placeholder.png"}
                  alt={food.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <Text
                  variant="span"
                  className="text-xs font-bold text-gray-800 line-clamp-1 truncate w-24"
                >
                  {food.name}
                </Text>
                <Text variant="span" className="text-[10px] text-gray-500">
                  Qty: {food.quantity}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-2">
        {item.status === "success" && (
          <ButtonBase
            label="Give Rating"
            type="link"
            href={`/dashboard/order/rating/${item.id}`}
            variant="outlinePrimary"
            className="w-full sm:w-auto px-6 text-sm"
          />
        )}
        {item.status === "pending" && (
          <ButtonBase
            label={isCancelling ? "Cancelling..." : "Cancel Order"}
            type="button"
            variant="outlineDanger"
            eventClick={() => handleCancelOrder(item.id)}
            className="w-full sm:w-auto px-6 text-sm"
            isDisabled={isCancelling}
          />
        )}
        <ButtonBase
          label={item.status === "pending" ? "Pay Now" : "Order Details"}
          type="link"
          href={`/dashboard/order/${item.id}`}
          variant="primary"
          className="w-full sm:w-auto px-8 text-sm font-bold shadow-md shadow-orange-100"
        />
      </div>
    </div>
  );
}
