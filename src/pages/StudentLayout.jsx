import { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import BVILogo from "../assets/images/BVI.png";
import { loadDraft } from "../utils/studentApplicationStore";

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
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const [isAppDropdownOpen, setIsAppDropdownOpen] = useState(isFormActive);

    const draft = loadDraft();
    const isStep1Done = !!draft.fullName;
    const isStep2Done = !!draft.tenthBoard;
    const isStep3Done = !!draft.course;

    const appSteps = [
        { label: "Personal Details", path: "/student/application/personal", enabled: true },
        { label: "Academic Details", path: "/student/application/academic", enabled: isStep1Done },
        { label: "Course Selection", path: "/student/application/course", enabled: isStep1Done && isStep2Done },
        { label: "Declaration", path: "/student/application/declaration", enabled: isStep1Done && isStep2Done && isStep3Done },
    ];

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
                        <div
                            className={`nav-link text-white d-flex align-items-center justify-content-between cursor-pointer ${isFormActive ? "active" : ""}`}
                            style={{ 
                                backgroundColor: isFormActive ? "#1d4ed8" : "transparent",
                                cursor: "pointer"
                            }}
                            onClick={() => setIsAppDropdownOpen(!isAppDropdownOpen)}
                        >
                            <span>
                                <i className="bi bi-file-earmark-text me-2"></i> Fill Application Form
                            </span>
                            <i className={`bi bi-chevron-${isAppDropdownOpen ? "up" : "down"} small`}></i>
                        </div>
                        
                        {isAppDropdownOpen && (
                            <ul 
                                className="list-unstyled ps-4 mt-2 mb-2 d-flex flex-column gap-0"
                                style={{ position: "relative" }}
                            >
                                {/* Vertical Line */}
                                <div 
                                    style={{ 
                                        position: "absolute", 
                                        left: "8px", 
                                        top: "10px", 
                                        bottom: "10px", 
                                        width: "2px", 
                                        backgroundColor: "rgba(255,255,255,0.2)" 
                                    }}
                                ></div>

                                {appSteps.map((step, idx) => {
                                    const isActive = location.pathname === step.path;
                                    const isEnabled = step.enabled;
                                    return (
                                        <li key={idx} style={{ position: "relative", zIndex: 1 }}>
                                            <Link
                                                to={isEnabled ? step.path : "#"}
                                                onClick={(e) => !isEnabled && e.preventDefault()}
                                                className="text-white text-decoration-none d-flex align-items-center py-2"
                                                style={{ 
                                                    fontSize: "0.85rem",
                                                    opacity: isEnabled ? (isActive ? 1 : 0.7) : 0.4,
                                                    fontWeight: isActive ? 600 : 400,
                                                    cursor: isEnabled ? "pointer" : "not-allowed"
                                                }}
                                            >
                                                <div 
                                                    className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                                                    style={{ 
                                                        width: "14px", 
                                                        height: "14px", 
                                                        border: `2px solid ${isEnabled ? "#fff" : "rgba(255,255,255,0.3)"}`,
                                                        backgroundColor: isActive ? "#fff" : "transparent",
                                                    }}
                                                ></div>
                                                {step.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
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
                                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                                aria-expanded={isUserDropdownOpen}
                            >
                                <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px" }}>
                                    {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                                </div>
                                <span>{user?.name || "Student"}</span>
                            </button>
                            <ul className={`dropdown-menu dropdown-menu-end shadow ${isUserDropdownOpen ? 'show' : ''}`} aria-labelledby="userDropdown">
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
