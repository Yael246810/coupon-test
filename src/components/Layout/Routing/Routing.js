import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import App from "../../../App";
import Page404 from "../../Pages/Page404/Page404";
import Home from "../../Pages/Home/Home";
import Login from "../../Login/Login";
import CreateUser from "../../Cards/Admin/CreateUser";
import Logout from "../../Logout/Logout";
import { useSelector } from "react-redux";
import CreateCoupon from "../../Cards/Coupon/CreateCoupon/CreateCoupon";
import UpdateCoupon from "../../Cards/Coupon/UpdateCoupon/UpdateCoupon";
import DeleteCoupon from "../../Cards/Coupon/DeleteCoupon/DeleteCoupon";
import CouponManager from "../../Cards/Coupon/CouponManager/CouponManager";
import CouponList from "../../Cards/Coupon/CouponManager/CouponList";

function Routing() {
  // const AdminFlag = useSelector((state) => state.guardReducer.isAdmin);
  const AdminFlag = true; // I need to think what to do here, how to pass the state correctly.

  return (
    <div className="Routing">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />

        {AdminFlag && (
          <Route path="/admin/coupons" element={<CouponManager />} />
        )}

        {AdminFlag && (
          <Route path="/admin/users/add" element={<CreateUser />} />
        )}
        {AdminFlag && (
          <Route path="/admin/coupons/add" element={<CreateCoupon />} />
        )}
        {AdminFlag && (
          <Route
            path="/admin/coupons/coupon/update"
            element={<UpdateCoupon />}
          />
        )}
        {AdminFlag && (
          <Route
            path="/admin/coupons/:couponId/delete"
            element={<DeleteCoupon />}
          />
        )}

        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default Routing;
