// import React, { useState, useEffect } from "react";
// import CouponWebApiService from "../../../../Services/CouponsWebApiService";
// import { useNavigate } from "react-router-dom";

// function DeleteCoupon({ couponId, onSave, onDelete }) {
//   const [coupon, setCoupon] = useState(null); // Start with null until data is loaded
//   const [loading, setLoading] = useState(false); // Track loading state
//   const [error, setError] = useState(null); // Track error state
//   const navigate = useNavigate();

//   console.log("I want to delete coupon");
//   console.log("id in Delete Coupon component is " + couponId);

//   // Fetch coupon details when component mounts or couponId changes
//   const id = Number(couponId);
//   console.log("delete - id after Number is " + id);
//   useEffect(() => {
//     if (couponId) {
//       setLoading(true);
//       setError(null); // Reset error state

//       const confirmation = window.confirm(
//         `Are you sure you want to delete coupon ${couponId}?`
//       );

//       if (confirmation) {
//         CouponWebApiService.deleteCoupon(couponId)
//           .then((data) => {
//             setCoupon(data);
//             navigate("/admin/coupons");
//           })
//           .catch((error) => {
//             setError("Error fetching coupon. Please try again later.");
//           })
//           .finally(() => setLoading(false));
//       } else {
//         setLoading(false); // Stop loading if deletion is canceled
//       }
//     }
//   }, [couponId]);

//   // Handle input changes
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setCoupon((prevCoupon) => ({
//       ...prevCoupon,
//       [name]:
//         name === "amount" || name === "value" ? parseInt(value, 10) : value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     if (coupon) onSave(coupon); // Call onSave with updated coupon data
//   };

//   // Handle coupon deletion
//   const handleDelete = () => {};

//   // If no coupon found or loading, display a loading message
//   if (loading) {
//     return <div>Loading coupon data...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!coupon) {
//     console.log("coupon id is " + couponId);
//     return <div></div>;
//     // return <div>No coupon found with the given ID.</div>;
//   }

//   return <p>Deleted coupon</p>;
// }

// export default DeleteCoupon;

import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import couponWebApiService from "../../../../Services/CouponsWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { deletedCouponAction } from "../../../../components/Redux/CouponAppState";

function DeleteCoupon({ couponId }) {
  console.log("coupon id " + couponId);
  console.log("couponId is " + Number(couponId));
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const yes = () => {
    console.log("im in the function and couponId is " + couponId);
    couponWebApiService
      .deleteCoupon(couponId)
      .then((res) => {
        notifyService.success(`Deleted coupon #${couponId}`);
        dispatch(deletedCouponAction(couponId));
        navigate(-1);
      })
      .catch((err) => notifyService.error(err));
  };

  const no = () => {
    navigate(-1);
  };

  return (
    <div className="DeleteCoupon">
      <h2>Delete Coupon</h2>
      <p className="delete-message">
        Are you sure you want to delete coupon #{couponId}?
      </p>
      <div className="delete-button-container">
        <button className="delete-button" onClick={yes}>
          Delete
        </button>
        <button className="cancel-button" onClick={no}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteCoupon;
