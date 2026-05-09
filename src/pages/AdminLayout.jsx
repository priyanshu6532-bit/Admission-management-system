import { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import BVILogo from "../assets/images/BVI.png";

function AdminLayout() {
    const { user, logout } = useAuth(); 
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const isAdminHomeActive = location.pathname === "/admin" || location.pathname === "/admin/";
    const isApplicationsActive = location.pathname.includes("/admin/applications");
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

    return (
        <div className="d-flex" style={{ minHeight: "100vh" }}>
            {/* Sidebar */}
            <div
                className="bg-dark text-white d-flex flex-column"
                style={{ width: "260px", flexShrink: 0 }}
            >
                <div className="p-3 d-flex align-items-center justify-content-center border-bottom border-secondary mb-3">
                    <img
                        src={BVILogo}
                        alt="Logo"
                        style={{ height: "40px", marginRight: "10px" }}
                    />
                    <div className="d-flex flex-column">
                        <span className="fw-bold" style={{ fontSize: "1.1rem" }}>BVICAM</span>
                        <span className="text-muted" style={{ fontSize: "0.7rem", letterSpacing: "1px" }}>ADMIN PANEL</span>
                    </div>
                </div>
                <ul className="nav nav-pills flex-column px-2 gap-2">
                    <li className="nav-item">
                        <Link
                            to="/admin"
                            className={`nav-link text-white d-flex align-items-center ${isAdminHomeActive ? "active" : ""}`}
                            style={{ 
                                backgroundColor: isAdminHomeActive ? "#1d4ed8" : "transparent",
                                transition: "all 0.3s"
                            }}
                        >
                            <i className="bi bi-speedometer2 me-2"></i> Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            to="/admin/applications"
                            className={`nav-link text-white d-flex align-items-center ${isApplicationsActive ? "active" : ""}`}
                            style={{ 
                                backgroundColor: isApplicationsActive ? "#1d4ed8" : "transparent",
                                transition: "all 0.3s"
                            }}
                        >
                            <i className="bi bi-people me-2"></i> Student Applications
                        </Link>
                    </li>
                </ul>
                
                <div className="mt-auto p-3 border-top border-secondary">
                    <button className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right"></i> Logout
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1 d-flex flex-column bg-light" style={{ overflowX: "hidden" }}>
                {/* Navbar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4 py-2">
                    <div className="container-fluid d-flex justify-content-between align-items-center">
                        <h5 className="mb-0 fw-semibold text-primary">
                            {isAdminHomeActive ? "Overview" : "Applications Management"}
                        </h5>
                        <div className="dropdown">
                            <button
                                className="btn btn-light dropdown-toggle d-flex align-items-center gap-2 border-0"
                                type="button"
                                id="userDropdown"
                                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                aria-expanded={isUserDropdownOpen}
                            >
                                <div className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style={{ width: "32px", height: "32px" }}>
                                    A
                                </div>
                                <span className="d-none d-md-inline">Admin</span>
                            </button>
                            <ul className={`dropdown-menu dropdown-menu-end shadow border-0 ${isUserDropdownOpen ? 'show' : ''}`} aria-labelledby="userDropdown">
                                <li className="px-3 py-2 border-bottom">
                                    <p className="mb-0 fw-bold small">{user?.email || "admin@bvicam.in"}</p>
                                    <p className="mb-0 text-muted extra-small">Administrator</p>
                                </li>
                                <li>
                                    <button className="dropdown-item text-danger d-flex align-items-center gap-2 py-2" onClick={handleLogout}>
                                        <i className="bi bi-box-arrow-right"></i> Sign Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Page Content */}
                <div className="p-4 flex-grow-1 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;
