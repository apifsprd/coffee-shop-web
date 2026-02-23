import api from "../api";

export const getTransactionbyUser = async () => {
  try {
    const response = await api.get({
      url: "/my-transactions",
      withToken: true,
    });
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const getTransactionbyID = async ({ id }: { id: string }) => {
  try {
    const response = await api.get({
      url: `/transaction/${id}`,
      withToken: true,
    });
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// POST

export const createTransaction = async (payload: object) => {
  try {
    const response = await api.post({
      url: "/create-transaction",
      data: payload,
      withToken: true,
    });
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
export const updateTransactionProofPayment = async ({
  transactionID,
  payload,
}: {
  transactionID: string;
  payload: { proofPaymentUrl: string };
}) => {
  try {
    const response = await api.post({
      url: `/update-transaction-proof-payment/${transactionID}`,
      data: payload,
      withToken: true,
    });
    return response;
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
