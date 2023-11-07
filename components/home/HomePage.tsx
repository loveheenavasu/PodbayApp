"use client";
import Layout from "@/layout/Layout";
import { Box } from "@mui/material";
import React from "react";
import CardSection from "../CardSection/CardSection";
import Header from "./children/Header";
import {  ToastContainer } from "react-toastify";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter()


  return (
    <Layout>
      <ToastContainer autoClose={4000} />
      <Box
        sx={{
          display: "flex",
          width: "80vw",
          color: "#fff",
          mt: 4,
          flexDirection: "column",
        }}
      >
        <Header />
        <CardSection />
      </Box>
    </Layout>
  );
};

export default HomePage;
