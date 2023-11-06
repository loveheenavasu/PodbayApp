"use client";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PublicIcon from "@mui/icons-material/Public";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import MenuIcon from "@mui/icons-material/Menu";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import WidgetsIcon from "@mui/icons-material/Widgets";
import Image from "next/image";
import Link from "next/link";




export default function DrawerComponent() {
  return (
    <Drawer
      sx={{ display: "flex", width: "18vw", backgroundColor: "#141423" }}
      variant="permanent"
      anchor="left"
      className="drawer-parent"
    >
      <List sx={{ padding: "16px 16px 12px 16px" }}>
        <Image src="/podbay.png" alt="" width={50} height={50} />
      </List>
      <Divider />
      <List sx={{ display: "flex", width: "230px", flexDirection: "column" }}>
        <ListItem disablePadding sx={{ mb: 0.4 }}>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <PublicIcon sx={{ color: "#fff", fontSize: "15px" }} />
            </ListItemIcon>
            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              <Link href="/" style={{ textDecoration: "none", color: "#fff" }}>
                {" "}
                Home
              </Link>
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ mb: 0.4 }}>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <RocketLaunchIcon sx={{ color: "#fff", fontSize: "15px" }} />
            </ListItemIcon>
            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              Discover
            </Typography>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Typography
        style={{
          fontFamily: "Gruppo, sans-serif",
          color: "rgb(163, 163, 168)",
          fontWeight: "600",
          padding: "0px 18px",
        }}
      >
        YOUR STUFF
      </Typography>
      <List>
        <ListItem disablePadding sx={{ mb: 0.4 }}>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <MenuIcon sx={{ color: "#fff", fontSize: "15px" }} />
            </ListItemIcon>
            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              My Queue
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ mb: 0.4 }}>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <WidgetsIcon sx={{ color: "#fff", fontSize: "15px" }} />
            </ListItemIcon>
            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              My Podcast
            </Typography>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ minWidth: "40px" }}>
              <AccessTimeIcon sx={{ color: "#fff", fontSize: "15px" }} />
            </ListItemIcon>
            <Link href="/recents" style={{ textDecoration: "none", color: "#fff" }}>
                {" "}
                Recents
              </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}
