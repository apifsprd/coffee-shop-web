import Badge from "@/components/ui/Badge";
import { ButtonBase } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import {
  cancelTransaction,
  updateTransactionStatus,
} from "@/lib/api-list/transaction";
import { order } from "@/lib/types/order";
import formatRupiah from "@/utils/formatRupiah";
import { toast } from "next-toast";
import Image from "next/image";
import React, { useState } from "react";
import { Calendar, Clock, ShoppingBag, ArrowRight } from "lucide-react";
import DynamicSelect from "@/components/ui/DynamicSelect";

const STATUS_OPTIONS = [
  { value: "success", label: "Success" },
  { value: "failed", label: "Failed" },
];

export default function OrderList({
  item,
  role,
  onRefetch,
}: {
  item: order;
  role: string;
  onRefetch?: () => void;
}) {
  const [isCancelling, setIsCancelling] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(item.status);

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
        if (onRefetch) onRefetch();
      } else {
        toast.error(response.errors?.[0]?.message || "Failed to cancel");
      }
    } catch (error: any) {
      toast.error("An error occurred while cancelling.");
    } finally {
      setIsCancelling(false);
    }
  };

  const handleChangeStatus = async (transactionID: string) => {
    if (!selectedStatus) return toast.error("Please select a status");
    try {
      const response = await updateTransactionStatus({
        transactionID,
        payload: { status: selectedStatus },
      });
      if (response.code === "200") {
        if (onRefetch) onRefetch();
        toast.success("Status updated successfully");
      }
    } catch (error) {
      toast.error("An error occurred while changing status.");
    }
  };

  return (
    <div className="group p-4 md:p-6 border border-gray-100 bg-white rounded-2xl flex flex-col gap-4 transition-all hover:border-primary">
      {/* HEADER: Invoice & Status */}
      <div className="flex justify-between items-start md:items-center pb-3 border-b border-gray-50">
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ShoppingBag size={18} className="text-primary" />
            </div>
            <Text variant="span" className="font-bold text-gray-900 md:text-lg">
              #{item.invoiceId}
            </Text>
          </div>
          <div className="flex items-center gap-3 text-gray-400 md:ml-3">
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span className="text-[10px] md:text-xs font-medium">
                {new Date(item.createdAt).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span className="text-[10px] md:text-xs font-medium">
                {new Date(item.createdAt).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>
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
          className="capitalize px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold"
        >
          {item.status}
        </Badge>
      </div>

      {/* BODY: Items Preview & Amount */}
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        {/* Horizontal Item Scroll */}
        <div className="flex-1 overflow-hidden">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {item.transaction_items.map((food, index) => (
              <div
                key={index}
                className="flex items-center gap-3 shrink-0 bg-gray-50/50 p-2 rounded-xl border border-gray-100 min-w-[160px]"
              >
                <div className="relative w-12 h-12 overflow-hidden rounded-lg shadow-sm">
                  <Image
                    src={food.imageUrl || "/images/placeholder.png"}
                    alt={food.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <Text
                    variant="span"
                    className="text-xs font-bold text-gray-800 line-clamp-1"
                  >
                    {food.name}
                  </Text>
                  <Text
                    variant="span"
                    className="text-[10px] text-gray-500 font-medium"
                  >
                    {food.quantity} x {formatRupiah(food.price)}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total Amount Section */}
        <div className="flex lg:flex-col justify-between lg:justify-center items-end border-t lg:border-t-0 lg:border-l border-gray-100 pt-3 lg:pt-0 lg:pl-6">
          <Text
            variant="span"
            className="text-[10px] md:text-xs text-gray-400 uppercase font-bold tracking-widest lg:mb-1"
          >
            Total Payment
          </Text>
          <Text
            variant="h5"
            className="text-primary font-black text-lg md:text-xl"
          >
            {formatRupiah(totalAmount)}
          </Text>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="pt-2">
        {role === "admin" ? (
          item.status === "pending" && (
            <div className="flex flex-col md:flex-row items-center gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <div className="w-full md:w-64">
                <DynamicSelect
                  label=""
                  options={STATUS_OPTIONS}
                  className="w-full"
                  selectedValue={selectedStatus}
                  onChange={(selected) =>
                    setSelectedStatus(selected.toString())
                  }
                />
              </div>
              <ButtonBase
                label="Update Status"
                type="button"
                eventClick={() => handleChangeStatus(item.id)}
                variant="primary"
                className="w-full md:w-auto px-8 shadow-md shadow-primary/20"
              />
            </div>
          )
        ) : (
          <div className="flex flex-wrap md:flex-nowrap justify-end items-center gap-3">
            {item.status === "success" && (
              <ButtonBase
                label="Review Menu"
                type="link"
                href={`/dashboard/order/rating/${item.id}`}
                variant="outlinePrimary"
                className="flex-1 md:flex-none px-6 text-xs font-bold"
              />
            )}
            {item.status === "pending" && (
              <ButtonBase
                label={isCancelling ? "Processing..." : "Cancel Order"}
                type="button"
                variant="outlineDanger"
                eventClick={() => handleCancelOrder(item.id)}
                className="flex-1 md:flex-none px-6 text-xs font-bold"
                isDisabled={isCancelling}
              />
            )}
            <ButtonBase
              label={item.status === "pending" ? "Pay Now" : "Details"}
              type="link"
              href={`/dashboard/order/${item.id}`}
              variant="primary"
              className="flex-1 md:flex-none px-10 text-xs font-bold shadow-lg shadow-primary/10"
            />
          </div>
        )}
      </div>
    </div>
  );
}
