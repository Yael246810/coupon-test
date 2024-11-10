import React, { useState } from "react";
import CouponList from "./CouponList"; // Import the CouponList
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MockApiService from "../../../../Services/MockApiService";

function CouponManager() {
  const [coupons, setCoupons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
    navigate("/admin/coupons/add");
  };

  //added now
  const handleDeleteCoupon = (id) => {
    navigate(`/admin/coupons/${id}/delete`);
  };

  const handleUpdateCoupon = (id) => {
    console.log("this is the couponId " + id);
    navigate("/admin/coupons/coupon/update");
  };
  return (
    <div>
      {/* Only render the CouponList here */}
      <CouponList
        coupons={coupons}
        onAddCoupon={handleAddCoupon}
        onDeleteCoupon={handleDeleteCoupon}
        onUpdateCoupon={handleUpdateCoupon}
        onSave={handleSaveCoupon}
      />
    </div>
  );
}

export default CouponManager;
