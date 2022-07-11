import API from "./Backend";

export const signup = async (user) => {
  const res = await fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return res.json();
};

export const signin = async (user) => {
  const res = await fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  return res.json();
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("ScissorTalesToken", JSON.stringify(data));
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window !== "undefined") {
    if (JSON.parse(localStorage.getItem("ScissorTalesToken"))) {
      return JSON.parse(localStorage.getItem("ScissorTalesToken"));
    }
    return false;
  }
};

export const signout = async (next) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("ScissorTalesToken");
    // await fetch(`${API}/signout`, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    // });
    next();

    // fetch(`${API}/signout`, {
    //   method: "GET",
    // })
    //   .then((response) => {
    //     console.log("signout success");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }
};
