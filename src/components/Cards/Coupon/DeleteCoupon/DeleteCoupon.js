import React, { useState, useEffect } from "react";
import CouponWebApiService from "../../../../Services/CouponsWebApiService";

function DeleteCoupon({ couponId, onSave, onDelete }) {
  const [coupon, setCoupon] = useState(null); // Start with null until data is loaded

  console.log("I want to delete coupon");

  // Fetch coupon details when component mounts or couponId changes
  useEffect(() => {
    if (couponId) {
      CouponWebApiService.getCouponById(couponId) // Assume this fetches the coupon by ID
        .then((data) => setCoupon(data))
        .catch((error) => console.error("Error fetching coupon:", error));
    }
  }, [couponId]);

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCoupon((prevCoupon) => ({
      ...prevCoupon,
      [name]:
        name === "amount" || name === "value" ? parseInt(value, 10) : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (coupon) onSave(coupon); // Call onSave with updated coupon data
  };

  // Handle coupon deletion
  const handleDelete = () => {
    if (coupon && coupon.id) {
      onDelete(coupon.id); // Pass the coupon ID to the onDelete handler
    }
  };

  if (!coupon) {
    return <div>Loading coupon data...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="id"
        placeholder="Id"
        value={coupon.id}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={coupon.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="creationDate"
        value={coupon.creationDate}
        onChange={handleChange}
      />
      <input
        type="date"
        name="endDate"
        value={coupon.endDate}
        onChange={handleChange}
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={coupon.amount}
        onChange={handleChange}
      />
      <input
        type="number"
        name="value"
        placeholder="Value"
        value={coupon.value}
        onChange={handleChange}
      />
      <input
        type="text"
        name="code"
        placeholder="Code"
        value={coupon.code}
        onChange={handleChange}
      />
      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={coupon.image}
        onChange={handleChange}
      />

      <button type="submit">
        {coupon.id ? "Update Coupon" : "Add Coupon"}
      </button>

      {/* Show delete button if coupon is loaded */}
      {coupon.id && (
        <button
          type="button"
          onClick={handleDelete}
          style={{ backgroundColor: "red", color: "white" }}
        >
          Delete Coupon
        </button>
      )}
    </form>
  );
}

export default DeleteCoupon;
