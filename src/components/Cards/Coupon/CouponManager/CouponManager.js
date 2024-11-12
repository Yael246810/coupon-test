import React, { useState, useEffect } from "react";
import CouponList from "./CouponList"; // Import the CouponList
import { useNavigate } from "react-router-dom";
import MockApiService from "../../../../Services/MockApiService";
import DeleteCoupon from "../DeleteCoupon/DeleteCoupon";
import UpdateCoupon from "../UpdateCoupon/UpdateCoupon";

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
    setSelectedCouponId(couponId);
    console.log("Selected coupon ID for deletion: " + couponId);
  };

  const handleUpdateCoupon = (id) => {
    const couponId = Number(id);
    setSelectedCouponId(couponId);
    console.log("Selected coupon Id for updating " + couponId);
    // navigate(`/admin/coupons/${id}/update`);
  };

  useEffect(() => {
    console.log("Updated selectedCouponId:", selectedCouponId);
  }, [selectedCouponId]); // Logs selectedCouponId each time it changes

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
        // couponId={selectedCouponId}
        // onUpdateCouponList={updateCouponList}
      />
      <DeleteCoupon
        couponId={selectedCouponId}
        onUpdateCouponList={updateCouponList} // Pass function to update the coupon list
      />
      <UpdateCoupon
        couponId={selectedCouponId}
        onUpdateCouponList={updateCouponList}
      />
    </div>
  );
}

export default CouponManager;
