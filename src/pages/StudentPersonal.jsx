import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadDraft, saveDraft } from "../utils/studentApplicationStore";

function StudentPersonal() {
  const navigate = useNavigate();
  const location = useLocation();
  const draft = loadDraft();

  const [form, setForm] = useState({
    fullName: draft.fullName || "",
    fatherName: draft.fatherName || "",
    motherName: draft.motherName || "",
    dob: draft.dob || "",
    gender: draft.gender || "",
    nationality: draft.nationality || "",
    category: draft.category || "",
    aadhaar: draft.aadhaar || "",
    bloodGroup: draft.bloodGroup || "",
    email: draft.email || "",
    mobile: draft.mobile || "",
    alternateMobile: draft.alternateMobile || "",
    permAddressLine1: draft.permAddressLine1 || "",
    permAddressLine2: draft.permAddressLine2 || "",
    permCity: draft.permCity || "",
    permState: draft.permState || "",
    permPincode: draft.permPincode || "",
    corrAddressLine1: draft.corrAddressLine1 || "",
    corrAddressLine2: draft.corrAddressLine2 || "",
    corrCity: draft.corrCity || "",
    corrState: draft.corrState || "",
    corrPincode: draft.corrPincode || "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location.state?.course) {
      saveDraft({ course: location.state.course });
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.fatherName.trim()) newErrors.fatherName = "Father's name is required";
    if (!form.motherName.trim()) newErrors.motherName = "Mother's name is required";
    if (!form.dob) newErrors.dob = "Date of birth is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.nationality.trim()) newErrors.nationality = "Nationality is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!form.mobile.trim()) newErrors.mobile = "Mobile number is required";
    if (!form.permAddressLine1.trim()) newErrors.permAddressLine1 = "Permanent address line 1 is required";
    if (!form.permCity.trim()) newErrors.permCity = "Permanent city is required";
    if (!form.permState.trim()) newErrors.permState = "Permanent state is required";
    if (!form.permPincode.trim()) newErrors.permPincode = "Permanent pincode is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    saveDraft(form);
    navigate("/student-application/academic");
  };

  return (
    <>
      <h5 className="mb-3">Personal Information</h5>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Full Name (as per 10th certificate)</label>
          <input
            type="text"
            name="fullName"
            className={`form-control ${errors.fullName ? "is-invalid" : ""}`}
            value={form.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Father's Name</label>
          <input
            type="text"
            name="fatherName"
            className={`form-control ${errors.fatherName ? "is-invalid" : ""}`}
            value={form.fatherName}
            onChange={handleChange}
          />
          {errors.fatherName && <div className="invalid-feedback">{errors.fatherName}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Mother's Name</label>
          <input
            type="text"
            name="motherName"
            className={`form-control ${errors.motherName ? "is-invalid" : ""}`}
            value={form.motherName}
            onChange={handleChange}
          />
          {errors.motherName && <div className="invalid-feedback">{errors.motherName}</div>}
        </div>
        <div className="col-md-3">
          <label className="form-label">Date of Birth</label>
          <input
            type="date"
            name="dob"
            className={`form-control ${errors.dob ? "is-invalid" : ""}`}
            value={form.dob}
            onChange={handleChange}
          />
          {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
        </div>
        <div className="col-md-3">
          <label className="form-label">Gender</label>
          <select
            name="gender"
            className={`form-select ${errors.gender ? "is-invalid" : ""}`}
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Nationality</label>
          <input
            type="text"
            name="nationality"
            className={`form-control ${errors.nationality ? "is-invalid" : ""}`}
            value={form.nationality}
            onChange={handleChange}
          />
          {errors.nationality && <div className="invalid-feedback">{errors.nationality}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Category</label>
          <select
            name="category"
            className={`form-select ${errors.category ? "is-invalid" : ""}`}
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="EWS">EWS</option>
          </select>
          {errors.category && <div className="invalid-feedback">{errors.category}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Aadhaar Number (Optional)</label>
          <input
            type="text"
            name="aadhaar"
            className="form-control"
            value={form.aadhaar}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Blood Group</label>
          <select
            name="bloodGroup"
            className={`form-select ${errors.bloodGroup ? "is-invalid" : ""}`}
            value={form.bloodGroup}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          {errors.bloodGroup && <div className="invalid-feedback">{errors.bloodGroup}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            name="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Mobile Number</label>
          <input
            type="tel"
            name="mobile"
            className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
            value={form.mobile}
            onChange={handleChange}
          />
          {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Alternate Contact Number</label>
          <input
            type="tel"
            name="alternateMobile"
            className="form-control"
            value={form.alternateMobile}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 mt-3">
          <h6>Permanent Address</h6>
        </div>
        <div className="col-md-6">
          <label className="form-label">Address Line 1</label>
          <input
            type="text"
            name="permAddressLine1"
            className={`form-control ${errors.permAddressLine1 ? "is-invalid" : ""}`}
            value={form.permAddressLine1}
            onChange={handleChange}
          />
          {errors.permAddressLine1 && (
            <div className="invalid-feedback">{errors.permAddressLine1}</div>
          )}
        </div>
        <div className="col-md-6">
          <label className="form-label">Address Line 2</label>
          <input
            type="text"
            name="permAddressLine2"
            className="form-control"
            value={form.permAddressLine2}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">City</label>
          <input
            type="text"
            name="permCity"
            className={`form-control ${errors.permCity ? "is-invalid" : ""}`}
            value={form.permCity}
            onChange={handleChange}
          />
          {errors.permCity && <div className="invalid-feedback">{errors.permCity}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">State</label>
          <input
            type="text"
            name="permState"
            className={`form-control ${errors.permState ? "is-invalid" : ""}`}
            value={form.permState}
            onChange={handleChange}
          />
          {errors.permState && <div className="invalid-feedback">{errors.permState}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Pincode</label>
          <input
            type="text"
            name="permPincode"
            className={`form-control ${errors.permPincode ? "is-invalid" : ""}`}
            value={form.permPincode}
            onChange={handleChange}
          />
          {errors.permPincode && <div className="invalid-feedback">{errors.permPincode}</div>}
        </div>

        <div className="col-12 mt-3">
          <h6>Correspondence Address (if different)</h6>
        </div>
        <div className="col-md-6">
          <label className="form-label">Address Line 1</label>
          <input
            type="text"
            name="corrAddressLine1"
            className="form-control"
            value={form.corrAddressLine1}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Address Line 2</label>
          <input
            type="text"
            name="corrAddressLine2"
            className="form-control"
            value={form.corrAddressLine2}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">City</label>
          <input
            type="text"
            name="corrCity"
            className="form-control"
            value={form.corrCity}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">State</label>
          <input
            type="text"
            name="corrState"
            className="form-control"
            value={form.corrState}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Pincode</label>
          <input
            type="text"
            name="corrPincode"
            className="form-control"
            value={form.corrPincode}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="d-flex justify-content-end mt-4">
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

export default StudentPersonal;

