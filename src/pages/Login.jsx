import { useState } from "react";
import { loginUser } from "../services/api";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const [role, setRole] = useState("student");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser(data);
    login(res.data.token);

    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/student-application");
    }
  };

  return (
    <div className="row justify-content-end">
      <div className="col-md-6 col-lg-4">
        <div className="card shadow-lg border-0 mt-5">
          <div
            className="card-header text-white text-center"
            style={{ background: "linear-gradient(90deg,#1d4ed8,#3b82f6)" }}
          >
            <h4>Login</h4>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label d-block mb-2">Login as</label>
                <div className="d-flex gap-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="roleStudent"
                      value="student"
                      checked={role === "student"}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="roleStudent">
                      Student
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="role"
                      id="roleAdmin"
                      value="admin"
                      checked={role === "admin"}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <label className="form-check-label" htmlFor="roleAdmin">
                      Admin
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={data.username}
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={data.password}
                  onChange={(e) =>
                    setData({ ...data, password: e.target.value })
                  }
                  required
                />
              </div>

              <button
                className="btn w-100 text-white"
                style={{ backgroundColor: "#1d4ed8", border: "none" }}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
