import { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import BVILogo from "../assets/images/BVI.png";

function StudentLayout() {
    const { user, logout } = useAuth(); 
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const isHomeActive = location.pathname === "/student" || location.pathname === "/student/";
    const isFormActive = location.pathname.includes("/student/application");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            
            <div
                className="bg-dark text-white d-flex flex-column"
                style={{ width: "250px", flexShrink: 0 }}
            >
                <div className="p-3 d-flex align-items-center justify-content-center border-bottom border-secondary mb-3">
                    <img
                        src={BVILogo}
                        alt="Logo"
                        style={{ height: "40px", marginRight: "10px" }}
                    />
                    <h5 className="mb-0 fw-bold">BVICAM</h5>
                </div>
                <ul className="nav nav-pills flex-column px-2 gap-2">
                    <li className="nav-item">
                        <Link
                            to="/student"
                            className={`nav-link text-white ${isHomeActive ? "active" : ""}`}
                            style={{ backgroundColor: isHomeActive ? "#1d4ed8" : "transparent" }}
                        >
                            <i className="bi bi-house-door me-2"></i> Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/student/application"
                            className={`nav-link text-white ${isFormActive ? "active" : ""}`}
                            style={{ backgroundColor: isFormActive ? "#1d4ed8" : "transparent" }}
                        >
                            <i className="bi bi-file-earmark-text me-2"></i> Fill Application Form
                        </Link>
                    </li>
                </ul>
            </div>

            
            <div className="flex-grow-1 d-flex flex-column bg-light">
                {/* Navbar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-3">
                    <div className="container-fluid d-flex justify-content-end">
                        <div className="dropdown">
                            <button
                                className="btn btn-light dropdown-toggle d-flex align-items-center gap-2"
                                type="button"
                                id="userDropdown"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                aria-expanded={isDropdownOpen}
                            >
                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px" }}>
                                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                                </div>
                                <span>{user?.name || "Student"}</span>
                            </button>
                            <ul className={`dropdown-menu dropdown-menu-end shadow ${isDropdownOpen ? 'show' : ''}`} aria-labelledby="userDropdown">
                                <li>
                                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-right me-2"></i> Sign Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

               \
                <div className="p-4 flex-grow-1 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default StudentLayout;
