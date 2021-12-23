import axios from "axios";
export default () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return axios.create({
    baseURL: "/api/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
