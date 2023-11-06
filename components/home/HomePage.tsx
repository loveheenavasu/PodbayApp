"use client";
import Layout from "@/layout/Layout";
import { Box } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CardSection from "../CardSection/CardSection";
import LoginModal from "../loginModal/LoginModal";
import Header from "./children/Header";

const HomePage = () => {


  return (
    <Layout>
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
