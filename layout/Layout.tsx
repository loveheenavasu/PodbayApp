"use client";
import Audio from "@/components/audio/Audio";
import { setSelectedId } from "@/redux/Slice";
import { Box } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DrawerComponent from "../components/drawer/Drawer";

const Layout = ({ children }: any) => {
  const selectedId = useSelector((state: any) => state?.data?.selectedId);
  const podcasts = useSelector((state: any) => state?.data?.jsonData);
  const router = useRouter();
  const pagesToShowAudio = ["/", "/recents", "/dashboard"];
  const shouldShowAudio = pagesToShowAudio.includes(router.pathname);
  const dispatch = useDispatch();

  const Podcast = podcasts?.find(
    (data: { id: any }) => data?.id === Number(selectedId)
  );
  console.log(selectedId, "selectedId");
  const [userData, setUserData] = React.useState(null);

  React.useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        setUserData(parsedData);
      } catch (error) {
        console.error("Error parsing 'user' cookie:", error);
      }
    } else {
      console.error("The 'user' cookie is not set or is empty.");
    }
  }, []);

  const audioRef = React.useRef<any>();
  const isPlaying = useSelector((state: any) => state?.data?.isPlaying);
  // useEffect(() => {
  //   if (userData) {
  //     dispatch(setSelectedId(null));
  //   }
  // }, []);

  return (
    <Box>
      <Box sx={{ display: "flex", width: "100vw", height: "100vh" }}>
        <DrawerComponent />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            background: "#141728",
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
                podcast={Podcast}
                audioRef={audioRef}
                isPlaying={isPlaying}
                selectedId={selectedId}
              />
            </Box>
          )}
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
