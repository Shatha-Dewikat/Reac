import React from "react";

// تنسيق التاريخ
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const containerStyle = {
  background: "linear-gradient(to right, #fdfbfb, #ebedee)",
  padding: "2rem",
  borderRadius: "20px",
  boxShadow: "0 8px 20px rgba(123, 97, 255, 0.15)",
  maxWidth: "700px",
  margin: "auto",
};

const titleStyle = {
  fontSize: "1.8rem",
  color: "#4b0082",
  marginBottom: "1rem",
  fontWeight: "600",
};

const infoListStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  fontSize: "1.15rem",
  lineHeight: "2.2",
};

const listItemStyle = {
  padding: "0.3rem 0",
  borderBottom: "1px dashed #ccc",
};

const labelStyle = {
  fontWeight: "bold",
  color: "#333",
};

export default function Info({ userData }) {
  if (!userData) return <p>Loading user info...</p>;

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>📄 Account Information</h3>
      <ul style={infoListStyle}>
        <li style={listItemStyle}>
          <span style={labelStyle}>Full Name:</span> {userData.firstName} {userData.lastName}
        </li>
        <li style={listItemStyle}>
          <span style={labelStyle}>Username:</span> {userData.userName}
        </li>
        <li style={listItemStyle}>
          <span style={labelStyle}>Email:</span> {userData.email}
        </li>
        <li style={listItemStyle}>
          <span style={labelStyle}>Gender:</span> {userData.gender}
        </li>
        <li style={listItemStyle}>
          <span style={labelStyle}>Birth Date:</span> {formatDate(userData.birthOfDate)}
        </li>
      </ul>
    </div>
  );
}
