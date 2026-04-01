import { useState } from "react";
import { loginUser } from "../services/api";
import useAuth from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [data, setData] = useState({ username: "", password: "" });
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
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <div className="card shadow-lg border-0 mt-5">
          <div
            className="card-header text-white text-center"
            style={{ background: "linear-gradient(90deg,#1d4ed8,#3b82f6)" }}
          >
            <h4>Login</h4>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-danger p-2">{error}</div>}
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">Email / Username <span className="text-danger">*</span></label>
                <input
                  type="text"
                  className={`form-control ${fieldErrors.username ? "is-invalid" : ""}`}
                  value={data.username}
                  onChange={(e) => {
                    setData({ ...data, username: e.target.value });
                    setFieldErrors({ ...fieldErrors, username: "" });
                  }}
                />
                {fieldErrors.username && <div className="invalid-feedback">{fieldErrors.username}</div>}
              </div>

              <div className="mb-4">
                <label className="form-label">Password <span className="text-danger">*</span></label>
                <input
                  type="password"
                  className={`form-control ${fieldErrors.password ? "is-invalid" : ""}`}
                  value={data.password}
                  onChange={(e) => {
                    setData({ ...data, password: e.target.value });
                    setFieldErrors({ ...fieldErrors, password: "" });
                  }}
                />
                {fieldErrors.password && <div className="invalid-feedback">{fieldErrors.password}</div>}
              </div>

              <button
                type="submit"
                className="btn w-100 text-white mb-3"
                style={{ backgroundColor: "#1d4ed8", border: "none" }}
              >
                Login
              </button>

              <div className="text-center">
                <span className="text-muted">Don't have an account? </span>
                <Link to="/register" className="text-decoration-none fw-bold">
                  Register now
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
