import { useEffect, useState } from "react";
import { Box, Grid, Typography, Tooltip } from "@mui/material";
import axiosInstance from "../../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTshirt,
  faLaptop,
  faMobileAlt,
  faUtensils,
  faBook,
  faHeart,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function Category() {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  // دالة ترجع أيقونة حسب اسم التصنيف
  const getCategoryIcon = (name) => {
    const lowered = name.toLowerCase();
    if (lowered.includes("clothing") || lowered.includes("clothes"))
      return faTshirt;
    if (lowered.includes("laptop") || lowered.includes("electronics"))
      return faLaptop;
    if (lowered.includes("phone") || lowered.includes("mobile"))
      return faMobileAlt;
    if (lowered.includes("food") || lowered.includes("kitchen"))
      return faUtensils;
    if (lowered.includes("book")) return faBook;
    if (lowered.includes("health")) return faHeart;
    return faQuestionCircle;
  };

  return (
    <Grid container spacing={3}>
      {categories.map((category) => (
        <Grid item xs={6} sm={4} md={3} key={category.id}>
          <Tooltip title={category.name}>
            <Box
              sx={{
                borderRadius: 4,
                py: 4,
                px: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <FontAwesomeIcon
                icon={getCategoryIcon(category.name)}
                style={{ fontSize: 40, color: "#ffb3d1", marginBottom: 12 }}
              />

              <Typography
                variant="subtitle1"
                sx={{
                  color: "white",
                  fontWeight: 600,
                  fontSize: "16px",
                  textAlign: "center",
                  fontFamily: "'Quicksand', sans-serif",
                }}
              >
                {category.name}
              </Typography>
            </Box>
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
}
