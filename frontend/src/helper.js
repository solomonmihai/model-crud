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
