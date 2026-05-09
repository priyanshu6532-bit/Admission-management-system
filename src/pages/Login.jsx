import { useState } from "react";
import { loginUser } from "../services/api";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import BVILogo from "../assets/images/BVI.png";
import LoginBg from "../assets/images/login_bg.png";

function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!data.username.trim()) errs.username = "Email / Username is required";
    if (!data.password) errs.password = "Password is required";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await loginUser(data);
      login(res.data);

      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/student");
      }
    } catch (err) {
      setError(err || "Login failed");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ── Left Side: Illustration (60%) ── */}
      <div
        style={{
          flex: "6",
          background: "#6f42c1",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
        className="d-none d-lg-flex"
      >
        <img
          src={LoginBg}
          alt="Login Illustration"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* ── Right Side: Login Form (40%) ── */}
      <div
        style={{
          flex: "4",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <div style={{ width: "100%", maxWidth: "400px" }}>
          {/* Header Section */}
          <div className="text-center mb-5">
            <img src={BVILogo} alt="BVICAM Logo" style={{ height: "60px", marginBottom: "15px" }} />
            <h3 style={{ color: "#1a237e", fontWeight: 700, marginBottom: "5px" }}>BVICAM</h3>
            <p className="text-muted" style={{ fontSize: "0.95rem" }}>
              Please log in to your account
            </p>
          </div>

          {error && <div className="alert alert-danger p-2 small">{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            {/* Username/Email */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">Email / Username</label>
              <input
                type="text"
                className={`form-control ${fieldErrors.username ? "is-invalid" : ""}`}
                placeholder="User Name/Email"
                value={data.username}
                onChange={(e) => {
                  setData({ ...data, username: e.target.value });
                  setFieldErrors({ ...fieldErrors, username: "" });
                }}
                style={{ padding: "12px", borderRadius: "8px" }}
              />
              {fieldErrors.username && (
                <div className="invalid-feedback small">{fieldErrors.username}</div>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted">Password</label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${fieldErrors.password ? "is-invalid" : ""}`}
                  placeholder="Enter your password"
                  value={data.password}
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                    setFieldErrors({ ...fieldErrors, password: "" });
                  }}
                  style={{ padding: "12px", paddingRight: "45px", borderRadius: "8px" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "none",
                    background: "none",
                    color: "#999",
                  }}
                >
                  <i className={`bi bi-eye${showPassword ? "-slash" : ""}`}></i>
                </button>
                {fieldErrors.password && (
                  <div className="invalid-feedback small">{fieldErrors.password}</div>
                )}
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn btn-primary w-100 py-2 fw-bold mb-4"
              style={{
                background: "#5e72e4",
                border: "none",
                borderRadius: "8px",
                fontSize: "1rem",
                boxShadow: "0 4px 6px rgba(94, 114, 228, 0.2)",
              }}
            >
              Log in
            </button>

            {/* Social Icons */}
            <div className="d-flex justify-content-center gap-3 mb-5">
              {[
                { icon: "bi-facebook", color: "#3b5998" },
                { icon: "bi-twitter", color: "#1da1f2" },
                { icon: "bi-google", color: "#db4437" },
                { icon: "bi-linkedin", color: "#0077b5" },
              ].map((s, i) => (
                <button
                  key={i}
                  type="button"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    background: s.color,
                    color: "#fff",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <i className={s.icon}></i>
                </button>
              ))}
            </div>

            {/* Footer Text */}
            <div className="text-center">
              <span className="text-muted small">Don't have an account? </span>
              <Link to="/register" className="text-decoration-none fw-bold small" style={{ color: "#5e72e4" }}>
                Register now
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
