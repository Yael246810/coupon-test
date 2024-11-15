import React, { useState, useEffect } from "react";
import CouponList from "./CouponList";
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

  const handleAddCoupon = () => {
    navigate("/admin/coupons/add");
  };

  const handleAddUser = () => {
    navigate("/admin/users/add");
  };

  const handleDeleteCoupon = (id) => {
    const couponId = Number(id);
    setSelectedCouponId(couponId);
  };

  const handleUpdateCoupon = (id) => {
    const couponId = Number(id);
    setSelectedCouponId(couponId);
  };

  useEffect(() => {}, [selectedCouponId]);

  const updateCouponList = (newCouponList) => {
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
        onUpdateCouponList={updateCouponList}
      />
      <UpdateCoupon
        couponId={selectedCouponId}
        onUpdateCouponList={updateCouponList}
      />
    </div>
  );
}

export default CouponManager;
