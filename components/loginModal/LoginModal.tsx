"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Link from "next/link";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "black",
  p: 6,
  borderRadius: "10px",
};

export default function LoginModal({ open, setOpen }: any) {
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "#fff" }}
          >
            Continue With Login to{" "}
            <span
              style={{
                color: "rgb(155, 125, 217)",
                fontFamily: " DM Serif Display, serif",
                textAlign: "left",
                letterSpacing: "5px",
                fontWeight: 900,
                fontSize: "20px",
              }}
            >
              PODBAY{" "}
            </span>{" "}
            for enjoy more Podcasts
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Link
              href="/login"
              style={{
                color: "#fff",
                textDecoration: "none ",
                fontWeight: 600,
                border: "1px solid #fff",
                borderRadius: "10px",
                padding: "9px",
              }}
            >
              Login to Podbay 😁 😁
            </Link>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
