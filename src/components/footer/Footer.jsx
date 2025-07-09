import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#2b0a3d",
        color: "white",
        py: 6,
        fontFamily: "quicksand",
        letterSpacing: 0.5,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* شعار ووصف */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
              E-commerce
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.6, color: "#ddd" }}>
              Discover the latest trends in fashion, tech, and more – all in one place.
            </Typography>
          </Grid>

          {/* روابط التصفح */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
              Navigation
            </Typography>
            <Box>
              {[
                { icon: <HomeIcon sx={{ mr: 1 }} />, label: "Home" },
                { icon: <ShoppingBagIcon sx={{ mr: 1 }} />, label: "Products" },
                { icon: <InfoIcon sx={{ mr: 1 }} />, label: "About Us" },
                { icon: <ContactMailIcon sx={{ mr: 1 }} />, label: "Contact Us" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href="#"
                  underline="hover"
                  color="inherit"
                  display="flex"
                  alignItems="center"
                  sx={{
                    mb: 1.5,
                    fontSize: "15px",
                    transition: "color 0.3s ease",
                    "&:hover": { color: "#ffb3d1" },
                  }}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* روابط حساب المستخدم */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
              Account
            </Typography>
            <Box>
              {[
                { icon: <LoginIcon sx={{ mr: 1 }} />, label: "Sign In" },
                { icon: <PersonAddIcon sx={{ mr: 1 }} />, label: "Register" },
                { icon: <ListAltIcon sx={{ mr: 1 }} />, label: "Orders" },
                { icon: <FavoriteBorderIcon sx={{ mr: 1 }} />, label: "Wishlist" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href="#"
                  underline="hover"
                  color="inherit"
                  display="flex"
                  alignItems="center"
                  sx={{
                    mb: 1.5,
                    fontSize: "15px",
                    transition: "color 0.3s ease",
                    "&:hover": { color: "#ffb3d1" },
                  }}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* تواصل معنا */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
              Contact
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.8, color: "#ddd", display: "flex", alignItems: "center" }}>
              <EmailIcon sx={{ mr: 1 }} /> support@ecommerce.com
            </Typography>
            <Typography variant="body2" sx={{ mb: 0.8, color: "#ddd", display: "flex", alignItems: "center" }}>
              <PhoneIcon sx={{ mr: 1 }} /> +972 599 000 000
            </Typography>
            <Typography variant="body2" sx={{ color: "#ddd", display: "flex", alignItems: "center" }}>
              <LocationOnIcon sx={{ mr: 1 }} /> Palestine
            </Typography>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 4, backgroundColor: "rgba(255,255,255,0.2)" }} />

        {/* Social Media Icons */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <IconButton href="#" sx={{ color: "#ffb3d1", mx: 1 }}>
            <FacebookIcon />
          </IconButton>
          <IconButton href="#" sx={{ color: "#ffb3d1", mx: 1 }}>
            <InstagramIcon />
          </IconButton>
          <IconButton href="#" sx={{ color: "#ffb3d1", mx: 1 }}>
            <TwitterIcon />
          </IconButton>
        </Box>

        {/* الحقوق */}
        <Typography variant="body2" align="center" sx={{ color: "#bbb", fontSize: 13 }}>
          © {new Date().getFullYear()} E-commerce. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
