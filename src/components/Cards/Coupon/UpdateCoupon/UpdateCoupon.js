import React, { useState, useEffect } from "react";
import axios from "axios";
import UrlService from "../../../../Services/UrlService";

function UpdateCoupon({ couponId = null, onSave }) {
  const [coupon, setCoupon] = useState({
    id: null,
    category: "",
    description: "",
    creationDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    amount: 0,
    value: 0,
    image: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch coupon by ID if it's not initially provided
  useEffect(() => {
    if (couponId) {
      setLoading(true);
      axios
        .get(`${UrlService.admin}/coupon/${couponId}`) // Replace with your endpoint
        .then((response) => {
          setCoupon(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching coupon:", error);
          setLoading(false);
        });
    }
  }, [couponId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCoupon((prevCoupon) => ({
      ...prevCoupon,
      [name]:
        name === "amount" || name === "value" ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(coupon); // Call onSave with the updated coupon data
  };

  if (loading) return <div>Loading coupon details...</div>;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={coupon.category}
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
        name="image"
        placeholder="Image"
        value={coupon.image}
        onChange={handleChange}
      />
      <button type="submit">
        {coupon.id ? "Update Coupon" : "Add Coupon"}
      </button>
    </form>
  );
}

export default UpdateCoupon;
