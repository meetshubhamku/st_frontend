import React, { useState } from "react";
import Base from "../../../Components/Base";
import StripeCheckout from "react-stripe-checkout";

import { Button } from "@chakra-ui/react";
import { createTokenApi, getPaymentToken } from "../../../Helpers/Appointment";
import { useEffect } from "react";
import { savePaymentApi } from "../../../Helpers/Payment";

const PaymentButton = ({ item }) => {
  const [product, SetProduct] = useState({
    price: 0,
  });

  const createStripeToken = async (token) => {
    const data = {
      token,
      product,
    };
    const res = await createTokenApi(data);
    console.log("res : fdfdfdf : ", res);

    if (res.status === "succeeded") {
      const response = await savePaymentApi({
        data: res,
        appointment_id: product.appointment.id,
      });
      console.log("Final res : ", response);
    }
  };

  useEffect(() => {
    SetProduct({
      name: item.service.name,
      description: item.service.description,
      price: item.service.price,
      user: {
        name: item.user.firstname + " " + item.user.lastname,
        email: item.user.email || item.employee.email || "",
      },
      appointment: {
        id: item.id,
      },
    });
  }, []);

  return (
    <StripeCheckout
      stripeKey={process.env.REACT_APP_STRIPE_PUBLIC_KEY}
      token={createStripeToken}
      name="Pay Now"
      amount={product.price * 100}
      email={item.user.email || item.employee.email}
      currency="inr"
    >
      <Button variant="link" colorScheme="green">
        Pay now
      </Button>
    </StripeCheckout>
  );
};

export default PaymentButton;
