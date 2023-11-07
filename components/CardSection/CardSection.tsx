import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Link from "next/link";
import {

  setData,
} from "@/redux/Slice";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Cookies from "js-cookie";

const CardSection = () => {
  const dispatch = useDispatch();
  const podcasts: any = useSelector(
    (state: { data: { jsonData: any } }) => state?.data?.jsonData
  );
  const [userData, setUserData] = React.useState(null);

  const [loading, setLoading] = useState(false);
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

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

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


  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 5 }}>
        <Typography sx={{ color: "#fff", fontSize: "18px", mb: 0.2 }}>
          Trending podcasts in all geners
        </Typography>
        <Typography sx={{ color: "gray", fontSize: "15px", mb: 2 }}>
          The most popular podcasts overall now
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: userData ? "space-between" : "flex-start",
          gap: userData ? 1 : 4,
        }}
      >
        {loading ? (
          <>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={true}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </>
        ) : (
          <>
            {podcasts?.map((data: any) => {
              const fontColor = getRandomColor();
              const { id } = data;

              return (
                <>
                  <Link href={`podcast/${id}`}>
                    {userData ? (
                      <>
                        <Card
                          sx={{
                            maxWidth: 255,
                            mb: 2,
                            background: "transparent",
                          }}
                        >
                          <CardMedia
                            sx={{ height: 245 }}
                            image={data.image}
                            title="green iguana"
                          />
                          <CardContent>
                            <Typography
                              component="div"
                              sx={{ fontSize: "15px", color: "#fff" }}
                            >
                              {`#${data?.id}`}
                              {data.title.length > 20
                                ? `${data.title.slice(0, 20)}...`
                                : data.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ color: fontColor, fontSize: "13px" }}
                            >
                              {data.description.length > 20
                                ? `${data.description.slice(0, 30)}`
                                : data.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </>
                    ) : (
                      <>
                        {data?.isFree ? (
                          <>
                            <Card
                              sx={{
                                maxWidth: 255,
                                mb: 2,
                                background: "transparent",
                              }}
                            >
                              <CardMedia
                                sx={{ height: 245 }}
                                image={data.image}
                                title="green iguana"
                              />
                              <CardContent>
                                <Typography
                                  component="div"
                                  sx={{ fontSize: "15px", color: "#fff" }}
                                >
                                  {`#${data?.id}`}
                                  {data.title.length > 20
                                    ? `${data.title.slice(0, 20)}...`
                                    : data.title}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  sx={{ color: fontColor, fontSize: "13px" }}
                                >
                                  {data.description.length > 20
                                    ? `${data.description.slice(0, 30)}`
                                    : data.description}
                                </Typography>
                              </CardContent>
                            </Card>
                          </>
                        ) : null}
                      </>
                    )}
                  </Link>
                </>
              );
            })}
          </>
        )}
      </Box>
    </>
  );
};

export default CardSection;
