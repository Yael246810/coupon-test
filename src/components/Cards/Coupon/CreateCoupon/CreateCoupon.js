import React, { useState } from "react";
import couponWebApiService from "../../../../Services/CouponsWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";
import CouponTypes from "../CouponManager/CouponTypes";
import "./CreateCoupon.css";

function CreateCoupon() {
  const [coupon, setCoupon] = useState({
    id: 0,
    description: "",
    creationDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    amount: 0,
    value: 0,
    type: [],
    code: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCoupon((prevCoupon) => ({
      ...prevCoupon,
      [name]:
        name === "amount" || name === "value" ? parseInt(value, 10) : value,
    }));
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setCoupon((prevCoupon) => {
      const newTypes = checked
        ? [...prevCoupon.type, value]
        : prevCoupon.type.filter((type) => type !== value);

      return {
        ...prevCoupon,
        type: newTypes,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("handle add coupon submit: " + coupon.id);
    couponWebApiService
      .addCoupon(coupon)
      .then((response) => {
        console.log("Coupon added:", response.data);
        notifyService.success(response.data.message);
        navigate("/admin/coupons");
      })
      .catch((error) => {
        console.error("Error adding coupon:", error);
        notifyService.error("Failed to add coupon");
      });
  };

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

      <div>
        <h3>Select Coupon Types</h3>
        {Object.values(CouponTypes).map((type) => (
          <div key={type}>
            <input
              type="checkbox"
              id={type}
              name="type"
              value={type}
              checked={coupon.type.includes(type)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={type}>{type}</label>
          </div>
        ))}
      </div>

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
      <button type="submit">Add Coupon</button>
    </form>
  );
}

export default CreateCoupon;
