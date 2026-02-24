import DashboardLayout from "@/components/layouts/DashboardLayout";
import { getCart } from "@/lib/api-list/cart";
import { toast } from "next-toast";
import React, { useEffect, useState } from "react";
import ProductList from "./components/index/molecules/ProductList";
import { Text } from "@/components/ui/Text";
import { cart } from "@/lib/types/food";
import { ButtonBase } from "@/components/ui/Button";
import DynamicSelect from "@/components/ui/DynamicSelect";
import { getPaymentMethods } from "@/lib/api-list/payment";
import { createTransaction } from "@/lib/api-list/transaction";
import { useRouter } from "next/router";

export default function Cart() {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("");

  const getData = async () => {
    try {
      const response = await getCart();
      if (response.code === "200") {
        setData(response.data);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const getSubTotal = () => {
    let total = 0;
    data.forEach((item: cart) => {
      total += item.quantity * item.food.price;
    });
    return {
      total,
      formatted: Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(total),
    };
  };
  const getTax = () => {
    let total = 0;
    data.forEach((item: cart) => {
      total += item.quantity * item.food.price * 0.1;
    });
    return {
      total,
      formatted: Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(total),
    };
  };
  const getTotal = () => {
    return {
      total: getSubTotal().total + getTax().total,
      formatted: Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(getSubTotal().total + getTax().total),
    };
  };
  const getPaymentMethod = async () => {
    try {
      const response = await getPaymentMethods();
      if (response.code === "200") {
        let options = [];
        response.data.forEach((item: any) => {
          options.push({
            label: item.name,
            value: item.id,
            image: item.imageUrl,
          });
        });
        setPaymentMethods(options);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleCheckout = async (items: cart) => {
    const itemID: string[] = [];
    items.map((item: cart) => {
      itemID.push(item.id);
    });
    try {
      const payload = {
        cartIds: itemID,
        paymentMethodId: selectedPayment,
      };
      const response = await createTransaction(payload);
      if (response.code === "200") {
        toast.success(response.message);
        setTimeout(() => {
          router.push(`/dashboard/order`);
        }, 500);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    document.title = "Indo Cafe n Resto | Cart";
    getData();
    getPaymentMethod();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-4 pb-8">
        <Text variant="h5">Cart ({data.length})</Text>
        <div className="grid grid-cols-1 gap-4">
          {data.length > 0 ? (
            data.map((item: cart, index: number) => (
              <ProductList
                key={index}
                item={item.food}
                onRefetch={getData}
                variant="cart"
                cartID={item.id}
                cartQty={item.quantity}
              />
            ))
          ) : (
            <div className="w-full h-32 flex flex-col justify-center items-center bg-gray-100 rounded-lg">
              <Text variant="p">Cart is empty</Text>
            </div>
          )}
        </div>
        {data.length > 0 && (
          <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-lg pb-4">
            <div className="flex flex-row justify-between items-center">
              <Text variant="p">Subtotal</Text>
              <Text variant="p">{getSubTotal().formatted}</Text>
            </div>
            <div className="flex flex-row justify-between items-center">
              <Text variant="p">Tax</Text>
              <Text variant="p">{getTax().formatted}</Text>
            </div>
            <div className="w-full h-0.5 bg-gray-200 my-2"></div>
            <div className="flex flex-row justify-between items-center">
              <Text variant="p">Total</Text>
              <Text variant="p" className="font-semibold">
                {getTotal().formatted}
              </Text>
            </div>
            <div className="w-full h-0.5 bg-gray-200 my-2"></div>
            <div className="w-full">
              <DynamicSelect
                options={paymentMethods}
                label=""
                placeholder="Select payment method"
                onChange={(selected) => setSelectedPayment(selected)}
                selectedValue={selectedPayment}
              />
            </div>
            <div className="mt-4">
              <ButtonBase
                label={`Create Order (${getTotal().formatted})`}
                variant="primary"
                fullWidth
                eventClick={() => handleCheckout(data)}
              />
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
