"use client";
import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeMute from "@mui/icons-material/VolumeMute";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import StopIcon from "@mui/icons-material/Stop";
import {
  resetCurrentPlaybackTime,
  setCurrentDuration,
  setCurrentPlaybackTime,
  setIsPlaying,
  setRecent,
  setSelectedId,
} from "@/redux/Slice";
import { useDispatch, useSelector } from "react-redux";

const Audio = ({ audioRef, podcast, id }: any) => {
  const [currentTime, setCurrentTime] = useState(0);
  const dispatch = useDispatch();
  const isPlaying = useSelector((state: any) => state?.data?.isPlaying);
  const selectedId = useSelector((state: any) => state?.data?.selectedId);
  const currentPlaybackTime = useSelector(
    (state: any) => state?.data?.currentPlaybackTime
  );
  const duration = useSelector((state: any) => state?.data?.duration);

  const skipBack = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 15;
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 15;
    }
  };
  const [currentSpeed, setCurrentSpeed] = useState(100);
  const increaseSpeed = () => {
    if (audioRef.current && currentSpeed < 400) {
      const newSpeed = Math.min(currentSpeed + 10, 400);
      audioRef.current.playbackRate = newSpeed / 100;
      setCurrentSpeed(newSpeed);
    }
  };

  const decreaseSpeed = () => {
    if (audioRef.current && currentSpeed > 0) {
      const newSpeed = Math.max(currentSpeed - 10, 0);
      audioRef.current.playbackRate = newSpeed / 100;
      setCurrentSpeed(newSpeed);
    }
  };
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current.load();
      audioRef.current.parentNode?.removeChild(audioRef.current);
    }
  };
  function formatTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }

  const updateProgressBar = () => {
    if (audioRef.current) {
      dispatch(setCurrentPlaybackTime(audioRef.current.currentTime));
      dispatch(setCurrentDuration(audioRef?.current?.duration));
    }
  };

  console.log(currentTime, "time");
 
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateProgressBar);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateProgressBar);
      }
    };
  }, []);

  const handleProgressBarClick = (e: any) => {
    const progressBar = e.target;
    const rect = progressBar.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const width = rect.width;
    const seekTime = (offsetX / width) * duration;
    audioRef.current.currentTime = seekTime;
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.currentTime = currentPlaybackTime;
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (podcast?.audio && typeof podcast.audio === "string") {
        audioRef.current.src = podcast?.audio;
        audioRef.current.play();
        dispatch(setCurrentPlaybackTime(audioRef.current.currentTime));
        dispatch(setRecent(podcast));
        dispatch(setSelectedId(id));
      } else {
        console.error("Invalid audio URL");
      }
    }
    dispatch(setIsPlaying(!isPlaying));
  };

 
  
  return (
    <>
      <Box sx={{ position: "relative", display: "flex", width: "100%" }}>
        <Grid
          container
          className="custom-audio-player"
          sx={{ display: "flex", width: "100%" }}
        >
          <audio ref={audioRef} src={podcast?.audio} style={{ opacity: 0 }} key={id}/>

          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img src={podcast?.image} alt="" height={70} width={80} />
            <Box>
              <Typography sx={{ fontSize: "13px", mb: 0 , color:'#fff'}}>
                {podcast?.title}
              </Typography>
              <Typography
                sx={{ fontSize: "11px", color:'#fff' }}
              >{`${podcast?.description.slice(1, 24)}...`}</Typography>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button onClick={skipBack} sx={{ color: "#fff" }}>
                  15
                  <KeyboardBackspaceIcon fontSize="small" />
                </Button>
                <Button
                  onClick={toggleAudio}
                  variant="text"
                  size="small"
                  sx={{ margin: 0, color: "#fff" }}
                >
                  {isPlaying ? (
                    <PauseIcon sx={{ color: "#fff", margin: 0 }} />
                  ) : (
                    <PlayArrowIcon sx={{ color: "#fff", margin: 0 }} />
                  )}
                </Button>
                <Button onClick={skipForward} sx={{ color: "#fff" }}>
                  15
                  <ArrowRightAltIcon fontSize="small" />{" "}
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "50%",
                    height: "10px",
                    backgroundColor: " #ccc",
                    cursor: " pointer",
                    position: "relative",
                  }}
                  onClick={handleProgressBarClick}
                >
                  <div
                    className="progress-bar"
                    style={{
                      width: `${(currentPlaybackTime / duration) * 100}%`,
                      height: "100%",
                      backgroundColor: "#e86491",
                      transition: "width 0.1s linear",
                      zIndex: 9999,
                      position: "absolute",
                      left: "0%",
                    }}
                  ></div>
                </div>

                <div
                  className="time-display"
                  style={{ position: "absolute", top: "20px", left: "25%" }}
                >
                  <Typography sx={{ fontSize: "12px", color:'#fff' }}>
                    {duration && currentPlaybackTime ? (
                      <>
                        {formatTime(currentPlaybackTime)} /{" "}
                        {formatTime(duration)}
                      </>
                    ) : (
                      <>00:00 / 00:00</>
                    )}
                  </Typography>
                </div>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button onClick={decreaseSpeed} disabled={currentSpeed <= 1}>
                <VolumeMute sx={{ color: "#fff" }} fontSize="small" />
              </Button>
              <p> {currentSpeed}%</p>
              <Button onClick={increaseSpeed} disabled={currentSpeed >= 100}>
                <VolumeUpIcon sx={{ color: "#fff" }} fontSize="small" />
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button onClick={stopAudio} sx={{ color: "#fff" }}>
                <StopIcon /> STOP
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Audio;
