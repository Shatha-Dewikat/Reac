import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Divider,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://mytshop.runasp.net/api/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        setError("An error occurred while loading the product data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress sx={{ color: "#ffb3d1" }} />
      </Box>
    );

  if (error) return <Typography color="error">{error}</Typography>;
  if (!product) return <Typography>No product found.</Typography>;

const imageUrl = `https://mytshop.runasp.net/images/products/products -${product.name}/${product.mainImg}`.replace(/ /g, "%20");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        py: 8,
        px: 2,
        fontFamily: "'Quicksand', sans-serif",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          maxWidth: 850,
          width: "100%",
          p: 5,
          borderRadius: 6,
          backgroundColor: "#fff0f6",
          boxShadow: "0 15px 40px rgba(255, 182, 193, 0.4)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <FontAwesomeIcon
            icon={faLeaf}
            style={{ fontSize: "34px", color: "#ffb3d1", marginRight: 10 }}
          />
          <Typography
            variant="h3"
            sx={{
              fontWeight: "800",
              letterSpacing: 1,
              color: "#c2185b",
              textShadow: "1px 1px #f8bbd0",
            }}
          >
            {product.name}
          </Typography>
        </Box>

        <Box
          component="img"
          src={imageUrl}
          alt={product.name}
          sx={{
            width: "100%",
            borderRadius: 4,
            mb: 4,
            objectFit: "cover",
            maxHeight: 420,
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          }}
        />

        <Typography
          variant="body1"
          sx={{ fontSize: 18, color: "#6a1b9a", mb: 2 }}
        >
          <strong>Description:</strong> {product.description}
        </Typography>

        <Divider sx={{ my: 3, borderColor: "#ec407a" }} />

        <Typography sx={{ fontSize: 20, mb: 2 }}>
          <strong>Price:</strong>{" "}
          <span style={{ color: "#e91e63", fontWeight: "700" }}>
            ${product.price}
          </span>
          {product.discount > 0 && (
            <span
              style={{
                color: "#d81b60",
                marginLeft: 12,
                fontWeight: "700",
                backgroundColor: "#fce4ec",
                padding: "4px 10px",
                borderRadius: 14,
                fontSize: 16,
              }}
            >
              Discount {product.discount}%
            </span>
          )}
        </Typography>

        <Typography sx={{ fontSize: 18, mb: 2 }}>
          <strong>Available Quantity:</strong>{" "}
          <span style={{ color: "#8e24aa" }}>{product.quantity}</span>
        </Typography>

        <Typography sx={{ fontSize: 18, mb: 2 }}>
          <strong>Rating:</strong>{" "}
          <span
            style={{
              color: "#388e3c",
              fontWeight: "700",
              backgroundColor: "#e8f5e9",
              padding: "4px 10px",
              borderRadius: 14,
            }}
          >
            {product.rate} / 5
          </span>
        </Typography>

        <Typography sx={{ fontSize: 18 }}>
          <strong>Status:</strong>{" "}
          {product.status ? (
            <span
              style={{
                color: "#43a047",
                backgroundColor: "#e0f2f1",
                fontWeight: "700",
                padding: "4px 12px",
                borderRadius: 16,
              }}
            >
              Available
            </span>
          ) : (
            <span
              style={{
                color: "#e53935",
                backgroundColor: "#ffebee",
                fontWeight: "700",
                padding: "4px 12px",
                borderRadius: 16,
              }}
            >
              Not Available
            </span>
          )}
        </Typography>
      </Paper>
    </Box>
  );
}
