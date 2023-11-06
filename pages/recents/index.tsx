"use client";
import { useState } from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Layout from "@/layout/Layout";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Image from "next/image";

export default function RecentPocast({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const theme = useTheme();
  const selectedId = useSelector((state: any) => state?.data?.selectedId);

  const recentData = useSelector(
    (state: { data: { recent: any } }) => state?.data?.recent
  );

  return (
    <Layout>
      {selectedId ? (
        <Box
          sx={{
            display: "flex",
            color: "#fff",
            flexDirection: "column",
            background: "#1c1b2e",
            margin: 0,
            width: "100%",
            padding: "27px 13px",
            justifyContent: "flex-start",
            alignItems: "center",
            pt: 4,
          }}
        >
          <Typography
            component="h1"
            sx={{
              color: "rgb(155, 125, 217)",
              fontFamily: " DM Serif Display, serif",
              textAlign: "left",
              letterSpacing: "5px",
              fontWeight: 900,
              fontSize: "40px",
              margin: "10px",
            }}
          >
            Recents Podcasts
          </Typography>
          <Link href={`podcast/${selectedId}`}>
            <Card
              sx={{
                display: "flex",
                maxWidth: 450,
                background: "#0a0a10",
                color: "#fff",
                height: 250,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography component="div" variant="h5">
                    {recentData?.title}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                    sx={{ color: "#fff", mt: 2, fontSize: "12px" }}
                  >
                    {recentData?.description}
                  </Typography>
                </CardContent>
                <Box
                  sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}
                >
                  <IconButton aria-label="previous">
                    {theme.direction === "rtl" ? (
                      <SkipNextIcon />
                    ) : (
                      <SkipPreviousIcon />
                    )}
                  </IconButton>
                  <IconButton aria-label="play/pause">
                    <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                  </IconButton>
                  <IconButton aria-label="next">
                    {theme.direction === "rtl" ? (
                      <SkipPreviousIcon />
                    ) : (
                      <SkipNextIcon />
                    )}
                  </IconButton>
                </Box>
              </Box>
              <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={recentData?.image}
                alt="Live from space album cover"
              />
            </Card>
          </Link>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            color: "#fff",
            flexDirection: "column",
            background: "#1c1b2e",
            margin: 0,
            width: "100%",
            padding: "27px 13px",
            justifyContent: "flex-start",
            alignItems: "center",
            pt: 4,
          }}
        >
          <Typography
            component="h1"
            sx={{
              color: "rgb(155, 125, 217)",
              fontFamily: " DM Serif Display, serif",
              textAlign: "left",
              letterSpacing: "5px",
              fontWeight: 900,
              fontSize: "40px",
              margin: "10px",
            }}
          >
            No Recent Podcasts
          </Typography>
          <Image src="/bggg.png" width={300} height={300} alt="" />
        </Box>
      )}
    </Layout>
  );
}
