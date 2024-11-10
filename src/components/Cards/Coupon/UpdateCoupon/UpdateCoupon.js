import React, { useState, useEffect } from "react";
import axios from "axios";
import UrlService from "../../../../Services/UrlService";
import couponWebApiService from "../../../../Services/CouponsWebApiService";

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
    // console.log("update - id after Number is " + coupon.id);
    // if (couponId) {
    //   setLoading(true);
    //   couponWebApiService
    //     .updateCoupon(couponId) // Replace with your endpoint
    //     .then((response) => {
    //       setCoupon(response.data);
    //       setLoading(false);
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching coupon:", error);
    //       setLoading(false);
    //     });
    // }
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

    console.log("update.handleSubmit - couponId:" + coupon.id);

    setLoading(true);
    couponWebApiService
      .updateCoupon(coupon.id) // Replace with your endpoint
      .then((response) => {
        setCoupon(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching coupon:", error);
        setLoading(false);
      });
    // onSave(coupon);
  };

  if (loading) return <div>Loading coupon details...</div>;

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
    </form>
  );
}

export default UpdateCoupon;
