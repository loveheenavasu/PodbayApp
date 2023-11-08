"use client";
import { useEffect, useState } from "react";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Layout from "@/layout/Layout";
import { useRouter } from "next/router";
import Audio from "@/components/audio/Audio";
import { useDispatch, useSelector } from "react-redux";
import {
  resetCurrentPlaybackTime,
  setCurrentDuration,
  setCurrentPlaybackTime,
  setData,
  setIsPlaying,
  setRecent,
  setSelectedId,
} from "@/redux/Slice";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import LoginModal from "@/components/loginModal/LoginModal";
import Cookies from "js-cookie";
import theme from "@/theme/Theme";
import { RootState } from "@/redux/Store";
import { Podcast, PodcastData, UserData } from "@/types/Types";

export default function PodCastDetail({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const isPlaying = useSelector((state: RootState) => state?.data?.isPlaying);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [open, setOpen] = useState(false);
  const [podcast, setPodcast] = useState<PodcastData | null>(null);
  const [showPlay, setShowPlay] = useState(false);
  const id = router?.query?.slug;
  const podcastsData = useSelector(
    (state: { data: { jsonData: Podcast[] } }) => state?.data?.jsonData
  );

  const userData = useSelector((state: RootState) => state?.data?.userData) as unknown as UserData;

  

  const fetchPodcasts = () => {
    const jsonUrl = "/podbay.json";
    setLoading(true);

    fetch(jsonUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error occured while fetching data");
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        dispatch(setData(data));
        console.log(data, "data");
      })
      .catch((err) => {
        throw new Error(err);
      });
  };

  useEffect(() => {
    fetchPodcasts();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchPodcast = podcastsData?.find(
        (data: { id: number }) => data?.id === Number(id)
      );
      if (fetchPodcast) {
        setPodcast(fetchPodcast);
      }
    }
  }, [id, podcastsData]);
  useEffect(() => {
    dispatch(setCurrentPlaybackTime(0));
    dispatch(setCurrentDuration(0));
  }, [id]);

  const handleMouseEnter = () => {
    setShowPlay(true);
  };

  const handleMouseLeave = () => {
    setShowPlay(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef?.current?.pause();
    } else {
      if (podcast?.audio && typeof podcast?.audio === "string") {
        if (audioRef?.current) {
          audioRef.current.src = podcast?.audio;
          audioRef?.current?.play();
          dispatch(setCurrentPlaybackTime(audioRef?.current?.currentTime));
          dispatch(setRecent(podcast));
          dispatch(setSelectedId(id));
        } else {
          console.error("audioRef.current is null");
        }
      } else {
        console.error("Invalid audio URL");
      }
    }
    dispatch(setIsPlaying(!isPlaying));
  };
  useEffect(() => {
    dispatch(resetCurrentPlaybackTime);
  }, [id]);
  useEffect(() => {
    dispatch(setSelectedId(id));
    dispatch(setRecent(podcast));
  }, [id, podcast]);

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;

    if (isPlaying && !userData) {
      timer = setInterval(() => {
        toggleAudio();
        audioRef?.current?.pause();
        setIsPlaying(false);
        setOpen(true);
        setShowLoginPopup(true);
      }, 10000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isPlaying, audioRef]);

  return (
    <Layout>
      {showLoginPopup && !userData && (
        <LoginModal open={open} setOpen={setOpen} />
      )}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            color: theme.colors.TextPrimary,
            flexDirection: "column",
            background: "#1c1b2e",
            margin: 0,
            height: "100vh",
            width: "100%",
            padding: "27px 13px",
          }}
        >
          <Backdrop
            sx={{
              color: theme.colors.TextPrimary,
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              color: theme.colors.TextPrimary,
              flexDirection: "column",
              background: "#1c1b2e",
              margin: 0,
              width: "100%",
              padding: "27px 13px",
              position: "relative",
              height: "100vh",
            }}
          >
            <Card
              sx={{
                maxWidth: "95%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#0a0b11",
                color: "#fff",
                margin: "10px",
                boxShadow: "rgb(177 174 174 / 59%) 0px 1px 4px",
                cursor: "pointer",
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={toggleAudio}
            >
              <Box
                sx={{
                  width: "120px",
                  height: "130px",
                  display: "flex",
                  position: "relative",
                  cursor: "pointer",
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <CardMedia
                  sx={{ width: "200px", height: "150px" }}
                  image={podcast?.image}
                  title="green iguana"
                />
                {showPlay && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "27%",
                      right: "25%",

                      zIndex: 99999,
                    }}
                  >
                    <PlayArrowIcon
                      sx={{ fontSize: "60px", opacity: "0.87777" }}
                    />
                  </Box>
                )}
              </Box>

              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  sx={{ color: theme.colors.TextPrimary }}
                >
                  {podcast?.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ color: theme.colors.TextPrimary }}
                >
                  {podcast?.description}
                </Typography>
              </CardContent>
            </Card>
            <Box
              sx={{
                position: "absolute",
                bottom: "0px",
                width: "100%",
                left: "0%",
                background: "#5e304d",
                padding: "10px 0",
              }}
            >
              <Audio audioRef={audioRef} podcast={podcast} id={id as string} />
            </Box>
          </Box>
        </>
      )}
    </Layout>
  );
}
