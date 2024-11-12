import "./Header.css";
import { Link } from "react-router-dom";
import AuthMenu from "../../Auth/AuthMenu";

function Header() {
  return (
    <div className="Header">
      <h1>Coupons</h1>
      <AuthMenu />
      {/* <Link to="/home"></Link> */}
    </div>
  );
}

export default Header;
