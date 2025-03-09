import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import Confetti from "react-confetti";

import { useDog } from "../hooks/useDog";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

export default function MatchModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { matchedDog } = useDog();
  const handleClose = () => setOpen(false);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      {open && <Confetti width={windowSize.width} height={windowSize.height} />}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          sx: { backgroundColor: "rgba(0, 0, 0, 0.1)" }, // Adjust the last value (0.3) for different opacity levels
        }}
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 10,
            }}
          >
            You matched with {matchedDog[0]?.name}!
          </Typography>
          <img
            srcSet={`${matchedDog[0]?.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${matchedDog[0]?.img}?w=248&fit=crop&auto=format`}
            alt={matchedDog[0]?.img}
            loading="lazy"
            style={{
              width: "100%",
              height: "75%",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <Button onClick={handleClose} variant="contained">
              CLOSE
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
