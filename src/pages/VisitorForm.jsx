import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createVisitor } from "../services/api";

const sidebarLinks = [
  { label: "About Bharati Vidyapeeth, Pune", href: "#" },
  { label: "About BVICAM", href: "#" },
  { label: "Vision, Mission & Quality Policy", href: "#" },
  { label: "Founder's Message", href: "#" },
  { label: "Chancellor's Message", href: "#" },
  { label: "Secretary's Message", href: "#" },
  { label: "Director's Corner", href: "#" },
  { label: "Governing Body", href: "#" },
  { label: "Faculty Council", href: "#" },
  { label: "Administrative Structure", href: "#" },
  { label: "Students' Council", href: "#" },
  { label: "Support Staff", href: "#" },
  { label: "Photo Gallery", href: "#" },
  { label: "Contact Us", href: "/contact" },
];

/* ════════════════════════════════════════════════════════════
   Shared style constants
   ════════════════════════════════════════════════════════════ */
const PANEL_HEADER = {
  background: "linear-gradient(135deg, #1565c0 0%, #1e88e5 100%)",
  color: "#fff",
  textAlign: "center",
  fontWeight: 700,
  fontSize: "1rem",
  padding: "10px 0",
  letterSpacing: 0.5,
  borderRadius: "6px 6px 0 0",
};

const PANEL_BODY = {
  background: "#fff",
  border: "1px solid #bbdefb",
  borderTop: "none",
  borderRadius: "0 0 6px 6px",
  padding: 0,
};

const LINK_STYLE = {
  display: "block",
  padding: "10px 16px",
  color: "#1565c0",
  fontWeight: 600,
  fontSize: "0.85rem",
  textDecoration: "none",
  borderBottom: "1px dashed #90caf9",
  transition: "background .2s",
};

const FORM_LABEL = {
  fontSize: "0.9rem",
  fontWeight: 600,
  color: "#333",
  marginBottom: "5px",
};

const ASTERISK = {
  color: "red",
  marginLeft: "3px",
};

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
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    if (!form.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!form.courseInterested) newErrors.courseInterested = "Please select a course.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await createVisitor(form);
      navigate("/enquiry-success");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again.");
    }
  };

  return (
    <div className="container py-4" style={{ fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <div className="row g-4">
        {/* ── Sidebar (Left) ── */}
        <div className="col-md-3">
          <div style={PANEL_HEADER}>Navigation</div>
          <div style={PANEL_BODY}>
            {sidebarLinks.map((link, i) => (
              <Link
                key={i}
                to={link.href}
                style={{
                  ...LINK_STYLE,
                  ...(i === sidebarLinks.length - 1 ? { borderBottom: "none" } : {}),
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#e3f2fd")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Main Content (Right) ── */}
        <div className="col-md-9">
          <h2 style={{ color: "#1a237e", fontWeight: 700, marginBottom: "24px" }}>
            Admission Enquiry
          </h2>

          <div
            className="shadow-sm"
            style={{
              background: "#f9f9f9",
              borderRadius: "10px",
              padding: "30px",
              border: "1px solid #eee",
            }}
          >
            <form onSubmit={handleSubmit} noValidate>
              <div className="row">
                {/* Course Dropdown */}
                <div className="col-md-8 mb-4">
                  <label style={FORM_LABEL}>
                    Course<span style={ASTERISK}>*</span>
                  </label>
                  <select
                    name="courseInterested"
                    className={`form-select ${errors.courseInterested ? "is-invalid" : ""}`}
                    value={form.courseInterested}
                    onChange={handleChange}
                    style={{ borderRadius: "8px", padding: "10px" }}
                  >
                    <option value="">--Select Course--</option>
                    <option value="BA(JMC)">BA (JMC)</option>
                    <option value="MCA">MCA</option>
                  </select>
                  {errors.courseInterested && (
                    <div className="invalid-feedback">{errors.courseInterested}</div>
                  )}
                </div>

                {/* Name */}
                <div className="col-md-6 mb-4">
                  <label style={FORM_LABEL}>
                    Name<span style={ASTERISK}>*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    value={form.name}
                    onChange={handleChange}
                    style={{ borderRadius: "8px", padding: "10px" }}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                {/* Phone */}
                <div className="col-md-6 mb-4">
                  <label style={FORM_LABEL}>
                    Phone<span style={ASTERISK}>*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    value={form.phone}
                    onChange={handleChange}
                    style={{ borderRadius: "8px", padding: "10px" }}
                  />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>

                {/* Email */}
                <div className="col-md-8 mb-4">
                  <label style={FORM_LABEL}>
                    Email<span style={ASTERISK}>*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    value={form.email}
                    onChange={handleChange}
                    style={{ borderRadius: "8px", padding: "10px" }}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
              </div>

              <div className="mt-2">
                <button
                  type="submit"
                  className="btn btn-primary px-5 py-2 fw-bold"
                  style={{
                    background: "#007bff",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px rgba(0,123,255,0.2)",
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisitorForm;
