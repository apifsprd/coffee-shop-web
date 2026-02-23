import DashboardLayout from "@/components/layouts/DashboardLayout";
import Badge from "@/components/ui/Badge";
import { Text } from "@/components/ui/Text";
import {
  getTransactionbyID,
  updateTransactionProofPayment,
} from "@/lib/api-list/transaction";
import { order } from "@/lib/types/order";
import formatRupiah from "@/utils/formatRupiah";
import { toast } from "next-toast";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import OrderSumList from "../components/order/molecules/OrderSumList";
import { TextInput } from "@/components/ui/form";
import { ButtonBase } from "@/components/ui/Button";

export default function OrderDetail() {
  const router = useRouter();
  const id = router.query.id;

  const [transaction, setTransaction] = useState<order>({} as order);
  const [proofPaymentUrl, setProofPaymentUrl] = useState<string>("");

  const getDetailTransaction = async () => {
    try {
      const response = await getTransactionbyID({ id: id as string });
      if (response.code === "200") {
        setTransaction(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleUpdateProofPaymentURL = async () => {
    try {
      const response = await updateTransactionProofPayment({
        transactionID: id as string,
        payload: { proofPaymentUrl },
      });
      if (response.code === "200") {
        toast.success(response.message);
        setTimeout(() => {
          router.push("/dashboard/order");
        }, 500);
      } else {
        toast.error(response.errors[0].message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.title = `Indo Cafe n Resto | Detail Order`;
    getDetailTransaction();
  }, []);
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row justify-between items-start">
          <div>
            <Text variant="h5">ORDER DETAIL</Text>
            <Text variant="span">{transaction.invoiceId}</Text>
          </div>
          <div>
            <Badge size="md" variant="neutral">
              {transaction.status}
            </Badge>
          </div>
        </div>
        <div className="flex flex-row justify-start items-start gap-8">
          <div>
            <Text variant="span" className="text-gray-400">
              ORDER DATE
            </Text>
            <Text variant="p">
              {new Date(transaction.createdAt).toLocaleDateString("id-ID")}{" "}
            </Text>
          </div>
          <div>
            <Text variant="span" className="text-gray-400">
              ORDER TIME
            </Text>
            <Text variant="p">
              {new Date(transaction.createdAt)
                .toLocaleTimeString("id-ID")
                .split(".")
                .join(":")}{" "}
              WIB
            </Text>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Text variant="span" className="text-gray-400">
            ORDER SUMMARY
          </Text>
          <div className="flex flex-col justify-start items-start bg-gray-50 border border-gray-100 rounded-xl p-4 gap-4">
            {transaction?.transaction_items?.map((item, index) => (
              <OrderSumList item={item} key={index} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Text variant="span" className="text-gray-400">
            PAYMENT INFORMATION
          </Text>
          <div className="w-full flex flex-col gap-4">
            <TextInput
              InputType="text"
              inputPlaceholder="https://example.com/payment-receipt"
              label="Payment Proof URL"
              labelStyle="text-black text-sm"
              mandatory
              inputValue={proofPaymentUrl}
              inputOnChange={(e) => setProofPaymentUrl(e.target.value)}
            />
            <ButtonBase
              label="Update Payment Proof"
              variant="primary"
              fullWidth
              eventClick={handleUpdateProofPaymentURL}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
