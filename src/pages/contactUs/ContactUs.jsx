import React from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Stack,
} from "@mui/material";

export default function ContactUs() {
  return (
    <Container maxWidth="sm" sx={{ my: 6 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: "16px",
          backgroundColor: "#fff0f6",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#2b0a3d", fontFamily: "quicksand", fontWeight: 700 }}
        >
          Contact Us
        </Typography>

        <Typography
          variant="body1"
          gutterBottom
          sx={{ color: "#5a3b6e", mb: 3, fontFamily: "quicksand" }}
        >
          If you have any questions or inquiries, feel free to send us a message. 💌
        </Typography>

        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            sx={{ backgroundColor: "#ffffff" }}
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            sx={{ backgroundColor: "#ffffff" }}
          />
          <TextField
            fullWidth
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            sx={{ backgroundColor: "#ffffff" }}
          />
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#ffb3d1",
              color: "#2b0a3d",
              fontWeight: "bold",
              fontFamily: "quicksand",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#f28ab7",
              },
            }}
          >
            Send
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
