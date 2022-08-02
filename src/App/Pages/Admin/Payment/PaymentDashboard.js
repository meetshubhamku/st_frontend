import React, { useState } from "react";
import Base from "../../../Components/Base";
import StripeCheckout from "react-stripe-checkout";

import { Button } from "@chakra-ui/react";
import { createTokenApi, getPaymentToken } from "../../../Helpers/Appointment";

const PaymentDashboard = () => {
  const [product, SetProduct] = useState({
    name: "Laptop",
    price: 100,
  });

  const createStripeToken = async (token) => {
    const data = {
      token,
      product,
    };
    const res = await createTokenApi(data);
    console.log("res : fdfdfdf : ", res);
  };

  return (
    <Base>
      <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
        token={createStripeToken}
        name="Pay Now"
        amount={product.price * 100}
      >
        <Button variant="outline" colorScheme="green">
          Pay now
        </Button>
      </StripeCheckout>
    </Base>
  );
};

export default PaymentDashboard;
