import { isAuthenticated } from "./Auth";
import API from "./Backend";

export const getUsers = async () => {
  const { user, token } = isAuthenticated();
  const res = await fetch(`${API}/${user.id}/${user.userType}/users`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const blockUser = async (id) => {
  const { user, token } = isAuthenticated();
  const res = await fetch(`${API}/${user.id}/${user.userType}/user/block`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: id,
    }),
  });

  return res.json();
};

export const unBlockUser = async (id) => {
  const { user, token } = isAuthenticated();
  const res = await fetch(`${API}/${user.id}/${user.userType}/user/unblock`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: id,
    }),
  });

  return res.json();
};

export const getEmployees = async () => {
  const { user, token } = isAuthenticated();
  const res = await fetch(`${API}/employees`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};
