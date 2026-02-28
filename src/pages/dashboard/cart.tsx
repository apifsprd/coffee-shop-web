import DashboardLayout from "@/components/layouts/DashboardLayout";
import { getCart } from "@/lib/api-list/cart";
import { toast } from "next-toast";
import React, { useEffect, useState, useMemo } from "react";
import ProductList from "./components/index/molecules/ProductList";
import { Text } from "@/components/ui/Text";
import { cart } from "@/lib/types/food";
import { ButtonBase } from "@/components/ui/Button";
import DynamicSelect from "@/components/ui/DynamicSelect";
import { getPaymentMethods } from "@/lib/api-list/payment";
import { createTransaction } from "@/lib/api-list/transaction";
import { useRouter } from "next/router";
import { ShoppingBasket, Receipt, CreditCard } from "lucide-react";
import formatRupiah from "@/utils/formatRupiah";
import { paymentMethod } from "@/lib/types/payment";

export default function Cart() {
  const router = useRouter();
  const [data, setData] = useState<cart[]>([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getData = async () => {
    try {
      const response = await getCart();
      if (response.code === "200") {
        setData(response.data);
      }
    } catch (error: unknown) {
      toast.error(
        "Failed to get cart, please try again (error: an unknown error occurred)",
      );
    }
  };

  // Tech Lead Tip: Use useMemo for calculations to prevent unnecessary re-renders
  const priceCalculation = useMemo(() => {
    const subtotal = data.reduce(
      (acc, item) => acc + item.quantity * item.food.price,
      0,
    );
    const tax = subtotal * 0.1; // 10% Tax
    const total = subtotal + tax;

    return {
      subtotal: formatRupiah(subtotal),
      tax: formatRupiah(tax),
      total: formatRupiah(total),
    };
  }, [data]);

  const getPaymentMethod = async () => {
    try {
      const response = await getPaymentMethods();
      if (response.code === "200") {
        const options = response.data.map((item: paymentMethod) => ({
          label: item.name,
          value: item.id,
          image: item.imageUrl,
        }));
        setPaymentMethods(options);
      }
    } catch (error: unknown) {
      toast.error(
        "Failed to get payment methods, please try again (error: an unknown error occurred)",
      );
    }
  };

  const handleCheckout = async () => {
    if (!selectedPayment) {
      toast.error("Please select a payment method first");
      return;
    }

    setIsSubmitting(true);
    const cartIds = data.map((item) => item.id);

    try {
      const payload = {
        cartIds,
        paymentMethodId: selectedPayment,
      };
      const response = await createTransaction(payload);
      if (response.code === "200") {
        toast.success("Order created successfully!");
        router.push(`/dashboard/order`);
      }
    } catch (error: unknown) {
      toast.error(
        "Failed to create transaction, please try again (error: an unknown error occurred)",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    document.title = "Indo Cafe n Resto | Cart";
    getData();
    getPaymentMethod();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 max-w-6xl mx-auto pb-12">
        {/* HEADER */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
          <ShoppingBasket className="text-primary" size={28} />
          <Text variant="h4" className="font-bold text-gray-900">
            Your Cart{" "}
            <span className="text-gray-400 font-normal">({data.length})</span>
          </Text>
        </div>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* LEFT: ITEMS LIST */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {data.map((item: cart, index: number) => (
                <ProductList
                  key={item.id || index}
                  item={item.food}
                  onRefetch={getData}
                  variant="cart"
                  cartID={item.id}
                  cartQty={item.quantity}
                />
              ))}
            </div>

            {/* RIGHT: SUMMARY CARD */}
            <div className="bg-white p-6 rounded-3xl border border-gray-200 sticky top-24">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-50 pb-4">
                <Receipt size={20} className="text-gray-400" />
                <Text variant="h6" className="font-bold text-gray-800">
                  Order Summary
                </Text>
              </div>

              <div className="flex flex-col gap-3 mb-6">
                <div className="flex justify-between text-gray-500">
                  <Text variant="span">Subtotal</Text>
                  <Text variant="span" className="font-medium text-gray-900">
                    {priceCalculation.subtotal}
                  </Text>
                </div>
                <div className="flex justify-between text-gray-500">
                  <Text variant="span">Tax (10%)</Text>
                  <Text variant="span" className="font-medium text-gray-900">
                    {priceCalculation.tax}
                  </Text>
                </div>
                <div className="h-px bg-gray-50 my-2" />
                <div className="flex justify-between items-center">
                  <Text variant="p" className="font-bold text-gray-800 text-lg">
                    Total Amount
                  </Text>
                  <p className="font-bold text-black">
                    {priceCalculation.total}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard size={16} className="text-gray-400" />
                  <Text
                    variant="span"
                    className="text-xs font-bold uppercase tracking-wider text-gray-400"
                  >
                    Payment Method
                  </Text>
                </div>
                <DynamicSelect
                  options={paymentMethods}
                  label=""
                  placeholder="Choose how to pay"
                  onChange={(selected: string | number) =>
                    setSelectedPayment(selected as string)
                  }
                  selectedValue={selectedPayment}
                />
              </div>

              <ButtonBase
                label={isSubmitting ? "Processing..." : `Checkout Now`}
                variant="primary"
                fullWidth
                shape="rounded"
                eventClick={handleCheckout}
                disabled={isSubmitting || !selectedPayment}
              />
              <Text
                variant="p"
                className="text-[10px] text-gray-400 text-center mt-4 italic"
              >
                By clicking &quot;Checkout Now&quot;, you agree to our Terms &
                Conditions.
              </Text>
            </div>
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="flex flex-col items-center justify-center py-20 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
            <div className="bg-white p-6 rounded-full shadow-sm mb-4">
              <ShoppingBasket size={64} className="text-gray-200" />
            </div>
            <Text variant="h6" className="font-bold text-gray-800">
              Your cart is lonely
            </Text>
            <Text
              variant="p"
              className="text-gray-500 mt-2 mb-8 text-center px-6"
            >
              Looks like you havent added anything to your cart yet.
            </Text>
            <ButtonBase
              label="View Menu"
              variant="primary"
              eventClick={() => router.push("/dashboard")}
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
