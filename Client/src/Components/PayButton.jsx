// PayButton.jsx
import React from 'react';
import { PaystackButton } from 'react-paystack';

const PayButton = ({ amount, email, name }) => {
  const publicKey = 'pk_test_1e0c2b0001ac41ff53a733e98b52f50eb2d64630'; // Replace with your test key
  const componentProps = {
    email,
    amount: amount * 100, // Convert GHS to Kobo
    metadata: {
      name,
    },
    publicKey,
    text: "Pay Now",
    onSuccess: () => alert("Payment Successful!"),
    onClose: () => alert("Payment Closed"),
  };

  return <PaystackButton {...componentProps} className="bg-green-600 text-white p-3 rounded-md" />;
};

export default PayButton;
