import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // بعد 3 ثواني رجع للـ home
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: 50 }}>
      <h2>تم الدفع بنجاح! 🔥</h2>
      <p>سيتم تحويلك إلى الصفحة الرئيسية قريباً...</p>
    </div>
  );
}
