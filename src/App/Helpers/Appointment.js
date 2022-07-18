import { isAuthenticated } from "./Auth";
import API from "./Backend";

export const addAppointment = async (data) => {
  const { user, token } = isAuthenticated();
  const res = await fetch(`${API}/${user.id}/${user.userType}/appointment`, {
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

export const updateAppointment = async (data) => {
  const { user, token } = isAuthenticated();
  const res = await fetch(`${API}/${user.id}/${user.userType}/appointment`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      id: data.id,
      note: data.note,
      date: data.date,
      time: data.time,
      status: data.status,
      employee_id: data.employee_id,
      user_id: data.user_id,
      service_id: data.service_id,
    }),
  });
  return res.json();
};

export const getAppointments = async () => {
  const { user, token } = isAuthenticated();
  const res = await fetch(`${API}/${user.id}/${user.userType}/appointments`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const deleteAppointment = async (id) => {
  const { user, token } = isAuthenticated();
  const res = await fetch(`${API}/${user.id}/${user.userType}/appointment`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id: id }),
  });
  return res.json();
};
