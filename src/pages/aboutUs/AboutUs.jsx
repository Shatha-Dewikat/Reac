import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";

export default function AboutUs() {
  return (
    <Container maxWidth="md" sx={{ my: 6 }}>
      <Paper
        elevation={3}
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
          About Us
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: "#5a3b6e", fontSize: "16px", lineHeight: 1.8, fontFamily: "quicksand" }}
        >
          Welcome to our E-commerce platform! 🌟 <br /><br />
          We're passionate about providing high-quality products with an exceptional shopping experience.
          Our mission is to bring you the latest trends, best prices, and a smooth journey from browsing to checkout.
          <br /><br />
          Whether you're looking for something special or just browsing for inspiration, we're here to make your online shopping fun, easy, and safe.
          <br /><br />
          Thank you for choosing us! 💕
        </Typography>
      </Paper>
    </Container>
  );
}
