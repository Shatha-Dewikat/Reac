import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../../api/axios";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Container,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@mui/material";

export default function ProductsByCategory() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await axiosInstance.get(`/categories/${id}/products`);
      setProducts(response.data);
      
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [id]);
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #2a0845, #ff8ec7)",
        py: 8,
        color: "#fff",
        fontFamily: "Roboto, sans-serif",
      }}
    >
     <Container>
  <Typography
    variant="h4"
    sx={{
      mb: 6,
      color: "#ffffff",
      fontWeight: "bold",
      textAlign: "center",
      letterSpacing: 1,
    }}
  >
    Products in This Category
  </Typography>

  {products.length === 0 ? (
    <Typography
      variant="h6"
      sx={{ color: "#fff", textAlign: "center", mt: 4 }}
    >
There are currently no products in this section
    </Typography>
  ) : (
    <Slider {...settings}>
      {products.map((product) => {
        const imageUrl = `https://mytshop.runasp.net/images/products/products -${product.name}/${product.mainImg}`.replace(/ /g, "%20");
        return (
          <Box key={product.id} px={2}>
            <Card
              sx={{
                height: "100%",
                backgroundColor: "#f9f9f9",
                borderRadius: 4,
                boxShadow: "0 6px 18px rgba(0,0,0,0.15)",
                overflow: "hidden",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-10px)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={imageUrl}
                alt={product.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ px: 3, py: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "#2a0845", fontWeight: 600 }}
                >
                  {product.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", mt: 1, height: 40, overflow: "hidden" }}
                >
                  {product.description}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    mt: 2,
                    fontWeight: "bold",
                    color: "#e91e63",
                  }}
                >
                  Price: ${product.price}
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
              </CardContent>
            </Card>
          </Box>
        );
      })}
    </Slider>
  )}
</Container>

    </Box>
  );
}
