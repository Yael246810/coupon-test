import React, { useState } from "react";
import CouponList from "./CouponList"; // Import the CouponList
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MockApiService from "../../../../Services/MockApiService";
import DeleteCoupon from "../DeleteCoupon/DeleteCoupon";

function CouponManager() {
  const [coupons, setCoupons] = useState([]);
  const [selectedCouponId, setSelectedCouponId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    MockApiService.getCoupons().then((fetchedCoupons) => {
      setCoupons(fetchedCoupons);
      console.log(coupons);
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
    const couponId = Number(id);
    setSelectedCouponId(Number(couponId)); // Update the state
    console.log("1 Selected coupon id is: " + couponId);
    //navigate(`/admin/coupons/${couponId}/delete`); // Perform the navigation immediately with the id
  };

  useEffect(() => {
    if (selectedCouponId !== null) {
      console.log("2 Selected coupon id is: " + selectedCouponId);
      navigate(`/admin/coupons/${selectedCouponId}/delete`); // Navigate after the state update
    }
  }, [selectedCouponId, navigate]); // Dependency array makes sure this runs when selectedCouponId changes

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
      <DeleteCoupon couponId={selectedCouponId} />
    </div>
  );
}

export default CouponManager;
