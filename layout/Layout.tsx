"use client";
import Audio from "@/components/audio/Audio";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import DrawerComponent from "../components/drawer/Drawer";

const Layout = ({ children }: any) => {
  const selectedId = useSelector((state: any) => state?.data?.selectedId);
  const podcasts = useSelector((state: any) => state?.data?.jsonData);
  const router = useRouter();

  const pagesToShowAudio = ["/", "/recents"];

  const shouldShowAudio = pagesToShowAudio.includes(router.pathname);

  const Podcast = podcasts?.find(
    (data: { id: any }) => data?.id === Number(selectedId)
  );
  const audioRef = React.useRef<any>();
  const isPlaying = useSelector((state: any) => state?.data?.isPlaying);

  return (
    <Box>
      <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
        <DrawerComponent />
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {shouldShowAudio && (
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
                left: "0%",
                background:'#5e304d'
              }}
            >
              {selectedId && (
                <Audio
                  podcast={Podcast}
                  audioRef={audioRef}
                  isPlaying={isPlaying}
                  // setIsPlaying={setIsPlaying}
                  selectedId={selectedId}
                />
              )}
            </Box>
          )}

          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
