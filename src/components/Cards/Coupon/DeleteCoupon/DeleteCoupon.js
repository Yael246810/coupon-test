import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import couponWebApiService from "../../../../Services/CouponsWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { deletedCouponAction } from "../../../../components/Redux/CouponAppState";
import "./DeleteCoupon.css";

function DeleteCoupon({ couponId, onUpdateCouponList }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check if couponId is valid
  if (!couponId) {
    return null; // Render nothing if couponId is undefined or null
  }

  const onDeleteCoupon = () => {
    couponWebApiService
      .deleteCoupon(couponId)
      .then((res) => {
        notifyService.success(`Deleted coupon #${couponId}`);
        dispatch(deletedCouponAction(couponId));
        onUpdateCouponList(res.data.coupons);
        navigate("/admin/coupons");
      })
      .catch((err) => notifyService.error(err));
  };

  const onCancel = () => {
    navigate(-1); // Navigate back to the previous page if deletion is canceled
  };

  return (
    <div className="DeleteCoupon">
      <h2>Delete Coupon</h2>
      <p className="delete-message">
        Are you sure you want to delete coupon #{couponId}?
      </p>
      <div className="delete-button-container">
        <button className="delete-button" onClick={onDeleteCoupon}>
          Delete
        </button>
        <button className="cancel-button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteCoupon;
