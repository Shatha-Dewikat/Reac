import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axios";

import Info from './../info/Info';
import ChangePassword from './../changePassword/ChangePassword';
import Orders from './../orders/Orders';

export default function Profile() {
  const [activeTab, setActiveTab] = useState("info");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem("userToken");
        const response = await axiosInstance.get("/Account/userinfo", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div style={layoutStyle}>
      <aside style={sidebarStyle}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <div style={avatarStyle}>
  <span style={avatarLetterStyle}>
    {userData?.firstName?.charAt(0)?.toUpperCase() || "U"}
  </span>
</div>

          <h3 style={{ marginTop: "1rem", fontWeight: "bold" }}>
            {userData?.firstName || "User"}
          </h3>
        </div>
{[
  { key: "info", label: "My Info" },
  { key: "changepassword", label: "Password" },
  { key: "orders", label: "Orders" },
].map(({ key, label }) => (
  <button
    key={key}
    onClick={() => setActiveTab(key)}
    style={{
      ...tabButtonStyle,
      backgroundColor: activeTab === key ? "#f5f3ff" : "transparent",
      color: activeTab === key ? "#2d0e61" : "#fff",
      boxShadow: activeTab === key ? "0 0 10px rgba(255,255,255,0.3)" : "none",
      fontSize: "1.2rem", // حجم الخط أكبر
      letterSpacing: "0.5px",
    }}
  >
    {label}
  </button>
))}

      </aside>

      <main style={mainContentStyle}>
        {activeTab === "info" && <Info userData={userData} />}
        {activeTab === "changepassword" && <ChangePassword />}
        {activeTab === "orders" && <Orders />}
      </main>
    </div>
  );
}

// ✅ التنسيقات
const layoutStyle = {
  display: "flex",
  minHeight: "90vh",
  fontFamily: "'Cairo', sans-serif",
  background: "linear-gradient(135deg, #ffb3d1, #caa0f8)",
  color: "#333",
};

const sidebarStyle = {
  width: "260px",
  background: "linear-gradient(135deg, #ffb3d1, #caa0f8)",
  color: "white",
  padding: "2rem 1rem",
  borderRadius: "0 16px 16px 0",
  boxShadow: "4px 0 10px rgba(0,0,0,0.1)",
};

const mainContentStyle = {
  flex: 1,
  padding: "2rem",
  background: "#f5f3ff",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
};

const avatarStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  backgroundColor: "#ffb3d1",
  color: "#2d0e61",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2.5rem",
  fontWeight: "bold",
  margin: "0 auto",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};
const avatarLetterStyle = {
  userSelect: "none",
};


const tabButtonStyle = {
  border: "none",
  width: "100%",
  textAlign: "left",
  padding: "0.8rem 1rem",
  borderRadius: "10px",
  fontWeight: "bold",
  marginBottom: "0.5rem",
  fontSize: "1rem",
  cursor: "pointer",
  transition: "0.3s",
};
