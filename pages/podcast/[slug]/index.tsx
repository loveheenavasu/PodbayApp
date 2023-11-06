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
  setCurrentPlaybackTime,
  setIsPlaying,
  setRecent,
  setSelectedId,
} from "@/redux/Slice";

export default function PodCastDetail({
  params,
}: {
  params: { slug: string };
}) {
  const router = useRouter();
  const selectedId = useSelector((state: any) => state?.data?.selectedId);
  const isPlaying = useSelector((state: any) => state?.data?.isPlaying);
  const audioRef = React.useRef<any>();
  const dispatch = useDispatch();

  const [Podcast, setPodcast] = useState<any>(null);
  const [showPlay, setShowPlay] = useState(false);
  const id = router?.query?.slug;
  const podcastsData = useSelector(
    (state: { data: { jsonData: any } }) => state?.data?.jsonData
  );

  const fetchPodcast = podcastsData?.find(
    (data: { id: any }) => data?.id === Number(id)
  );

  useEffect(() => {
    setPodcast(fetchPodcast);
  }, []);
  // useEffect(() => {
  //   dispatch(resetCurrentPlaybackTime);
  // }, [id]);

  const handleMouseEnter = () => {
    setShowPlay(true);
  };

  const handleMouseLeave = () => {
    setShowPlay(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (Podcast?.audio && typeof Podcast.audio === "string") {
        audioRef.current.src = Podcast?.audio;
        audioRef.current.play();
        dispatch(setCurrentPlaybackTime(audioRef.current.currentTime));
        dispatch(setRecent(Podcast));
        dispatch(setSelectedId(id));
      } else {
        console.error("Invalid audio URL");
      }
    }
    dispatch(setIsPlaying(!isPlaying));
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          color: "#fff",
          flexDirection: "column",
          background: "#1c1b2e",
          margin: 0,
          width: "100%",
          padding: "27px 13px",
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
              image={Podcast?.image}
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
                <PlayArrowIcon sx={{ fontSize: "60px", opacity: "0.87777" }} />
              </Box>
            )}
          </Box>

          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: "#fff" }}
            >
              {Podcast?.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "#fff" }}
            >
              {Podcast?.description}
            </Typography>
          </CardContent>
        </Card>
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            left: "0%",
            background: "#5e304d",
          }}
        >
          <Audio
            audioRef={audioRef}
            podcast={Podcast}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
          />
        </Box>
      </Box>
    </Layout>
  );
}
