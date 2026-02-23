import { food } from "./food";
import { paymentMethod } from "./payment";

export interface transaction_items {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  priceDiscount: number | null;
  quantity: number;
  transactionId: string;
  updatedAt: string;
}

export interface order {
  createdAt: string;
  expiredDate: string;
  id: string;
  invoiceId: string;
  orderDate: string;
  paymentMethodId: string;
  payment_method: paymentMethod;
  proofPaymentUrl: string;
  status: string;
  totalAmount: number;
  transaction_items: transaction_items[];
  updatedAt: string;
  userId: string;
}
