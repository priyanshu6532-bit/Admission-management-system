import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const createVisitor = async (data) => {
  try {
    const visitorPayload = {
      name: `${data.firstName || ""} ${data.lastName || ""}`.trim(),
      email: data.email,
      phone: data.phone,
      courseInterested: data.course || "Not Selected",
      status: "NEW"
    };
    const response = await axios.post(`${API_BASE_URL}/visitor`, visitorPayload);
    return response;
  } catch (error) {
    throw error.response?.data || "Failed to create visitor";
  }
};

export const getVisitors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/visitor`);
    return response;
  } catch (error) {
    throw error.response?.data || "Failed to fetch visitors";
  }
};

export const updateVisitorStatus = async (id, status) => {
  try {
    // Backend takes status as a RequestParam
    const response = await axios.put(`${API_BASE_URL}/visitor/${id}/status?status=${status}`);
    return response;
  } catch (error) {
    throw error.response?.data || "Failed to update visitor status";
  }
};

export const registerUser = async (data) => {
  try {
    const registerPayload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      courseInterested: "Not Selected" // Default for generic registration where course isn't known yet
    };
    const response = await axios.post(`${API_BASE_URL}/auth/register`, registerPayload);
    return response;
  } catch (error) {
    throw error.response?.data?.message || "Registration failed";
  }
};

export const loginUser = async (data) => {
  // --- Temporary Hardcoded Admin Login ---
  if (data.username === "admin@bvicam.in" && data.password === "admin123") {
    return {
      data: {
        name: "Administrator",
        email: "admin@bvicam.in",
        role: "admin",
        token: "mock-admin-token"
      }
    };
  }
  // ---------------------------------------

  try {
    const loginPayload = {
      email: data.username,
      password: data.password
    };
    const response = await axios.post(`${API_BASE_URL}/auth/login`, loginPayload);
    return response;
  } catch (error) {
    throw error.response?.data?.message || "Login failed";
  }
};

export const createStudentApplication = async (draft, token) => {
  try {
    const applicationPayload = {
      // Step 1: Personal
      fullName: draft.fullName,
      fatherName: draft.fatherName,
      motherName: draft.motherName,
      dob: draft.dob,
      gender: draft.gender,
      nationality: draft.nationality,
      category: draft.category,
      aadhaarNumber: draft.aadhaar,
      bloodGroup: draft.bloodGroup,
      mobileNumber: draft.mobile,
      alternateContact: draft.alternateMobile,
      permAddressLine1: draft.permAddressLine1,
      permAddressLine2: draft.permAddressLine2,
      permCity: draft.permCity,
      permState: draft.permState,
      permPincode: draft.permPincode,
      corrAddressLine1: draft.corrAddressLine1,
      corrAddressLine2: draft.corrAddressLine2,
      corrCity: draft.corrCity,
      corrState: draft.corrState,
      corrPincode: draft.corrPincode,
      
      // Step 2: Academic
      tenthBoard: draft.tenthBoard,
      tenthSchool: draft.tenthSchool,
      tenthYearOfPassing: draft.tenthYear,
      tenthPercentage: draft.tenthPercent,
      twelfthBoard: draft.twelfthBoard,
      twelfthSchool: draft.twelfthSchool,
      twelfthStream: draft.twelfthStream,
      twelfthYearOfPassing: draft.twelfthYear,
      twelfthPercentage: draft.twelfthPercent,
      graduationUniversity: draft.gradUniversity,
      graduationDegree: draft.gradDegree,
      graduationYearOfPassing: draft.gradYear,
      graduationPercentage: draft.gradPercent,

      // Step 3: Course

      // Step 4: Declaration
      declarationAccepted: draft.declarationAccepted
    };

    const response = await axios.post(`${API_BASE_URL}/application/submit`, applicationPayload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response;
  } catch (error) {
    throw error.response?.data || "Failed to submit application!";
  }
};
