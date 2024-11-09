import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  Grid,
} from "@mui/material";

function CouponList({ coupons = [], onAddCoupon }) {
  if (coupons.length === 0) {
    return (
      <div>
        <h2>There are no coupons at the moment</h2>
        <Button variant="contained" color="primary" onClick={onAddCoupon}>
          Add Coupon
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2>Coupons</h2>
      <Grid container spacing={2}>
        {coupons.map((coupon, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ maxWidth: 345, backgroundColor: "#f9f9f9" }}>
              {coupon.image && (
                <CardMedia
                  component="img"
                  height="140"
                  image={coupon.image}
                  alt={coupon.title}
                />
              )}
              <CardContent>
                <Typography variant="h6" component="div">
                  {coupon.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Value: {coupon.value}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" variant="contained" color="primary">
                  Apply
                </Button>
                <Button size="small" variant="outlined" color="secondary">
                  Share
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default CouponList;
