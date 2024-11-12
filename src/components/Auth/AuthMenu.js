import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function AuthMenu() {
  const user = useSelector((state) => state.user);

  return (
    <div className="AuthMenu">
      {user.isAdmin ? (
        <p>
          Connected as {user.email} <Link to="logout">Logout</Link>
        </p>
      ) : (
        <p>
          Hello guest <Link to="login">Login</Link>
        </p>
      )}
    </div>
  );
}

export default AuthMenu;
