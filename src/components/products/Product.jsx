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
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import axiosInstance from "../../api/axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const toastStyles = `
  .custom-toast-progress {
    background: #9c27b0 !important;
  }
`;

export default function Product() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 2;
  const [sortBy, setSortBy] = useState("");

  const getProducts = async () => {
    try {
      const response = await axiosInstance.get("/products");
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setCurrentPage(1);
  };

  const sortedProducts = [...products];
  if (sortBy === "nameAsc") {
    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "nameDesc") {
    sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortBy === "priceAsc") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "priceDesc") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

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

  return (
    <>
      <style>{toastStyles}</style>
      <ToastContainer />
      <Box
        sx={{
          py: 6,
          px: { xs: 2, md: 6 },
          background: "linear-gradient(to right, #2a0845, #ff8ec7)",
          minHeight: "100vh",
        }}
      >
        {/* Sorting dropdown */}
        <Box
          sx={{
            mb: 4,
            maxWidth: 280,
            mx: "auto",
            backgroundColor: "#fff",
            borderRadius: 2,
            boxShadow: "0 4px 15px rgba(156, 39, 176, 0.3)",
            p: 1.5,
          }}
        >
          <FormControl fullWidth size="small">
            <InputLabel id="sort-label" sx={{ color: "#6a1b9a", fontWeight: "bold" }}>
              Sort By
            </InputLabel>
            <Select
              labelId="sort-label"
              value={sortBy}
              label="Sort By"
              onChange={handleSortChange}
              sx={{
                borderRadius: 2,
                color: "#4a148c",
                fontWeight: "bold",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#9c27b0",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#7b1fa2",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#6a1b9a",
                },
              }}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="nameAsc">Name (A-Z)</MenuItem>
              <MenuItem value="nameDesc">Name (Z-A)</MenuItem>
              <MenuItem value="priceAsc">Price (Low to High)</MenuItem>
              <MenuItem value="priceDesc">Price (High to Low)</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={4}>
          {currentProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Paper
                elevation={8}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  backgroundColor: "#fff",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px)",
                    boxShadow: "0 12px 40px rgba(156, 39, 176, 0.4)",
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
                    sx={{ borderRadius: 2 }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" fontWeight="bold" color="#4a148c">
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ minHeight: 60 }}>
                      {product.description}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ mt: 1, color: "#9c27b0", fontWeight: "bold" }}
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
                        boxShadow: "0 3px 10px rgba(156, 39, 176, 0.4)",
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

        {/* Pagination Buttons as arrows */}
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          alignItems="center"
          sx={{ mt: 5 }}
        >
          <IconButton
            aria-label="previous page"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            sx={{
              backgroundColor: currentPage === 1 ? "#ccc" : "#9c27b0",
              color: currentPage === 1 ? "#666" : "#fff",
              "&:hover": {
                backgroundColor: currentPage === 1 ? "#ccc" : "#7b1fa2",
              },
              boxShadow:
                currentPage === 1
                  ? "none"
                  : "0 4px 15px rgba(156, 39, 176, 0.5)",
              borderRadius: "50%",
              p: 1.5,
              transition: "all 0.3s ease",
            }}
          >
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>

          <Typography
            variant="subtitle1"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              minWidth: 110,
              textAlign: "center",
            }}
          >
            Page {currentPage} of {totalPages}
          </Typography>

          <IconButton
            aria-label="next page"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            sx={{
              backgroundColor: currentPage === totalPages ? "#ccc" : "#9c27b0",
              color: currentPage === totalPages ? "#666" : "#fff",
              "&:hover": {
                backgroundColor: currentPage === totalPages ? "#ccc" : "#7b1fa2",
              },
              boxShadow:
                currentPage === totalPages
                  ? "none"
                  : "0 4px 15px rgba(156, 39, 176, 0.5)",
              borderRadius: "50%",
              p: 1.5,
              transition: "all 0.3s ease",
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
    </>
  );
}
