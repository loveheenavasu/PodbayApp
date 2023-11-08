"use client";
import LoginSection from "@/components/Login/LoginSection";
import Layout from "@/layout/Layout";
import { Box } from "@mui/material";
import React from "react";

const Login = () => {
  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          color: "#fff",
          flexDirection: "column",
          background: "#1c1b2e",
          margin: 0,
          width: "100%",
          padding: "27px 13px",
        }}
      >
        <LoginSection />
      </Box>
    </Layout>
  );
};

export default Login;
