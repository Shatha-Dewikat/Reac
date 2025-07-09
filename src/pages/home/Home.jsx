import { Box, Container, Typography, IconButton } from "@mui/material";
import { useState, useEffect, Suspense, lazy } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faArrowUp, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../components/loading/Loading";
import { useNavigate } from "react-router-dom";

const Category = lazy(() => import("../../components/category/Category"));
const Products = lazy(() => import("../../components/products/Products"));

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCartClick = () => {
    
      navigate("/carts");
    
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        fontFamily: "'Quicksand', sans-serif",
        py: 6,
        position: "relative",
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", mr: 2, gap: 2 }}>
          <Box>
            <FontAwesomeIcon icon={faLeaf} style={{ fontSize: "32px", color: "#ffb3d1" }} />
            <Typography variant="h4" noWrap sx={{ mt: 1, fontWeight: 700, fontSize: "28px", color: "white" }}>
              E-commerce
            </Typography>
          </Box>
          <Typography variant="subtitle1" sx={{ mt: 1, color: "white", fontSize: "18px", fontWeight: 400 }}>
            The best way to buy the products you love.
          </Typography>
        </Box>

        <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
          <Suspense fallback={<Loading />}>
            <Category />
          </Suspense>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", mr: 2, gap: 2, mt: 6 }}>
          <Box>
            <FontAwesomeIcon icon={faLeaf} style={{ fontSize: "32px", color: "#ffb3d1" }} />
            <Typography variant="h4" noWrap sx={{ mt: 1, fontWeight: 700, fontSize: "28px", color: "white" }}>
              Discover What’s New
            </Typography>
          </Box>
          <Typography variant="subtitle1" sx={{ mt: 1, color: "white", fontSize: "18px", fontWeight: 400 }}>
            Discover the best deals and find your favorite products with ease — smart shopping starts here!
          </Typography>
        </Box>

        <Box sx={{ mt: 6, display: "flex", justifyContent: "center" }}>
          <Suspense fallback={<Loading />}>
            <Products />
          </Suspense>
        </Box>
      </Container>

      {/* أيقونة السلة مع شرط التحقق من تسجيل الدخول */}
      <Box
        onClick={handleCartClick}
        sx={{
          position: "fixed",
          top: 130,
          right: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          cursor: "pointer",
          color: "#ffb3d1",
          transition: "all 0.3s ease",
          "&:hover": {
            color: "#ff85bc",
            transform: "scale(1.6) rotate(15deg)",
          },
          zIndex: 1500,
          userSelect: "none",
        }}
        title="Cart"
      >
        <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: "50px" }} />
        <Typography
          variant="caption"
          sx={{ mt: 0.5, fontWeight: "bold", color: "inherit" }}
        >
          My Cart
        </Typography>
      </Box>

      {/* زر السهم للأعلى */}
      <IconButton
        onClick={scrollToTop}
        sx={{
          position: "fixed",
          bottom: 30,
          right: 30,
          backgroundColor: "#ffb3d1",
          color: "#2b0a3d",
          "&:hover": {
            backgroundColor: "#ff85bc",
          },
          boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          zIndex: 999,
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? "translateY(0)" : "translateY(20px)",
          pointerEvents: showScrollTop ? "auto" : "none",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </IconButton>
    </Box>
  );
}
