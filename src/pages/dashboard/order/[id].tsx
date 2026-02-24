import DashboardLayout from "@/components/layouts/DashboardLayout";
import Badge from "@/components/ui/Badge";
import { Text } from "@/components/ui/Text";
import {
  getTransactionbyID,
  updateTransactionProofPayment,
} from "@/lib/api-list/transaction";
import { order } from "@/lib/types/order";
import { toast } from "next-toast";
import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo } from "react";
import OrderSumList from "../components/order/molecules/OrderSumList";
import { TextInput } from "@/components/ui/form";
import { ButtonBase } from "@/components/ui/Button";
import { ArrowLeft, CreditCard, ReceiptText, CalendarDays } from "lucide-react";
import formatRupiah from "@/utils/formatRupiah";

export default function OrderDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [transaction, setTransaction] = useState<order>({} as order);
  const [proofPaymentUrl, setProofPaymentUrl] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const getDetailTransaction = async () => {
    if (!id) return;
    try {
      const response = await getTransactionbyID({ id: id as string });
      if (response.code === "200") {
        setTransaction(response.data);
        // Pre-fill if already exists
        if (response.data.proofPaymentUrl) {
          setProofPaymentUrl(response.data.proofPaymentUrl);
        }
      }
    } catch (error: any) {
      toast.error("Failed to load order details");
    }
  };

  const handleUpdateProofPaymentURL = async () => {
    if (!proofPaymentUrl) {
      return toast.error("Please provide a payment proof URL");
    }

    setLoading(true);
    try {
      const response = await updateTransactionProofPayment({
        transactionID: id as string,
        payload: { proofPaymentUrl },
      });
      if (response.code === "200") {
        toast.success("Payment proof updated successfully!");
        getDetailTransaction(); // Refresh data
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = useMemo(() => {
    return (
      transaction?.transaction_items?.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0,
      ) || 0
    );
  }, [transaction]);

  useEffect(() => {
    document.title = `Indo Cafe n Resto | Order ${transaction.invoiceId || ""}`;
    getDetailTransaction();
  }, [id]);

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto flex flex-col gap-8 pb-12">
        {/* BACK BUTTON & HEADER */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => router.push("/dashboard/order")}
            className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors w-fit cursor-pointer"
          >
            <ArrowLeft size={20} />
            <Text variant="span" className="font-medium">
              Back to My Orders
            </Text>
          </button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-gray-200 ">
            <div>
              <Text
                variant="h4"
                className="font-bold text-gray-900 tracking-tight"
              >
                Order Details
              </Text>
              <Text variant="p" className="text-primary font-mono font-medium">
                #{transaction.invoiceId}
              </Text>
            </div>
            <Badge
              size="md"
              variant={
                transaction.status === "pending"
                  ? "neutral"
                  : transaction.status === "success"
                    ? "success"
                    : "danger"
              }
              className="px-6 py-2 rounded-full uppercase font-bold text-xs"
            >
              {transaction.status}
            </Badge>
          </div>
        </div>

        {/* INFO CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <CalendarDays size={24} />
            </div>
            <div>
              <Text
                variant="span"
                className="text-xs text-gray-400 font-bold uppercase"
              >
                Order Date
              </Text>
              <Text variant="p" className="font-medium">
                {transaction.createdAt
                  ? new Date(transaction.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        dateStyle: "long",
                      },
                    )
                  : "-"}
              </Text>
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 flex items-center gap-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
              <CreditCard size={24} />
            </div>
            <div>
              <Text
                variant="span"
                className="text-xs text-gray-400 font-bold uppercase"
              >
                Total Payment
              </Text>
              <Text variant="p" className="font-bold text-lg text-gray-900">
                {formatRupiah(totalAmount)}
              </Text>
            </div>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 px-2">
            <ReceiptText size={20} className="text-gray-400" />
            <p className="font-bold text-gray-700 uppercase text-xs tracking-widest">
              Order Items
            </p>
          </div>
          <div className="flex flex-col bg-white border border-gray-200 rounded-3xl p-4 gap-4 overflow-hidden">
            {transaction?.transaction_items?.map((item, index) => (
              <div
                key={index}
                className={index !== 0 ? "border-t border-gray-50" : ""}
              >
                <OrderSumList item={item} />
              </div>
            ))}
            <div className="bg-gray-50 p-4 mt-2 flex justify-between items-center rounded-2xl">
              <Text variant="span" className="font-bold text-gray-600">
                Grand Total
              </Text>
              <p className="font-extrabold text-black">
                {formatRupiah(totalAmount)}
              </p>
            </div>
          </div>
        </div>

        {/* PAYMENT PROOF SECTION */}
        <div className="flex flex-col gap-4">
          <p className="px-2 font-bold text-gray-700 uppercase text-xs tracking-widest">
            Payment Information
          </p>
          <div className="bg-white p-6 rounded-3xl border border-gray-200 flex flex-col gap-6">
            {transaction.status === "pending" ? (
              <>
                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                  <Text
                    variant="p"
                    className="text-blue-800 text-sm leading-relaxed"
                  >
                    Please upload your payment receipt URL below to confirm your
                    order. Our admin will verify it shortly.
                  </Text>
                </div>
                <TextInput
                  InputType="text"
                  inputPlaceholder="https://image-hosting.com/your-receipt.jpg"
                  label="Payment Proof URL"
                  labelStyle="font-bold text-gray-700"
                  mandatory
                  inputValue={proofPaymentUrl}
                  inputOnChange={(e) => setProofPaymentUrl(e.target.value)}
                />
                <ButtonBase
                  label={loading ? "Updating..." : "Submit Payment Proof"}
                  variant="primary"
                  fullWidth
                  shape="rounded"
                  className="py-4 font-bold shadow-lg shadow-orange-100"
                  eventClick={handleUpdateProofPaymentURL}
                  isDisabled={loading || !proofPaymentUrl}
                />
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <Text variant="span" className="text-gray-400 text-sm italic">
                  Payment proof has been submitted:
                </Text>
                <a
                  href={transaction.proofPaymentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary underline font-medium truncate"
                >
                  {transaction.proofPaymentUrl}
                </a>
                <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-2xl text-center font-bold border border-green-100">
                  Payment Verified
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
