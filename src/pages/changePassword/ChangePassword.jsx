import React from "react";
import axiosInstance from "../../api/axios";

// 🎨 تنسيقات محسنة
const containerStyle = {
  background: "linear-gradient(to right, #fdfbfb, #f2f2ff)",
  padding: "2rem",
  borderRadius: "20px",
  boxShadow: "0 8px 20px rgba(123, 97, 255, 0.15)",
  maxWidth: "450px",
  margin: "auto",
};

const titleStyle = {
  fontSize: "1.7rem",
  color: "#4b0082",
  marginBottom: "1.2rem",
  fontWeight: "600",
};

const labelStyle = {
  display: "block",
  marginBottom: "0.3rem",
  fontWeight: "bold",
  color: "#555",
};

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  marginBottom: "1.3rem",
  borderRadius: "10px",
  border: "1px solid #d2d2f0",
  fontSize: "1rem",
  outlineColor: "#b9a8ff",
  backgroundColor: "#f9f8ff",
};

const buttonStyle = {
  backgroundColor: "#7b61ff",
  color: "white",
  padding: "0.75rem 1.5rem",
  borderRadius: "10px",
  border: "none",
  fontWeight: "bold",
  fontSize: "1.05rem",
  cursor: "pointer",
  transition: "background-color 0.3s",
};

const buttonHoverStyle = {
  backgroundColor: "#684dfd",
};

export default function ChangePassword() {
  const [hovered, setHovered] = React.useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const current = e.target.current.value;
    const newPass = e.target.new.value;
    const confirm = e.target.confirm.value;

    if (newPass !== confirm) {
      alert("🚫 New passwords do not match!");
      return;
    }

    const token = sessionStorage.getItem("userToken");

    try {
      const response = await axiosInstance.patch(
        "/Account/ChangePassword",
        {
          OldPassword: current,
          NewPassword: newPass,
          ConfirmNewPassword: confirm,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Password updated successfully!");
      e.target.reset();
    } catch (error) {
      console.error("❌ Error updating password:", error);
      const msg =
        error.response?.data?.message ||
        "Failed to update password. Please check your current password.";
      alert("⚠️ " + msg);
    }
  };

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>🔐 Change Password</h3>
      <form onSubmit={handleChangePassword}>
        <label style={labelStyle}>Current Password:</label>
        <input type="password" name="current" required style={inputStyle} />

        <label style={labelStyle}>New Password:</label>
        <input type="password" name="new" required minLength={6} style={inputStyle} />

        <label style={labelStyle}>Confirm Password:</label>
        <input type="password" name="confirm" required minLength={6} style={inputStyle} />

        <button
          type="submit"
          style={hovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          Update
        </button>
      </form>
    </div>
  );
}
