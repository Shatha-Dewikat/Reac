import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Button,
  Paper,
  Divider,
  Zoom,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export default function Cart() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
  };

  const token = sessionStorage.getItem("userToken");

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      if (!token) {
        toast.error("Please login first to view your cart.", toastOptions);
        navigate("/login");
        return [];
      }
      const res = await axiosInstance.get("Carts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.cartResponse;
    },
    enabled: !!token,
    retry: false,
  });

  const removeMutation = useMutation({
    mutationFn: (id) =>
      axiosInstance.delete(`Carts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: (_, id) => {
      toast.success("Product removed from cart.", toastOptions);
      queryClient.setQueryData(["cart"], (old) =>
        old.filter((item) => item.id !== id)
      );
    },
    onError: () => {
      toast.error("Failed to remove product.", toastOptions);
    },
  });

  const increaseMutation = useMutation({
    mutationFn: (id) =>
      axiosInstance.patch(
        `Carts/increaseCount/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      ),
    onSuccess: (_, id) => {
      toast.info("Increased product quantity.", toastOptions);
      queryClient.setQueryData(["cart"], (old) =>
        old.map((item) =>
          item.id === id ? { ...item, count: (item.count || 1) + 1 } : item
        )
      );
    },
    onError: () => {
      toast.error("Failed to increase quantity.", toastOptions);
    },
  });

  const decreaseMutation = useMutation({
    mutationFn: (id) =>
      axiosInstance.patch(
        `Carts/decreaseCount/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      ),
    onSuccess: (_, id) => {
      toast.info("Decreased product quantity.", toastOptions);
      queryClient.setQueryData(["cart"], (old) =>
        old.map((item) =>
          item.id === id
            ? { ...item, count: item.count > 1 ? item.count - 1 : 1 }
            : item
        )
      );
    },
    onError: () => {
      toast.error("Failed to decrease quantity.", toastOptions);
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: () =>
      axiosInstance.delete("Carts/clearCart", {
        headers: { Authorization: `Bearer ${token}` },
      }),
    onSuccess: () => {
      toast.success("Cart cleared.", toastOptions);
      queryClient.setQueryData(["cart"], []);
    },
    onError: () => {
      toast.error("Failed to clear cart.", toastOptions);
    },
  });

  const total = products.reduce(
    (sum, p) => sum + p.price * (p.count || 1),
    0
  );

  if (isLoading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to right, #2a0845, #ff8ec7)",
          color: "#fff",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        Loading...
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(to right, #2a0845, #ff8ec7)",
          color: "#fff",
          fontSize: "1.5rem",
          fontWeight: "bold",
          px: 2,
          textAlign: "center",
        }}
      >
        Failed to load cart. Please refresh or login again.
      </Box>
    );
  }

  if (!products.length) {
    return (
      <>
        <style>{`
          .Toastify__progress-bar {
            background: #ff4d6d !important;
          }
        `}</style>

        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "linear-gradient(to right, #2a0845, #ff8ec7)",
            color: "#fff",
            fontFamily: "'Poppins', sans-serif",
            flexDirection: "column",
            px: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Your cart is empty 💔
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/")}
            sx={{ fontWeight: "bold" }}
          >
            Go Shopping
          </Button>

          <ToastContainer />
        </Box>
      </>
    );
  }

  return (
    <>
      <style>{`
        .Toastify__progress-bar {
          background: #ff4d6d !important;
        }
      `}</style>

      <Box
        sx={{
          background: "linear-gradient(to right, #2a0845, #ff8ec7)",
          minHeight: "100vh",
          py: 15,
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <ToastContainer />

        <Container>
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              color: "white",
              mb: 5,
              fontWeight: 800,
              letterSpacing: "2px",
              background: "white",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 8px #ff8ec7)",
            }}
          >
            ✨ Your Cart ✨
          </Typography>

          <Grid container spacing={4}>
            {/* Cart Items */}
            <Grid item xs={12} md={8}>
              {products.map((product) => (
                <Zoom key={product.id} in>
                  <Card
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 3,
                      p: 2,
                      borderRadius: 4,
                      backgroundColor: "#fff",
                      boxShadow: "0 8px 30px rgba(255, 150, 190, 0.3)",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "scale(1.02)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={product.imageUrl || "https://placehold.co/100"}
                      alt={product.name}
                      sx={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: 2,
                        ml: 1,
                        border: "2px solid #ff8ec7",
                      }}
                    />
                    <CardContent sx={{ flex: 1 }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="#2a0845"
                      >
                        {product.name}
                      </Typography>
                      <Typography color="#ff4d6d" fontWeight="bold">
                        {product.price}$
                      </Typography>
                    </CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", pr: 2 }}>
                      <IconButton
                        onClick={() => decreaseMutation.mutate(product.id)}
                        sx={{ color: "#2a0845" }}
                      >
                        <Remove />
                      </IconButton>
                      <Typography>{product.count || 1}</Typography>
                      <IconButton
                        onClick={() => increaseMutation.mutate(product.id)}
                        sx={{ color: "#2a0845" }}
                      >
                        <Add />
                      </IconButton>
                      <IconButton
                        onClick={() => removeMutation.mutate(product.id)}
                        sx={{ color: "#e63946" }}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Card>
                </Zoom>
              ))}
            </Grid>

            {/* Summary */}
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 4,
                  borderRadius: 5,
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(12px)",
                  border: "2px solid #ffb3d1",
                  color: "#fff",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
                }}
              >
                <Typography variant="h5" fontWeight="bold" mb={2}>
                  💡 Order Summary
                </Typography>
                <Divider sx={{ borderColor: "#ff8ec7", mb: 2 }} />
                <Typography mb={1}>🧾 Items: {products.length}</Typography>
                <Typography fontWeight="bold" mb={3}>
                  💰 Total: {total.toFixed(2)}$
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => clearCartMutation.mutate()}
                  sx={{
                    mb: 2,
                    background: "#ff4d6d",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: 4,
                    fontSize: "16px",
                    py: 1.5,
                    "&:hover": { background: "#ff1f4b" },
                  }}
                >
                  🧹 Clear Cart
                </Button>

                <Button
                  fullWidth
                  variant="contained"
                  component={Link}
                  to="/checkout"
                  sx={{
                    background: "#4caf50",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: 4,
                    fontSize: "16px",
                    py: 1.5,
                    "&:hover": { background: "#43a047" },
                  }}
                >
                  ✅ Process to Checkout
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
