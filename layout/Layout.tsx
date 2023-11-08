"use client";
import Audio from "@/components/audio/Audio";
import { RootState } from "@/redux/Store";
import theme from "@/theme/Theme";
import { Podcast, PodcastData } from "@/types/Types";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import DrawerComponent from "../components/drawer/Drawer";
import Header from "./header/Header";

const Layout = ({ children }: { children: ReactNode }) => {
  const selectedId = useSelector((state: RootState) => state?.data?.selectedId);
  const podcasts:Podcast[] = useSelector(
    (state: { data: { jsonData: Podcast[] } }) => state?.data?.jsonData
  );
    const router = useRouter();
  const pagesToShowAudio = ["/", "/recents", "/dashboard"];
  const shouldShowAudio = pagesToShowAudio.includes(router.pathname);

  // const podcast= podcasts?.find(
  //   (data: { id: number }) => data?.id === Number(selectedId)
  // );
  const podcast = podcasts?.find((data: { id: number }) => data?.id === Number(selectedId)) ?? null;


  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const isPlaying = useSelector((state: RootState) => state?.data?.isPlaying);

  return (
    <Box>
      <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
        <DrawerComponent />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            background: theme.colors.BgPrimary,
            position: "relative",
          }}
        >
          {shouldShowAudio && selectedId && (
            <Box
              sx={{
                position: "absolute",
                bottom: "0%",
                width: "100%",
                left: "0%",
                background: "#5e304d",
                padding: "10px 0",
              }}
            >
              <Audio
                podcast={podcast}
                audioRef={audioRef}
              />
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              width: "80vw",
              color: theme.colors.TextPrimary,
              mt: 4,
              flexDirection: "column",
              background: theme.colors.BgPrimary,
            }}
          >
            <Header />
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
