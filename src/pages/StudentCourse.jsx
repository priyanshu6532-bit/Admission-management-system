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
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.course) newErrors.course = "Please select a course.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    saveDraft(form);
    navigate("/student/application/declaration");
  };

  const handlePrevious = () => {
    saveDraft(form);
    navigate("/student/application/academic");
  };

  const courseLocked = !!draft.course;

  return (
    <>
      <h5 className="mb-3">Course Selection</h5>
      <div className="row g-3">
        <div className="col-md-12">
          <label className="form-label">Course <span className="text-danger">*</span></label>
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
            <small className="text-muted mt-1 d-block">
              Course pre-selected from your enquiry: {draft.course}
            </small>
          )}
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

