import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Divider,
  TextField,
  Button,
  Rating,
  Stack,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../api/axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [reviewRate, setReviewRate] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [addingReview, setAddingReview] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://mytshop.runasp.net/api/products/${id}`
        );
        setProduct(response.data);
        if (response.data.images && response.data.images.length > 0) {
          setMainImage(response.data.images[0]);
        } else {
          setMainImage(
            `https://mytshop.runasp.net/images/products/products -${response.data.name}/${response.data.mainImg}`.replace(
              / /g,
              "%20"
            )
          );
        }
      } catch (err) {
        setError("An error occurred while loading the product data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
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
  async function handleAddReview() {
    setAddingReview(true);

    const token = sessionStorage.getItem("userToken");
    if (!token) {
      toast.error("You must be logged in to add a review.");
      setAddingReview(false);
      return;
    }

    try {
      await axios.post(
        `https://mytshop.runasp.net/api/products/${id}/Reviews/Create`,
        {
          Rate: reviewRate,
          Comment: reviewComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Review added successfully!");
      setReviewRate(0);
      setReviewComment("");
    } catch (err) {
      // حاول تجيب رسالة الخطأ من السيرفر
      const msg =
        err.response?.data?.message || "Failed to add review.";
      toast.error(msg);
      console.error(err);
    } finally {
      setAddingReview(false);
    }
  }

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
        <CircularProgress sx={{ color: "#ffb3d1" }} />
      </Box>
    );

  if (error) return <Typography color="error">{error}</Typography>;
  if (!product) return <Typography>No product found.</Typography>;

  const images = product.images
    ? product.images.map((img) =>
        `https://mytshop.runasp.net/images/products/products -${product.name}/${img}`.replace(/ /g, "%20")
      )
    : [
        `https://mytshop.runasp.net/images/products/products -${product.name}/${product.mainImg}`.replace(
          / /g,
          "%20"
        ),
      ];

  const renderStars = (rate) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Box
          key={i}
          component="span"
          sx={{
            color: i <= rate ? "#ffb400" : "#ccc",
            fontSize: "22px",
            marginRight: 0.3,
          }}
        >
          ★
        </Box>
      );
    }
    return stars;
  };


  return (
    <>
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
          {/* ... نفس المحتوى بدون تغيير ... */}

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
            src={mainImage}
            alt={product.name}
            sx={{
              width: "100%",
              borderRadius: 4,
              mb: 4,
              objectFit: "cover",
              maxHeight: 420,
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              cursor: "pointer",
            }}
          />

          <Stack direction="row" spacing={1} sx={{ mb: 4 }}>
            {images.map((img, idx) => (
              <Box
                key={idx}
                component="img"
                src={img}
                alt={`Thumbnail ${idx + 1}`}
                onClick={() => setMainImage(img)}
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  objectFit: "cover",
                  cursor: "pointer",
                  border: img === mainImage ? "3px solid #ffb3d1" : "2px solid #ddd",
                  boxShadow: img === mainImage ? "0 0 10px #ffb3d1" : "none",
                }}
              />
            ))}
          </Stack>

          <Typography
            component="div"
            variant="body1"
            sx={{ fontSize: 18, color: "#6a1b9a", mb: 2 }}
          >
            <strong>Description:</strong> {product.description}
          </Typography>

<Button
            onClick={() => addToCart(product.id)}
            variant="contained"
            sx={{
              mb: 3,
              backgroundColor: "#9c27b0",
              "&:hover": { backgroundColor: "#7b1fa2" },
              borderRadius: "20px",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Add To Cart
          </Button>

          <Divider sx={{ my: 3, borderColor: "#ec407a" }} />

          <Typography component="div" sx={{ fontSize: 20, mb: 2 }}>
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

          <Typography component="div" sx={{ fontSize: 18, mb: 2 }}>
            <strong>Available Quantity:</strong>{" "}
            <span style={{ color: "#8e24aa" }}>{product.quantity}</span>
          </Typography>

          <Typography
            component="div"
            sx={{ fontSize: 18, mb: 2, display: "flex", alignItems: "center" }}
          >
            <strong>Rating:</strong>{" "}
            <Box sx={{ ml: 1 }}>{renderStars(Math.round(product.rate))}</Box>
            <Box
              sx={{
                color: "#388e3c",
                fontWeight: "700",
                backgroundColor: "#e8f5e9",
                padding: "4px 10px",
                borderRadius: 14,
                ml: 1,
                fontSize: 18,
              }}
            >
              {product.rate.toFixed(1)} / 5
            </Box>
          </Typography>

          <Typography component="div" sx={{ fontSize: 18, mb: 2 }}>
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

          <Divider sx={{ my: 3, borderColor: "#ec407a" }} />

          {/* Add Review Form */}
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Add a Review
            </Typography>

            <Rating
              name="review-rate"
              value={reviewRate}
              onChange={(event, newValue) => {
                setReviewRate(newValue);
              }}
            />

            <TextField
              label="Comment"
              multiline
              rows={3}
              fullWidth
              sx={{ mt: 2, mb: 2 }}
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
            />

            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddReview}
              disabled={addingReview || reviewRate === 0 || reviewComment.trim() === ""}
            >
              {addingReview ? "Submitting..." : "Submit Review"}
            </Button>

            
          </Box>
        </Paper>
      </Box>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
