import React from "react";
import Slider from "react-slick";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router";

const slides = [
  {
    img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1600&q=80",
    title: "Latest Smartphones with Great Discounts!",
    subtitle: "Upgrade your tech game today with unbeatable offers!",
  },
  {
    img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1600&q=80",
    title: "Powerful Laptops for Every Need!",
    subtitle: "Find your perfect laptop and boost your productivity!",
  },
  {
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80",
    title: "Top Electronics Deals Available Now!",
    subtitle: "Don't miss out on the hottest electronics sales!",
  },
];

export default function HeroSlider() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <Box sx={{ width: "100%", overflow: "hidden", mb: 6 }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <Box
            key={index}
            sx={{
              height: { xs: "220px", sm: "350px", md: "500px" },
              backgroundImage: `url(${slide.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              "&:hover .overlay": {
                opacity: 0.7,
              },
              "&:hover .content": {
                opacity: 0.3,
              },
              "&:hover .shopButton": {
                opacity: 1,
                transform: "translateY(0)",
                pointerEvents: "auto",
              },
            }}
          >
            {/* ظل الصورة */}
            <Box
              className="overlay"
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.4)",
                transition: "opacity 0.4s ease",
                zIndex: 0,
              }}
            />

            {/* النص */}
            <Box
              className="content"
              sx={{
                zIndex: 1,
                textAlign: "center",
                color: "white",
                px: 2,
                animation: "slideDown 1s ease forwards",
                opacity: 1,
                transition: "opacity 0.4s ease",
                maxWidth: { xs: "90%", sm: "70%", md: "50%" },
                "@keyframes slideDown": {
                  "0%": { opacity: 0, transform: "translateY(-30px)" },
                  "100%": { opacity: 1, transform: "translateY(0)" },
                },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  textShadow: "0 2px 6px rgba(0,0,0,0.6)",
                }}
              >
                {slide.title}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "medium",
                  mb: 2,
                  textShadow: "0 1px 4px rgba(0,0,0,0.5)",
                }}
              >
                {slide.subtitle}
              </Typography>
            </Box>

            {/* زر Shop Now */}
            <Button
              className="shopButton"
              variant="contained"
              
              color="secondary"
              component={Link}
              to={'/Products'}
              sx={{
                position: "absolute",
                zIndex: 2,
                bottom: "20%",
                left: "50%",
                transform: "translate(-50%, 20px)",
                opacity: 0,
                transition: "opacity 0.4s ease, transform 0.4s ease",
                pointerEvents: "none",
                "&:hover": {
                  backgroundColor: "#6a1b9a",
                },
              }}
            >
              Shop Now
            </Button>
          </Box>
        ))}
      </Slider>
    </Box>
  );
}
