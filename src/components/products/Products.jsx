import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// CSS مخصص لشريط التقدم البنفسجي
const toastStyles = `
  .custom-toast-progress {
    background: #9c27b0 !important;
  }
`;

export default function Products() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = async (id) => {
    const token = sessionStorage.getItem("userToken");
    if (!token) {
      toast.error("Please login to add products to your cart.", {
        position: "top-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        icon: "⚠️",
        style: { background: "#fff", color: "#2a0845", fontWeight: "bold" },
        progressClassName: "custom-toast-progress",
      });
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/Carts/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Added to cart:", response.data);

      toast.success("Product added to cart.", {
        position: "top-right",
        autoClose: 2000,
        style: { background: "#fff", color: "#2a0845", fontWeight: "bold" },
        icon: "✅",
        progressClassName: "custom-toast-progress",
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart.", {
        position: "top-right",
        autoClose: 3000,
        style: { background: "#fff", color: "#2a0845", fontWeight: "bold" },
        icon: "❌",
        progressClassName: "custom-toast-progress",
      });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {/* Inject custom style for toast progress */}
      <style>{toastStyles}</style>

      <ToastContainer />
      <Box
        sx={{
          py: 6,
          px: { xs: 2, md: 6 },
        }}
      >
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Paper
                elevation={6}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  backgroundColor: "#fff",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                  },
                }}
              >
                <Card
                  sx={{
                    boxShadow: "none",
                    background: "transparent",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={
                      product.mainImg ||
                      "https://via.placeholder.com/300x180?text=No+Image"
                    }
                    alt={product.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" fontWeight="bold">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.description}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ mt: 1, color: "#6a1b9a", fontWeight: "bold" }}
                    >
                      ${product.price}
                    </Typography>
                    <Button
                      onClick={() => addToCart(product.id)}
                      variant="contained"
                      fullWidth
                      sx={{
                        mt: 2,
                        backgroundColor: "#9c27b0",
                        "&:hover": { backgroundColor: "#7b1fa2" },
                        borderRadius: "20px",
                        fontWeight: "bold",
                        textTransform: "none",
                      }}
                    >
                      Add To Cart
                    </Button>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      component={Link}
                      to={`/productDetails/${product.id}`}
                      sx={{
                        color: "#6a1b9a",
                        fontWeight: "bold",
                        textTransform: "none",
                        "&:hover": { textDecoration: "underline" },
                      }}
                    >
                      Details
                    </Button>
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
