import { useState } from "react";
import { TextField, Button, Alert, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MockApiService from "../../../Services/MockApiService";
import couponWebApiService from "../../../Services/CouponsWebApiService";

function Home() {
  const [couponCode, SetCouponCode] = useState("");
  const [error, SetError] = useState("");
  const [cartTotal, setCartTotal] = useState(100); // Fixed cart total value (100 shekels)
  const [foundCoupon, setFoundCoupon] = useState(null); // State to store found coupon

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
    console.log("Coupon code submitted:", couponCode);

    // Find the coupon by code
    const coupon = couponWebApiService
      .getCoupons()
      .find((c) => c.couponCode === couponCode);

    if (coupon) {
      setFoundCoupon(coupon);
    } else {
      SetError("Coupon not found");
    }
  };

  const handlePriceCalculation = () => {
    if (!foundCoupon) {
      SetError(
        "Please apply a valid coupon code before calculating the price."
      );
      return;
    }

    if (foundCoupon.isPrecentage) {
      setCartTotal(cartTotal * (1 - foundCoupon.value / 100));
    } else {
      setCartTotal(cartTotal - foundCoupon.value);
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
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
      <TextField
        label="Enter Coupon Code"
        variant="outlined"
        fullWidth
        value={couponCode}
        onChange={handleChange}
        error={!!error}
        helperText={error}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        fullWidth
      >
        Apply
      </Button>

      <TextField
        label="Shopping Cart Total"
        variant="outlined"
        fullWidth
        value={`${cartTotal} ₪`}
        disabled
      />

      <Button
        variant="contained"
        color="secondary"
        onClick={handlePriceCalculation}
        fullWidth
        sx={{ mt: 2 }}
      >
        Calculate Price
      </Button>

      <Button
        variant="outlined"
        color="secondary"
        onClick={handleLoginClick}
        fullWidth
        sx={{ mt: 2 }}
      >
        Login
      </Button>

      {error && (
        <Alert severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}

export default Home;
