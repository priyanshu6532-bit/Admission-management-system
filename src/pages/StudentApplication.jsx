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
  return (
    <div className="w-100">
      <Routes>
        <Route path="personal" element={<StudentPersonal />} />
        <Route path="academic" element={<StudentAcademic />} />
        <Route path="course" element={<StudentCourse />} />
        <Route path="declaration" element={<StudentDeclaration />} />
        <Route path="*" element={<Navigate to="personal" replace />} />
      </Routes>
    </div>
  );
}

export default StudentApplication;
