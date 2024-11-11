import React, { useState, useEffect } from "react";
import CouponList from "./CouponList"; // Import the CouponList
import { useNavigate } from "react-router-dom";
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
    console.log("handleSaveCoupon");
    // If you need to handle saving coupons, update the coupon state here.
    // If updating an existing coupon
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

  const handleAddCoupon = () => {
    navigate("/admin/coupons/add");
  };

  const handleAddUser = () => {
    navigate("/admin/users/add");
  };

  // Handle delete coupon
  const handleDeleteCoupon = (id) => {
    const couponId = Number(id);
    setSelectedCouponId(couponId); // Update the state with the coupon ID to be deleted
    console.log("Selected coupon ID for deletion: " + couponId);
  };

  const handleUpdateCoupon = (id) => {
    console.log("update - this is the couponId " + id);
    // setSelectedCouponId(couponId);
    navigate(`/admin/coupons/${id}/update`);
  };

  const updateCouponList = (newCouponList) => {
    console.log("updateCouponList: " + newCouponList.length);
    setCoupons(newCouponList);
    setSelectedCouponId(null);
  };

  return (
    <div>
      <CouponList
        coupons={coupons}
        onAddCoupon={handleAddCoupon}
        onDeleteCoupon={handleDeleteCoupon}
        onUpdateCoupon={handleUpdateCoupon}
        onSave={handleSaveCoupon}
        onAddUser={handleAddUser}
      />
      <DeleteCoupon
        couponId={selectedCouponId}
        onUpdateCouponList={updateCouponList} // Pass function to update the coupon list
      />
    </div>
  );
}

export default CouponManager;
