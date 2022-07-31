import { isAuthenticated } from "./Auth";
import API from "./Backend";

export const makePaymentApi = async (data) => {
  const { user, token } = isAuthenticated();
  const res = await fetch(`${API}/${user.id}/${user.userType}/payment`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
