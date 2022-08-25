import axios from "axios";

export async function checkAuth(token) {
  token && localStorage.setItem("token", token);

  return axios
    .get("http://localhost:8888/auth/isAuthenticated", {
      headers: {
        "x-access-token": token,
      },
    })
    .then((res) => {
      return res.data;
    });
}

export async function setAuthToken(token) {
  axios.defaults.headers.common["x-access-token"] = "";
  delete axios.defaults.headers.common["x-access-token"];

  if (token) {
    axios.defaults.headers.common["x-access-token"] = token;
  }
}

export function getNewModel() {
  return {
    name: "new model",
    objects: [],
  };
}
