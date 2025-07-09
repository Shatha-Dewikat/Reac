import { useEffect, useState } from "react";
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
import axiosInstance from './../../api/axios';
import axios from "axios";
import { useNavigate } from "react-router";

export default function Cart() {
  
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
const getProductFromCart = async () => {
  const token = sessionStorage.getItem("userToken");
  if (!token){
   navigate('/login')
  } 
else{
    const response = await axiosInstance.get(`Carts`, {
      headers: { Authorization: `Bearer ${token}` }
    });
console.log(response)
     setProducts(response.data.cartResponse);
    
  }
};



  useEffect(() => {
 getProductFromCart();
  }, []);

 const removeFromCart = async (id) => {
const token = sessionStorage.getItem("userToken");
  try {
    await axiosInstance.delete(`Carts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setProducts((prev) => prev.filter((item) => item.id !== id));
  } catch (err) {
    console.error("Remove failed:", err);
  }
};


  const increaseCount = async (id) => {
const token = sessionStorage.getItem("userToken");
    try {
      await axiosInstance.patch(`Carts/increaseCount/${id}`, {},{
         headers:{
      Authorization: `Bearer ${token}`
    }
  });
      setProducts((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, count: (item.count || 1) + 1 } : item
        )
      );
    } catch (err) {
      console.error("Increase failed:", err);
    }
  };

  const decreaseCount = async (id) => {
    const token = sessionStorage.getItem("userToken");
    const item = products.find((p) => p.id === id);
    if (!item || item.count <= 1) return;
    try {
      await axiosInstance.patch(`Carts/decreaseCount/${id}`, {},{
        headers:{
      Authorization: `Bearer ${token}`
    }
      });
      setProducts((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, count: p.count - 1 } : p
        )
      );
    } catch (err) {
      console.error("Decrease failed:", err);
    }
  };
const clearCart = async () => {
  const token = sessionStorage.getItem("userToken");
  try {
    await axiosInstance.delete("Carts/clearCart", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setProducts([]);
  } catch (err) {
    console.error("Clear cart failed:", err);
  }
};

  const total = products.reduce((sum, p) => sum + p.price * (p.count || 1), 0);

  if (!products.length) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(to right, #2a0845, #ff8ec7)",
          color: "#fff",
          fontFamily: "Quicksand, sans-serif",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          Your cart is empty 💔
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(to right, #2a0845, #ff8ec7)",
        minHeight: "100vh",
        py: 15,
        fontFamily: "Quicksand, sans-serif",
      }}
    >
      <Container>
        <Typography
          variant="h3"
          fontWeight="bold"
          mb={5}
          sx={{
            textAlign: "center",
            color: "white",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            background: "white",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: 900,
            filter: "drop-shadow(0 0 10px #ff8ec7)",
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
                    p: 1.5,
                    borderRadius: 5,
                    backgroundColor: "#fff",
                    boxShadow: "0 10px 40px rgba(255, 150, 190, 0.3)",
                    transition: "all 0.3s",
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
                      borderRadius: 3,
                      ml: 1,
                      border: "2px solid #ff8ec7",
                    }}
                  />
                  <CardContent sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight="bold" color="#2a0845">
                      {product.name}
                    </Typography>
                    <Typography color="#ff4d6d" fontWeight="bold">
                      {product.price}$
                    </Typography>
                  </CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", pr: 2 }}>
                    <IconButton onClick={() => decreaseCount(product.id)} sx={{ color: "#2a0845" }}>
                      <Remove />
                    </IconButton>
                    <Typography>{product.count || 1}</Typography>
                    <IconButton onClick={() => increaseCount(product.id)} sx={{ color: "#2a0845" }}>
                      <Add />
                    </IconButton>
                    <IconButton onClick={() => removeFromCart(product.id)} sx={{ color: "#e63946" }}>
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
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(14px)",
                border: "2px solid #ffb3d1",
                color: "#fff",
                boxShadow: "0 12px 40px rgba(0,0,0,0.3)",
              }}
            >
              <Typography variant="h5" fontWeight="bold" mb={2}>
                💡 Order Summary
              </Typography>
              <Divider sx={{ borderColor: "#ff8ec7", mb: 2 }} />
              <Typography mb={1}>🧾 Items: {products.length}</Typography>
              <Typography fontWeight="bold" mb={2}>
                💰 Total: {total.toFixed(2)}$
              </Typography>
              <Button
                fullWidth
                variant="contained"
                onClick={clearCart}
                sx={{
                  background: "#ff4d6d",
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: 5,
                  fontSize: "16px",
                  py: 1.5,
                  "&:hover": { background: "#ff1f4b" },
                }}
              >
                🧹 Clear Cart
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
