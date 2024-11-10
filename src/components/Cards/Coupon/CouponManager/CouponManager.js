import React, { useState } from "react";
import CouponList from "./CouponList"; // Import the CouponList
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MockApiService from "../../../../Services/MockApiService";

function CouponManager() {
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate(); // Hook to navigate to CreateCoupon page

  useEffect(() => {
    // Fetch initial list of coupons
    MockApiService.getCoupons().then((fetchedCoupons) => {
      setCoupons(fetchedCoupons);
    });
  }, []);

  const handleSaveCoupon = (newCoupon) => {
    if (newCoupon.id) {
      setCoupons((prevCoupons) =>
        prevCoupons.map((coupon) =>
          coupon.id === newCoupon.id ? newCoupon : coupon
        )
      );
    } else {
      setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
    }
  };

  const handleAddCoupon = (id) => {
    navigate("/admin/coupons/add"); // Navigate to CreateCoupon page
  };

  //added now
  const handleDeleteCoupon = (id) => {
    navigate(`/admin/coupons/${id}`);
  };

  const handleUpdateCoupon = (id) => {
    navigate("/admin/coupons/coupon");
  };
  return (
    <div>
      {/* Only render the CouponList here */}
      <CouponList
        coupons={coupons}
        onAddCoupon={handleAddCoupon}
        onDeleteCoupon={handleDeleteCoupon}
        onUpdateCoupon={handleUpdateCoupon}
      />
    </div>
  );
}

export default CouponManager;
