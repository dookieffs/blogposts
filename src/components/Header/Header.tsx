import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

function Header() {
  const { user, logout } = useAuthContext();

  const isLoggedIn = user !== null;

  return (
    <header>
      {isLoggedIn ? (
        <>
          <ul className="flex">
            <li className="mr-6">
              <Link
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
                to="/user/settings"
              >
                Settings
              </Link>
            </li>
            <li className="mr-6">
              <a
                href="#"
                onClick={logout}
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
              >
                Logout
              </a>
            </li>
          </ul>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
        </>
      )}
    </header>
  );
}

export default Header;
