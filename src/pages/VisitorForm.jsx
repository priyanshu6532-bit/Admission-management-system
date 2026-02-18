import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createVisitor } from "../services/api";

function VisitorForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    courseInterested: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10}$/.test(form.phone.trim())) {
      newErrors.phone = "Enter a 10-digit phone number";
    }

    if (!form.courseInterested.trim()) {
      newErrors.courseInterested = "Please select a course";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    await createVisitor(form);
    alert("Application Submitted Successfully!");
    navigate("/student-application/personal", {
      state: { course: form.courseInterested },
    });
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow-lg border-0">
          <div className="card-header text-white text-center" style={{ background: "linear-gradient(90deg,#1d4ed8,#3b82f6)" }}>
            <h4>Admission Enquiry Form</h4>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  value={form.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Course</label>
                <select
                  name="courseInterested"
                  className={`form-select ${
                    errors.courseInterested ? "is-invalid" : ""
                  }`}
                  value={form.courseInterested}
                  onChange={handleChange}
                >
                  <option value="">Select a course</option>
                  <option value="BA(JMC)">BA (JMC)</option>
                  <option value="MCA">MCA</option>
                </select>
                {errors.courseInterested && (
                  <div className="invalid-feedback">
                    {errors.courseInterested}
                  </div>
                )}
              </div>

              <button
                className="btn w-100 text-white"
                style={{ backgroundColor: "#1d4ed8", border: "none" }}
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitorForm;
