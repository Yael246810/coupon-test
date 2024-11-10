import React, { useState, useEffect } from "react";
import CouponWebApiService from "../../../../Services/CouponsWebApiService";

function DeleteCoupon({ couponId, onSave, onDelete }) {
  const [coupon, setCoupon] = useState(null); // Start with null until data is loaded
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(null); // Track error state

  console.log("I want to delete coupon");
  console.log("id in Delete Coupon component is " + couponId);

  // Fetch coupon details when component mounts or couponId changes
  const id = Number(couponId);
  console.log("id after Number is " + id);
  useEffect(() => {
    if (couponId) {
      setLoading(true);
      setError(null); // Reset error state
      CouponWebApiService.deleteCoupon(couponId)
        .then((data) => {
          setCoupon(data);
        })
        .catch((error) => {
          setError("Error fetching coupon. Please try again later.");
        })
        .finally(() => setLoading(false));
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
      // Confirm deletion before proceeding
      const confirmation = window.confirm(
        `Are you sure you want to delete coupon ${coupon.id}?`
      );
      if (confirmation) {
        onDelete(coupon.id); // Pass the coupon ID to the onDelete handler
      }
    }
  };

  // If no coupon found or loading, display a loading message
  if (loading) {
    return <div>Loading coupon data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!coupon) {
    console.log("coupon id is " + couponId);
    return <div></div>;
    // return <div>No coupon found with the given ID.</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="id">ID</label>
        <input
          type="number"
          name="id"
          id="id"
          placeholder="ID"
          value={coupon.id}
          readOnly // Prevent editing the ID
        />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          placeholder="Description"
          value={coupon.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="creationDate">Creation Date</label>
        <input
          type="date"
          name="creationDate"
          id="creationDate"
          value={coupon.creationDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          name="endDate"
          id="endDate"
          value={coupon.endDate}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          name="amount"
          id="amount"
          placeholder="Amount"
          value={coupon.amount}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="value">Value</label>
        <input
          type="number"
          name="value"
          id="value"
          placeholder="Value"
          value={coupon.value}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="code">Code</label>
        <input
          type="text"
          name="code"
          id="code"
          placeholder="Code"
          value={coupon.code}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image URL</label>
        <input
          type="text"
          name="image"
          id="image"
          placeholder="Image URL"
          value={coupon.image}
          onChange={handleChange}
        />
      </div>

      {/* <button type="submit">Update Coupon</button> */}

      {/* Show delete button if coupon is loaded */}
      <p>Are you sure you want to delete the coupon?</p>
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
