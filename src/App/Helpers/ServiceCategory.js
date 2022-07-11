import { isAuthenticated } from "./Auth";
import API from "./Backend";

export const addServiceCategory = async (data) => {
  const { user, token } = isAuthenticated();
  const res = await fetch(
    `${API}/${user.id}/${user.userType}/service-category`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  return res.json();
};

export const updateServiceCategory = async (data) => {
  const { user, token } = isAuthenticated();
  const res = await fetch(
    `${API}/${user.id}/${user.userType}/service-category`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id: data.id,
        name: data.name,
        description: data.description,
      }),
    }
  );
  return res.json();
};

export const getServicesCategory = async () => {
  const { user, token } = isAuthenticated();
  const res = await fetch(
    `${API}/${user.id}/${user.userType}/service-category`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.json();
};

export const deleteServicesCategory = async (id) => {
  const { user, token } = isAuthenticated();
  const res = await fetch(
    `${API}/${user.id}/${user.userType}/service-category`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ id: id }),
    }
  );
  return res.json();
};
