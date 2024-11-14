import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": {
      BACKEND_URL: process.env.BACKEND_URL,
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URI: process.env.DATABASE_URI,
      ACCESS_TOKEN_SECRETL: process.env.ACCESS_TOKEN_SECRETL,
      REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
      FRONTEND_URL_DEV: process.env.FRONTEND_URL_DEV,
      FRONTEND_URL_PROD: process.env.FRONTEND_URL_PROD,
      EMAIL_HOST: process.env.EMAIL_HOST,
      EMAIL_PORT: process.env.EMAIL_PORT,
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASS: process.env.EMAIL_PASS,
      CLUSTER_DB_USER: process.env.CLUSTER_DB_USER,
      CLUSTER_DB_PASS: process.env.CLUSTER_DB_PASS,
      CLUSTER_CONNECTION_STRING: process.env.VITE_BACKEND_URL,
    },
  },
});
