import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axios";

// 🌸 تنسيقات ناعمة
const cardStyle = {
  background: "linear-gradient(to bottom right, #ffffff, #f9f8ff)",
  padding: "1.5rem",
  borderRadius: "16px",
  boxShadow: "0 6px 20px rgba(123, 97, 255, 0.1)",
  marginBottom: "1.5rem",
  transition: "0.3s",
  cursor: "pointer",
};

const selectedCardStyle = {
  background: "#eef2ff",
  border: "2px solid #7b61ff",
};

const listStyle = {
  flex: 1,
  listStyle: "none",
  padding: 0,
  margin: 0,
};

const detailsCardStyle = {
  ...cardStyle,
  flex: 1,
};

const buttonStyle = {
  backgroundColor: "#7b61ff",
  color: "white",
  padding: "0.6rem 1.3rem",
  borderRadius: "10px",
  border: "none",
  fontWeight: "bold",
  fontSize: "1rem",
  cursor: "pointer",
  marginTop: "1rem",
};

const closeButtonStyle = {
  ...buttonStyle,
  backgroundColor: "#ff6b6b",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem("userToken");
        const response = await axiosInstance.get("/Orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const fetchOrderDetails = async (id) => {
    try {
      const token = sessionStorage.getItem("userToken");
      const response = await axiosInstance.get(`/Orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedOrder(response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  return (
    <div>
      <h3 style={{ marginBottom: "1rem", fontSize: "1.8rem", color: "#4b0082" }}>
        📦 Order History
      </h3>

      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        <ul style={listStyle}>
          {orders.map((order) => (
            <li
              key={order.id}
              onClick={() => fetchOrderDetails(order.id)}
              style={{
                ...cardStyle,
                ...(selectedOrder?.id === order.id ? selectedCardStyle : {}),
              }}
            >
              <strong>Order #{order.id}</strong>
              <p>📅 {new Date(order.orderDate).toLocaleDateString()}</p>
              <p>⚙️ Status: {order.orderStatus}</p>
              <p>💳 Payment: {order.paymentMethodType}</p>
              <p>💰 Total: ${order.totalPrice}</p>
            </li>
          ))}
        </ul>

        {selectedOrder && (
          <div style={detailsCardStyle}>
            <h4 style={{ marginBottom: "1rem" }}>
              📝 Order #{selectedOrder.id} Details
            </h4>
            <p><strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {selectedOrder.orderStatus}</p>
            <p><strong>Payment Method:</strong> {selectedOrder.paymentMethodType}</p>
            <p>
              <strong>Shipped Date:</strong>{" "}
              {selectedOrder.shippedDate.startsWith("0001")
                ? "لم يتم الشحن بعد"
                : new Date(selectedOrder.shippedDate).toLocaleDateString()}
            </p>
            <p><strong>Total Price:</strong> ${selectedOrder.totalPrice}</p>
            <p><strong>Carrier:</strong> {selectedOrder.carrier || "غير متوفر"}</p>
            <p><strong>Tracking Number:</strong> {selectedOrder.trackingNumber || "غير متوفر"}</p>

            {selectedOrder.items && selectedOrder.items.length > 0 && (
              <>
                <h5 style={{ marginTop: "1.2rem" }}>🧾 Items:</h5>
                <ul>
                  {selectedOrder.items.map((item) => (
                    <li key={item.id}>
                      {item.productName || item.name || "اسم المنتج غير متوفر"} — Qty: {item.quantity || "N/A"} — Price: ${item.price || "N/A"}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <button onClick={() => setSelectedOrder(null)} style={closeButtonStyle}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
