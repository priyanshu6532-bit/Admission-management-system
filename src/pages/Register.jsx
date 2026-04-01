import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

function Register() {
    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
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
        else if (data.password !== data.confirmPassword) errs.confirmPassword = "Passwords do not match.";
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
        <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5">
                <div className="card shadow-lg border-0 mt-4">
                    <div
                        className="card-header text-white text-center"
                        style={{ background: "linear-gradient(90deg,#1d4ed8,#3b82f6)" }}
                    >
                        <h4>Register</h4>
                    </div>
                    <div className="card-body">
                        {error && <div className="alert alert-danger p-2">{error}</div>}
                        <form onSubmit={handleSubmit} noValidate>
                            <div className="mb-3">
                                <label className="form-label">Name <span className="text-danger">*</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    className={`form-control ${fieldErrors.name ? "is-invalid" : ""}`}
                                    value={data.name}
                                    onChange={handleChange}
                                />
                                {fieldErrors.name && <div className="invalid-feedback">{fieldErrors.name}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Email <span className="text-danger">*</span></label>
                                <input
                                    type="email"
                                    name="email"
                                    className={`form-control ${fieldErrors.email ? "is-invalid" : ""}`}
                                    value={data.email}
                                    onChange={handleChange}
                                />
                                {fieldErrors.email && <div className="invalid-feedback">{fieldErrors.email}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Phone <span className="text-danger">*</span></label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className={`form-control ${fieldErrors.phone ? "is-invalid" : ""}`}
                                    value={data.phone}
                                    onChange={handleChange}
                                />
                                {fieldErrors.phone && <div className="invalid-feedback">{fieldErrors.phone}</div>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Password <span className="text-danger">*</span></label>
                                <input
                                    type="password"
                                    name="password"
                                    className={`form-control ${fieldErrors.password ? "is-invalid" : ""}`}
                                    value={data.password}
                                    onChange={handleChange}
                                />
                                {fieldErrors.password && <div className="invalid-feedback">{fieldErrors.password}</div>}
                            </div>

                            <div className="mb-4">
                                <label className="form-label">Confirm Password <span className="text-danger">*</span></label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className={`form-control ${fieldErrors.confirmPassword ? "is-invalid" : ""}`}
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                />
                                {fieldErrors.confirmPassword && <div className="invalid-feedback">{fieldErrors.confirmPassword}</div>}
                            </div>

                            <button
                                type="submit"
                                className="btn w-100 text-white mb-3"
                                style={{ backgroundColor: "#1d4ed8", border: "none" }}
                            >
                                Create Account
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
