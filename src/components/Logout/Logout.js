import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOutAction } from "../Redux/UserAppState";
import { useNavigate } from "react-router-dom";
import { removeCoupons } from "../Redux/CouponAppState";

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userType = useSelector((state) => state.user.type);

  useEffect(() => {
    dispatch(removeCoupons()); //might need to delete that??
    dispatch(userLoggedOutAction());
    navigate("/login");
  }, [dispatch, navigate, userType]);

  return (
    <div className="Logout">
      <h1>User did logout</h1>
    </div>
  );
}

export default Logout;
