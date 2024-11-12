import React, { useState, useEffect } from "react";
import couponWebApiService from "../../../../Services/CouponsWebApiService";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../../Services/NotificationService";
import CouponTypes from "../CouponManager/CouponTypes";
import "./UpdateCoupon.css";

function UpdateCoupon({ couponId, onUpdateCouponList }) {
  const [coupon, setCoupon] = useState({
    id: null,
    category: "",
    description: "",
    creationDate: new Date().toISOString().slice(0, 10),
    endDate: new Date().toISOString().slice(0, 10),
    amount: 0,
    value: 0,
    type: [],
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (couponId) {
      setLoading(true);
      couponWebApiService
        .updateCoupon(couponId)
        .then((response) => {
          setCoupon(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching coupon: ", error);
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

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setCoupon((prevCoupon) => {
      const newTypes = checked
        ? [...prevCoupon.type, value]
        : prevCoupon.type.filter((type) => type !== value);
      return { ...prevCoupon, type: newTypes };
    });
  };

  const validate = () => {
    const newErrors = {};
    const codePattern =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!coupon.description) newErrors.description = "Description is required";
    if (coupon.amount <= 0)
      newErrors.amount = "Amount must be greater than zero";
    if (coupon.value <= 0) newErrors.value = "Value must be greater than zero";
    if (!coupon.code) {
      newErrors.code = "Coupon code is required";
    } else if (!codePattern.test(coupon.code)) {
      newErrors.code =
        "Code must be at least 8 characters, with letters, numbers, and special characters.";
      if (!coupon.image) newErrors.image = "Image URL is required";

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      if (!validate()) return;

      setLoading(true);
      couponWebApiService
        .updateCoupon(couponId, coupon)
        .then((response) => {
          onUpdateCouponList(response.data.coupons);
          notifyService.success(response.data.message);
          navigate(`/admin/coupons`);
        })
        .catch((error) => {
          console.error("Error updating coupon: ", error);
          setLoading(false);
        });
    };

    if (loading) return <div>Loading coupon details...</div>;

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input type="number" name="id" id="id" value={coupon.id} readOnly />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="Description"
            value={coupon.description}
            onChange={handleChange}
          />
          {errors.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="creationDate">Creation Date</label>
          <input
            type="date"
            name="creationDate"
            id="creationDate"
            value={coupon.creationDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            name="endDate"
            id="endDate"
            value={coupon.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            name="amount"
            id="amount"
            placeholder="Amount"
            value={coupon.amount}
            onChange={handleChange}
          />
          {errors.amount && (
            <span className="error-message">{errors.amount}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="value">Value</label>
          <input
            type="number"
            name="value"
            id="value"
            placeholder="Value"
            value={coupon.value}
            onChange={handleChange}
          />
          {errors.value && (
            <span className="error-message">{errors.value}</span>
          )}
        </div>

        <div className="form-group">
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

        <div className="form-group">
          <label htmlFor="code">Code</label>
          <input
            type="text"
            name="code"
            id="code"
            placeholder="Coupon Code"
            value={coupon.code}
            onChange={handleChange}
          />
          {errors.code && <span className="error-message">{errors.code}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL</label>
          <input
            type="text"
            name="image"
            id="image"
            placeholder="Image URL"
            value={coupon.image}
            onChange={handleChange}
          />
          {errors.image && (
            <span className="error-message">{errors.image}</span>
          )}
        </div>

        <button type="submit">
          {coupon.id ? "Update Coupon" : "Add Coupon"}
        </button>
      </form>
    );
  };
}

export default UpdateCoupon;
