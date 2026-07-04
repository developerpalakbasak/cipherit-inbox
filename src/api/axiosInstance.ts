import axios from "axios";

// EXPO_PUBLIC_ prefix tells Expo's Metro bundler to inline this value
// at build time — so process.env works in React Native with Expo SDK 49+
const baseURL = "https://cipherit-inbox.hutchinsonapac.com";

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000, // 10 seconds
  headers: {
    Authorization: "Bearer 0626a13c86b2ca930433a84886c90c05c9f72ada8ba5c5d83f92f2e3c82bc193",
  },
});

export default axiosInstance;
