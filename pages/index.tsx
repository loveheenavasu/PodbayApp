"use client";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import HomePage from "@/components/home/HomePage";
import { Box } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import theme from "@/theme/Theme";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Box sx={{ background: theme.colors.Background, height:'100vh', marginTop:0 }}>
      <HomePage />
    </Box>
  );
}
