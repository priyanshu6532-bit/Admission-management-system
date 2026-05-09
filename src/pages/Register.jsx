import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import BVILogo from "../assets/images/BVI.png";

function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
    setError("");
  };

  const validate = () => {
    const errs = {};
    if (!data.name.trim()) errs.name = "Name is required.";
    if (!data.email.trim()) errs.email = "Email is required.";
    if (!data.phone.trim()) errs.phone = "Phone number is required.";
    if (!data.password) errs.password = "Password is required.";
    if (!data.confirmPassword) errs.confirmPassword = "Confirm Password is required.";
    else if (data.password !== data.confirmPassword)
      errs.confirmPassword = "Passwords do not match.";
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await registerUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      setError(err || "An error occurred during registration");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f4f7f6",
        padding: "40px 20px",
        fontFamily: "'Segoe UI', Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
          padding: "40px",
        }}
      >
        {/* Header Section */}
        <div className="text-center mb-5">
          <img src={BVILogo} alt="BVICAM Logo" style={{ height: "60px", marginBottom: "15px" }} />
          <h3 style={{ color: "#1a237e", fontWeight: 700, marginBottom: "5px" }}>Create Account</h3>
          <p className="text-muted" style={{ fontSize: "0.95rem" }}>
            Join BVICAM Admission Portal
          </p>
        </div>

        {error && <div className="alert alert-danger p-2 small text-center">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Full Name</label>
            <input
              type="text"
              name="name"
              className={`form-control ${fieldErrors.name ? "is-invalid" : ""}`}
              placeholder="Enter your name"
              value={data.name}
              onChange={handleChange}
              style={{ padding: "12px", borderRadius: "8px" }}
            />
            {fieldErrors.name && <div className="invalid-feedback small">{fieldErrors.name}</div>}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Email Address</label>
            <input
              type="email"
              name="email"
              className={`form-control ${fieldErrors.email ? "is-invalid" : ""}`}
              placeholder="Enter your email"
              value={data.email}
              onChange={handleChange}
              style={{ padding: "12px", borderRadius: "8px" }}
            />
            {fieldErrors.email && <div className="invalid-feedback small">{fieldErrors.email}</div>}
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Phone Number</label>
            <input
              type="tel"
              name="phone"
              className={`form-control ${fieldErrors.phone ? "is-invalid" : ""}`}
              placeholder="Enter your mobile number"
              value={data.phone}
              onChange={handleChange}
              style={{ padding: "12px", borderRadius: "8px" }}
            />
            {fieldErrors.phone && <div className="invalid-feedback small">{fieldErrors.phone}</div>}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label small fw-bold text-muted">Password</label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={`form-control ${fieldErrors.password ? "is-invalid" : ""}`}
                placeholder="Create a password"
                value={data.password}
                onChange={handleChange}
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

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="form-label small fw-bold text-muted">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className={`form-control ${fieldErrors.confirmPassword ? "is-invalid" : ""}`}
              placeholder="Repeat your password"
              value={data.confirmPassword}
              onChange={handleChange}
              style={{ padding: "12px", borderRadius: "8px" }}
            />
            {fieldErrors.confirmPassword && (
              <div className="invalid-feedback small">{fieldErrors.confirmPassword}</div>
            )}
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-bold"
            style={{
              background: "#5e72e4",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              boxShadow: "0 4px 6px rgba(94, 114, 228, 0.2)",
            }}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
