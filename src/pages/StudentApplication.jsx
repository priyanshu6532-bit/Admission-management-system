import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import StudentPersonal from "./StudentPersonal";
import StudentAcademic from "./StudentAcademic";
import StudentCourse from "./StudentCourse";
import StudentDeclaration from "./StudentDeclaration";

const steps = ["Personal Information", "Academic Information", "Course Selection", "Declaration"];

function getStepFromPath(pathname) {
  if (pathname.includes("/personal")) return 1;
  if (pathname.includes("/academic")) return 2;
  if (pathname.includes("/course")) return 3;
  if (pathname.includes("/declaration")) return 4;
  return 1;
}

function StudentApplication() {
  const location = useLocation();
  const step = getStepFromPath(location.pathname);

  return (
    <div className="row justify-content-center">
      <div className="col-md-10 col-lg-9">
        <div className="card shadow-lg border-0">
          <div
            className="card-header text-white"
            style={{ background: "linear-gradient(90deg,#16a34a,#22c55e)" }}
          >
            <h4 className="mb-0 text-center">Student Admission Application</h4>
            <div className="d-flex justify-content-between mt-3">
              {steps.map((label, index) => {
                const stepNumber = index + 1;
                const active = stepNumber === step;
                return (
                  <div
                    key={label}
                    className={`d-flex flex-column align-items-center flex-fill ${
                      active ? "fw-bold text-white" : "text-light"
                    }`}
                  >
                    <div
                      className={`rounded-circle d-flex align-items-center justify-content-center mb-1 ${
                        active ? "bg-white text-success" : "border border-light"
                      }`}
                      style={{ width: 32, height: 32 }}
                    >
                      {stepNumber}
                    </div>
                    <small className="text-center">{label}</small>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="card-body">
            <Routes>
              <Route path="personal" element={<StudentPersonal />} />
              <Route path="academic" element={<StudentAcademic />} />
              <Route path="course" element={<StudentCourse />} />
              <Route path="declaration" element={<StudentDeclaration />} />
              <Route path="*" element={<Navigate to="personal" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentApplication;
