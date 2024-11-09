import { useState } from "react";
import { TextField, Button, Alert, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Home() {
  const [couponCode, SetCouponCode] = useState("");
  const [error, SetError] = useState("");
  const [cartTotal] = useState(100); // Fixed cart total value (100 shekels)

  const navigate = useNavigate();

  const handleChange = (e) => {
    SetCouponCode(e.target.value);
  };

  const handleSubmit = () => {
    const couponRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!couponRegex.test(couponCode)) {
      SetError(
        "Coupon code must be at least 8 characters long and include letters, numbers, and special characters"
      );
      return;
    }
    SetError("");
    console.log("coupon code submitted", couponCode);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handlePriceCalculation = () => {
    // For now, just log the cart total. You can replace this logic with actual price calculations.
    console.log("Cart total: 100 Shekels");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        width: 300,
        mx: "auto",
        mt: 4,
      }}
    >
      {/* Coupon Code Input */}
      <TextField
        label="Enter Coupon Code"
        variant="outlined"
        fullWidth
        value={couponCode}
        onChange={handleChange}
        error={!!error}
        helperText={error}
      />

      {/* Apply Coupon Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
      >
        Apply
      </Button>

      {/* Cart Input (Fixed Value) */}
      <TextField
        label="Shopping Cart Total"
        variant="outlined"
        fullWidth
        value={`${cartTotal} ₪`} // Display 100 shekels
        disabled
      />

      {/* Calculate Price Button */}
      <Button
        variant="contained"
        color="secondary"
        onClick={handlePriceCalculation}
        fullWidth
        sx={{ mt: 2 }}
      >
        Calculate Price
      </Button>

      {/* Login Button */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleLoginClick}
        fullWidth
        sx={{ mt: 2 }}
      >
        Login
      </Button>

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}

export default Home;
