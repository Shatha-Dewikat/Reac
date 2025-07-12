import React, { useState, useEffect } from "react";
import { Box, Typography, Container } from "@mui/material";
const offers = [
  "🔥 50% off on all products for a limited time!",
  "🚚 Free shipping on orders over $100!",
  "🎁 Free gift with every order above $200!",
  "⚡ Special deal: Buy 2, get 1 free!",
];

export default function OffersBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % offers.length);
    }, 3500); // يتغير كل 3.5 ثانية
    return () => clearInterval(interval);
  }, []);

  return (
   <Box
  sx={{
    backgroundColor: "rgba(103, 58, 183, 0.0)", // 💡 نفس اللون لكن شفاف بنسبة 30%
    backdropFilter: "blur(6px)", // ✨ يعطي تأثير زجاجي ناعم
    color: "white",
    py: 1.2,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: { xs: "0.9rem", sm: "1.1rem" },
    letterSpacing: 1.2,
    userSelect: "none",
    overflow: "hidden",
    position: "relative",
    height: 40,
  }}
>


    
      <Container maxWidth="lg" sx={{ position: "relative", height: "100%" }}>
        <Box
  sx={{
    position: "relative",
    height: 40, // ✅ ارتفاع ثابت للسطر الواحد
    overflow: "hidden",
  }}
>
  <Box
    sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      transition: "transform 0.6s ease-in-out",
      transform: `translateY(-${currentIndex * 40}px)`, // ✅ يتحرك بمقدار 40px لكل عنصر
    }}
  >
    {offers.map((offer, i) => (
      <Box
        key={i}
        sx={{
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: "1rem",
          }}
        >
          {offer}
        </Typography>
      </Box>
    ))}
  </Box>
</Box>

      </Container>
    </Box>
  );
}
