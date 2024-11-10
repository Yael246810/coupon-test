import React, { useState } from "react";
import couponWebApiService from "../../../../Services/CouponsWebApiService";
import notifyService from "../../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";
import { number } from "zod";

function CreateCoupon() {
  const [coupon, setCoupon] = useState({
    id: number,
    description: "",
    creationDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    amount: 0,
    value: 0,
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

  const handleSubmit = (event) => {
    event.preventDefault();

    couponWebApiService
      .addCoupon(coupon)
      .then((response) => {
        console.log("Coupon added:", response.data);
        notifyService.success(response.data.message);
        //To take the coupon list from here: response.data.coupons - and pass it to the CouponList
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
