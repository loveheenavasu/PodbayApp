"use client"
import CardSection from '@/components/CardSection/CardSection'
import Header from '@/components/home/children/Header'
import Layout from '@/layout/Layout'
import { Box } from '@mui/material'
import React from 'react'

const Dashboard = () => {
  return (
    <>
      <Layout>
      <Box
        sx={{
          display: "flex",
          width: "80vw",
          color: "#fff",
          mt: 4,
          flexDirection: "column",
          background:'#141728'
        }}
      >
        <Header />
        <CardSection />
      </Box>
    </Layout>
    </>
  )
}

export default Dashboard