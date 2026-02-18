import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createStudentApplication } from "../services/api";
import { loadDraft, saveDraft, clearDraft } from "../utils/studentApplicationStore";

function StudentDeclaration() {
  const navigate = useNavigate();
  const draft = loadDraft();

  const [form, setForm] = useState({
    declarationAccepted: !!draft.declarationAccepted,
    signatureFile: draft.signatureFile || null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: checked }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (file) => {
    setForm((prev) => ({ ...prev, signatureFile: file }));
    setErrors((prev) => ({ ...prev, signatureFile: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.declarationAccepted) {
      newErrors.declarationAccepted = "You must accept the declaration";
    }
    if (!form.signatureFile) {
      newErrors.signatureFile = "Digital signature upload is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePrevious = () => {
    saveDraft(form);
    navigate("/student-application/course");
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const finalData = { ...draft, ...form };
    const res = await createStudentApplication(finalData);
    const saved = res.data;

    const studentProfile = {
      applicationId: saved.id,
      fullName: saved.fullName,
      course: saved.course,
      campus: saved.campus,
      username: saved.username,
      password: saved.defaultPassword,
    };

    localStorage.setItem("studentProfile", JSON.stringify(studentProfile));
    clearDraft();
    alert("Student application submitted successfully! Login details have been sent to your email.");
    navigate("/student");
  };

  return (
    <>
      <h5 className="mb-3">Declaration</h5>
      <div className="mb-3 form-check">
        <input
          className={`form-check-input ${errors.declarationAccepted ? "is-invalid" : ""}`}
          type="checkbox"
          id="declarationAccepted"
          name="declarationAccepted"
          checked={form.declarationAccepted}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="declarationAccepted">
          I declare that the information provided is true and correct.
        </label>
        {errors.declarationAccepted && (
          <div className="invalid-feedback d-block">
            {errors.declarationAccepted}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Digital Signature (Upload Signature)</label>
        <input
          type="file"
          className={`form-control ${errors.signatureFile ? "is-invalid" : ""}`}
          onChange={(e) => handleFileChange(e.target.files[0])}
        />
        {errors.signatureFile && (
          <div className="invalid-feedback">{errors.signatureFile}</div>
        )}
      </div>

      <p className="text-muted mt-3">
        After submission, your student account will be created and login details
        will be sent to your registered email address.
      </p>

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
          onClick={handleSubmit}
        >
          Submit Application
        </button>
      </div>
    </>
  );
}

export default StudentDeclaration;

