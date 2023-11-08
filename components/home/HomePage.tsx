"use client";
import Layout from "@/layout/Layout";
import { Box } from "@mui/material";
import React from "react";
import {  ToastContainer } from "react-toastify";
import theme from "@/theme/Theme";
import CardSection from "../cardSection/CardSection";

const HomePage = () => {
  return (
    <Layout>
      <ToastContainer autoClose={4000} />
      <Box
        sx={{
          display: "flex",
          width: "80vw",
          color: theme.colors.TextPrimary,
          mt: 4,
          flexDirection: "column",
        }}
      >
        <CardSection />
      </Box>
    </Layout>
  );
};

export default HomePage;
