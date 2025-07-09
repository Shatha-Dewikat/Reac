import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { TextField, InputAdornment } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import styles from "./Password.module.css";
import "@fontsource/quicksand";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import axiosInstance from "../../api/axios";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // ✅ صححنا الاستيراد
import { useLocation } from "react-router-dom";


export default function Password() {
 const { register, handleSubmit } = useForm();
  const location = useLocation();
  const navigate = useNavigate();

  // البيانات من الصفحة السابقة
  const email = location.state?.email || "";
  const code = location.state?.code || "";

  const registerUser = async (values) => {
    const dataToSend = {
      email: email,
      code: code,
      password: values.password,
      confirmPassword: values.confirmPassword
    };

      try {
    const res = await axiosInstance.patch("/Account/SendCode", dataToSend);

    console.log("Password reset successful!", res.data);
    navigate("/login");
  } catch (error) {
    console.error("Error:", error.response?.data || error);
    alert("Something went wrong. Please try again.");
  }
  };

 

  const whiteFieldStyles = {
    "& .MuiOutlinedInput-root": {
      color: "white",
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
    "& .MuiInputAdornment-root svg": {
      color: "white",
    },
    "& input": {
      color: "white",
    },
    "& .MuiInputLabel-root": {
      color: "white",
    },
  };

  return (
    <div className={styles.pageBackground}>
      <Container
        fluid
        style={{
          marginTop: 80,
          marginBottom: 80,
          padding: 0,
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 4px 25px rgba(0, 0, 0, 0.3)",
          backgroundColor: "#fff",
        }}
      >
        <Row className="g-0" style={{ minHeight: "100vh" }}>
          <Col
            md={7}
            className="p-0"
            style={{
              position: "relative",
              backgroundImage: "url(/images/Ecom.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "100vh",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.4)",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "30px",
                  marginTop: "20px",
                }}
              >
                <FontAwesomeIcon icon={faLeaf} style={{ fontSize: "60px", color: "white" }} />
                <p
                  style={{
                    color: "white",
                    fontSize: "26px",
                    margin: 0,
                    marginLeft: "30px",
                    marginTop: "20px",
                  }}
                >
                  E-commerce
                </p>
              </div>

              <p className={styles.myText}>
                Your favorites are waiting. Don’t keep them too long.
              </p>
            </div>

            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "30px",
                zIndex: 2,
              }}
            >
              <Link to="/" className={styles.navLink}>
                Home
              </Link>
              <Link to="/about" className={styles.navLink}>
                About
              </Link>
              <Link to="/contact" className={styles.navLink}>
                Contact
              </Link>
            </div>
          </Col>

          <Col
            md={5}
            className="p-0 d-flex align-items-center justify-content-center"
            style={{ backgroundColor: "#2c1f45" }}
          >
            <div style={{ width: "80%", maxWidth: "500px", zIndex: 2 }}>
              <h3 className="mb-4" style={{ color: "white", marginTop: "30px" }}>
                Password Recovery
              </h3>
              <address className="mb-5" style={{ color: "#8f959f" }}>
                Step 3
              </address>

              <Form onSubmit={handleSubmit(registerUser)}>
               <Form.Group className="mb-3">
                                 <TextField
                                   {...register("password", { required: true })}
                                   placeholder="Password"
                                   type="password"
                                   variant="outlined"
                                   fullWidth
                                   sx={whiteFieldStyles}
                                 />
                               </Form.Group>
               
                               <Form.Group className="mb-3">
                                 <TextField
                                   {...register("confirmPassword", { required: true })}
                                   placeholder="Confirm Password"
                                   type="password"
                                   variant="outlined"
                                   fullWidth
                                   sx={whiteFieldStyles}
                                 />
                               </Form.Group>

                <Button
                  type="submit"
                  className="w-100"
                  style={{
                    backgroundColor: "#6f0e61",
                    border: "none",
                    color: "white",
                    fontWeight: "bold",
                    boxShadow: "0 0 0px transparent",
                    transition: "all 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = "0 0 15px #a11970";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = "0 0 0px transparent";
                  }}
                >
                Save Password
                </Button>

                <address style={{ color: "#ccc", marginTop: "20px" }}>
                  Or continue with your social profile:
                </address>

                <div className="d-flex justify-content-between mb-4">
                  <Button className={`${styles.socialBtn} ${styles.facebook}`}>
                    <i className="fab fa-facebook-f me-2"></i> Facebook
                  </Button>
                  <Button className={`${styles.socialBtn} ${styles.google}`} style={{ marginLeft: "10px" }}>
                    <i className="fab fa-google me-2"></i> Google
                  </Button>
                </div>

                <p style={{ color: "#fff", textAlign: "left" }}>
                  I need an account!{" "}
                  <Link to="/register" style={{ color: "#4a5ef5", textDecoration: "none" }}>
                    Signup
                  </Link>
                </p>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
