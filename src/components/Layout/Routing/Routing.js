import { Route, Routes } from "react-router-dom";
import App from "../../../App";
import Page404 from "../../Pages/Page404/Page404";
import Home from "../../Pages/Home/Home";
import Login from "../../Login/Login";
import CreateUser from "../../Cards/Admin/CreateUser/CreateUser";
import Logout from "../../Logout/Logout";
import CreateCoupon from "../../Cards/Coupon/CreateCoupon/CreateCoupon";
import UpdateCoupon from "../../Cards/Coupon/UpdateCoupon/UpdateCoupon";
import DeleteCoupon from "../../Cards/Coupon/DeleteCoupon/DeleteCoupon";
import CouponManager from "../../Cards/Coupon/CouponManager/CouponManager";

function Routing() {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/coupons" element={<CouponManager />} />
        <Route path="/admin/users/add" element={<CreateUser />} />
        <Route path="/admin/coupons/add" element={<CreateCoupon />} />
        <Route
          path="/admin/coupons/:couponId/update"
          element={<UpdateCoupon />}
        />
        <Route
          path="/admin/coupons/:couponId/delete"
          element={<DeleteCoupon />}
        />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default Routing;
