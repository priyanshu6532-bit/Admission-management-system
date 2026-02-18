import { Link, useLocation } from "react-router-dom";
import SSMLogo from "../assets/images/SSM.png";

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav
      className="navbar navbar-dark bg-dark"
      style={{ minHeight: "15vh" }}
    >
      <div className="container d-flex flex-column justify-content-between h-100 py-2">
        <div className="d-flex justify-content-between align-items-center w-100">
          <Link className="navbar-brand d-flex align-items-center fw-bold fs-4" to="/">
            <img
              src={SSMLogo}
              alt="SSM College Logo"
              style={{ height: 40, marginRight: 8 }}
            />
            <span>SSM College</span>
          </Link>
        </div>

        {isHome && (
          <div className="d-flex justify-content-end w-100 mb-1 gap-3">
            <Link
              to="/about"
              className="text-light text-decoration-none"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-light text-decoration-none"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
