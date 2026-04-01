import { Link, useLocation } from "react-router-dom";
import BVILogo from "../assets/images/BVI.png";

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <nav
      className="navbar navbar-dark bg-dark"
      style={{ minHeight: "15vh" }}
    >
      <div className="container d-flex flex-row align-items-center justify-content-between h-100 py-2">
        <Link className="navbar-brand d-flex align-items-center fw-bold fs-4" to="/">
          <img
            src={BVILogo}
            alt="BVICAM College Logo"
            style={{ height: 40, marginRight: 8 }}
          />
          <span>BVICAM</span>
        </Link>

        {isHome && (
          <div className="d-flex gap-3">
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
