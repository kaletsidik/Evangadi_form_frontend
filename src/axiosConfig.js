import axios from "axios";

const instance = axios.create({
  //baseURL: "http://localhost:5000/api",
  // baseURL: "evangadi-form-backend-cfck.vercel.app",
  baseURL: "https://evangadi-form-backend-v500.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
