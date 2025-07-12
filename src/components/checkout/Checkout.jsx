import React, { useState } from 'react';
import {
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Paper,
  Zoom
} from '@mui/material';
import { Button } from 'react-bootstrap';
import axios from 'axios';

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('Visa');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePay = async () => {
    const token = sessionStorage.getItem('userToken');
    try {
      const response = await axios.post(
        'https://mytshop.runasp.net/api/CheckOuts/Pay',
        { PaymentMethod: paymentMethod },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Payment success:', response.data);

      if (paymentMethod === 'Visa') {
        window.location.href = response.data.url;
      } else {
        console.log("Payment method is Cash");
      }
    } catch (err) {
      console.error('Payment failed:', err);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(to right, #2a0845, #ff8ec7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Poppins', sans-serif",
        p: 4,
      }}
    >
      <Zoom in>
        <Paper
          elevation={4}
          sx={{
            width: '100%',
            maxWidth: 500,
            p: 5,
            borderRadius: 5,
            background: 'rgba(255,255,255,0.95)',
            boxShadow: '0 10px 40px rgba(255, 150, 190, 0.3)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            mb={2}
            sx={{
              background: 'linear-gradient(to right, #ff4d6d, #ff8ec7)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            🧾 Checkout
          </Typography>

          <FormControl fullWidth>
            <Typography
              variant="h6"
              fontWeight="medium"
              color="#2a0845"
              mb={2}
              textAlign="left"
            >
              Select Payment Method:
            </Typography>

            <RadioGroup
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <FormControlLabel value="Visa" control={<Radio />} label="Visa" />
              <FormControlLabel value="Cash" control={<Radio />} label="Cash on Delivery" />
            </RadioGroup>
          </FormControl>

          <Button
            onClick={handlePay}
            variant="contained"
            size="lg"
            className="mt-4"
            style={{
              backgroundColor: '#ff4d6d',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              padding: '10px 0',
              width: '100%',
              color: 'white',
            }}
          >
            Confirm Payment
          </Button>
        </Paper>
      </Zoom>
    </Box>
  );
}
