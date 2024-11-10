import { Link } from "react-router-dom";
import "./Menu.css";
import { useSelector } from "react-redux";
import CouponList from "../../Cards/Coupon/CouponManager/CouponList";

function Menu() {
  const isAdmin = useSelector((state) => state.guardReducer.isAdmin);

  return (
    <div className="Menu">
      {isAdmin && (
        <Link to="/admin">
          <CouponList />
        </Link>
      )}
      {isAdmin && <Link to="/admin/coupons">Coupons:</Link>}
      {isAdmin && (
        <Link to="/admin/users/create">
          <button>Add a new Admin</button>
        </Link>
      )}
      {isAdmin && (
        <Link to="/admin/coupons/create">
          <button>Add Coupon</button>
        </Link>
      )}
      {isAdmin && (
        <Link to="admin/coupons/:id/delete">
          <button>Delete Coupon</button>
        </Link>
      )}
    </div>
  );
}

export default Menu;
