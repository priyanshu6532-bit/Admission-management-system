import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadDraft, saveDraft } from "../utils/studentApplicationStore";

function StudentAcademic() {
  const navigate = useNavigate();
  const draft = loadDraft();

  const [form, setForm] = useState({
    tenthBoard: draft.tenthBoard || "",
    tenthSchool: draft.tenthSchool || "",
    tenthYear: draft.tenthYear || "",
    tenthPercent: draft.tenthPercent || "",
    tenthMarksheet: draft.tenthMarksheet || null,
    twelfthBoard: draft.twelfthBoard || "",
    twelfthSchool: draft.twelfthSchool || "",
    twelfthStream: draft.twelfthStream || "",
    twelfthYear: draft.twelfthYear || "",
    twelfthPercent: draft.twelfthPercent || "",
    twelfthMarksheet: draft.twelfthMarksheet || null,
    gradUniversity: draft.gradUniversity || "",
    gradDegree: draft.gradDegree || "",
    gradYear: draft.gradYear || "",
    gradPercent: draft.gradPercent || "",
    gradMarksheet: draft.gradMarksheet || null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (name, file) => {
    setForm((prev) => ({ ...prev, [name]: file }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.tenthBoard.trim()) newErrors.tenthBoard = "10th board is required";
    if (!form.tenthSchool.trim()) newErrors.tenthSchool = "10th school is required";
    if (!form.tenthYear.trim()) newErrors.tenthYear = "10th year of passing is required";
    if (!form.tenthPercent.trim()) newErrors.tenthPercent = "10th percentage/CGPA is required";
    if (!form.tenthMarksheet) newErrors.tenthMarksheet = "10th marksheet is required";

    if (!form.twelfthBoard.trim()) newErrors.twelfthBoard = "12th board is required";
    if (!form.twelfthSchool.trim()) newErrors.twelfthSchool = "12th school is required";
    if (!form.twelfthStream.trim()) newErrors.twelfthStream = "12th stream is required";
    if (!form.twelfthYear.trim()) newErrors.twelfthYear = "12th year of passing is required";
    if (!form.twelfthPercent.trim()) newErrors.twelfthPercent = "12th percentage/CGPA is required";
    if (!form.twelfthMarksheet) newErrors.twelfthMarksheet = "12th marksheet is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    saveDraft(form);
    navigate("/student-application/course");
  };

  const handlePrevious = () => {
    saveDraft(form);
    navigate("/student-application/personal");
  };

  return (
    <>
      <h5 className="mb-3">Academic Information</h5>
      <div className="row g-3">
        <div className="col-12 mt-2">
          <h6>10th Details</h6>
        </div>
        <div className="col-md-6">
          <label className="form-label">Board Name</label>
          <input
            type="text"
            name="tenthBoard"
            className={`form-control ${errors.tenthBoard ? "is-invalid" : ""}`}
            value={form.tenthBoard}
            onChange={handleChange}
          />
          {errors.tenthBoard && <div className="invalid-feedback">{errors.tenthBoard}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">School Name</label>
          <input
            type="text"
            name="tenthSchool"
            className={`form-control ${errors.tenthSchool ? "is-invalid" : ""}`}
            value={form.tenthSchool}
            onChange={handleChange}
          />
          {errors.tenthSchool && <div className="invalid-feedback">{errors.tenthSchool}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Year of Passing</label>
          <input
            type="text"
            name="tenthYear"
            className={`form-control ${errors.tenthYear ? "is-invalid" : ""}`}
            value={form.tenthYear}
            onChange={handleChange}
          />
          {errors.tenthYear && <div className="invalid-feedback">{errors.tenthYear}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Percentage / CGPA</label>
          <input
            type="text"
            name="tenthPercent"
            className={`form-control ${errors.tenthPercent ? "is-invalid" : ""}`}
            value={form.tenthPercent}
            onChange={handleChange}
          />
          {errors.tenthPercent && <div className="invalid-feedback">{errors.tenthPercent}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Marksheet Upload</label>
          <input
            type="file"
            className={`form-control ${errors.tenthMarksheet ? "is-invalid" : ""}`}
            onChange={(e) => handleFileChange("tenthMarksheet", e.target.files[0])}
          />
          {errors.tenthMarksheet && <div className="invalid-feedback">{errors.tenthMarksheet}</div>}
        </div>

        <div className="col-12 mt-3">
          <h6>12th Details</h6>
        </div>
        <div className="col-md-6">
          <label className="form-label">Board Name</label>
          <input
            type="text"
            name="twelfthBoard"
            className={`form-control ${errors.twelfthBoard ? "is-invalid" : ""}`}
            value={form.twelfthBoard}
            onChange={handleChange}
          />
          {errors.twelfthBoard && <div className="invalid-feedback">{errors.twelfthBoard}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">School Name</label>
          <input
            type="text"
            name="twelfthSchool"
            className={`form-control ${errors.twelfthSchool ? "is-invalid" : ""}`}
            value={form.twelfthSchool}
            onChange={handleChange}
          />
          {errors.twelfthSchool && <div className="invalid-feedback">{errors.twelfthSchool}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Stream</label>
          <select
            name="twelfthStream"
            className={`form-select ${errors.twelfthStream ? "is-invalid" : ""}`}
            value={form.twelfthStream}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Science">Science</option>
            <option value="Commerce">Commerce</option>
            <option value="Arts">Arts</option>
          </select>
          {errors.twelfthStream && <div className="invalid-feedback">{errors.twelfthStream}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Year of Passing</label>
          <input
            type="text"
            name="twelfthYear"
            className={`form-control ${errors.twelfthYear ? "is-invalid" : ""}`}
            value={form.twelfthYear}
            onChange={handleChange}
          />
          {errors.twelfthYear && <div className="invalid-feedback">{errors.twelfthYear}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Percentage / CGPA</label>
          <input
            type="text"
            name="twelfthPercent"
            className={`form-control ${errors.twelfthPercent ? "is-invalid" : ""}`}
            value={form.twelfthPercent}
            onChange={handleChange}
          />
          {errors.twelfthPercent && <div className="invalid-feedback">{errors.twelfthPercent}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Marksheet Upload</label>
          <input
            type="file"
            className={`form-control ${errors.twelfthMarksheet ? "is-invalid" : ""}`}
            onChange={(e) => handleFileChange("twelfthMarksheet", e.target.files[0])}
          />
          {errors.twelfthMarksheet && <div className="invalid-feedback">{errors.twelfthMarksheet}</div>}
        </div>

        <div className="col-12 mt-3">
          <h6>Graduation (if applicable)</h6>
        </div>
        <div className="col-md-6">
          <label className="form-label">University</label>
          <input
            type="text"
            name="gradUniversity"
            className="form-control"
            value={form.gradUniversity}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Degree</label>
          <input
            type="text"
            name="gradDegree"
            className="form-control"
            value={form.gradDegree}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Year of Passing</label>
          <input
            type="text"
            name="gradYear"
            className="form-control"
            value={form.gradYear}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Percentage</label>
          <input
            type="text"
            name="gradPercent"
            className="form-control"
            value={form.gradPercent}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Upload Marksheet</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => handleFileChange("gradMarksheet", e.target.files[0])}
          />
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

export default StudentAcademic;

