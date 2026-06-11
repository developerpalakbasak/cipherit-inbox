import axios from "axios";

// EXPO_PUBLIC_ prefix tells Expo's Metro bundler to inline this value
// at build time — so process.env works in React Native with Expo SDK 49+
const baseURL = "https://cipherit-inbox.hutchinsonapac.com";

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000, // 10 seconds
  headers: {
    Authorization: "Bearer token",
  },
});

export default axiosInstance;
