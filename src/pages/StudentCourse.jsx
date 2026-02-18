import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadDraft, saveDraft } from "../utils/studentApplicationStore";

function StudentCourse() {
  const navigate = useNavigate();
  const location = useLocation();
  const draft = loadDraft();

  const initialCourse = draft.course || location.state?.course || "";

  const [form, setForm] = useState({
    course: initialCourse,
    campus: draft.campus || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.course) newErrors.course = "Course selection is required";
    if (!form.campus) newErrors.campus = "Campus location is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    saveDraft(form);
    navigate("/student-application/declaration");
  };

  const handlePrevious = () => {
    saveDraft(form);
    navigate("/student-application/academic");
  };

  const courseLocked = !!draft.course;

  return (
    <>
      <h5 className="mb-3">Course Selection</h5>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Course</label>
          <select
            name="course"
            className={`form-select ${errors.course ? "is-invalid" : ""}`}
            value={form.course}
            onChange={handleChange}
            disabled={courseLocked}
          >
            <option value="">Select a course</option>
            <option value="BA(JMC)">BA (JMC)</option>
            <option value="MCA">MCA</option>
          </select>
          {errors.course && <div className="invalid-feedback">{errors.course}</div>}
          {courseLocked && (
            <small className="text-muted">
              Course pre-selected from your enquiry: {draft.course}
            </small>
          )}
        </div>
        <div className="col-md-6">
          <label className="form-label">Campus Location</label>
          <select
            name="campus"
            className={`form-select ${errors.campus ? "is-invalid" : ""}`}
            value={form.campus}
            onChange={handleChange}
          >
            <option value="">Select campus</option>
            <option value="Delhi NCR">Delhi NCR</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Bangalore">Bangalore</option>
          </select>
          {errors.campus && <div className="invalid-feedback">{errors.campus}</div>}
        </div>
      </div>

      <div className="d-flex justify-content-between mt-4">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          type="button"
          className="btn text-white"
          style={{ backgroundColor: "#16a34a", border: "none" }}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default StudentCourse;

