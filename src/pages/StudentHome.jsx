import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

function StudentHome() {
    const { user } = useAuth(); 

    return (
        <div className="h-100 d-flex flex-column align-items-center justify-content-center text-center">
            <div className="mb-4">
                <i className="bi bi-person-circle text-primary" style={{ fontSize: "5rem" }}></i>
            </div>
            <h2 className="mb-3">Welcome, {user?.name || user?.token || "Student"}!</h2>
            <p className="fs-5 text-muted mb-4 max-w-md">
                We are thrilled to have you here. To continue with your admission journey,
                please complete your application form.
            </p>
            <Link
                to="/student/application"
                className="btn btn-lg px-4 py-2 text-white shadow-sm"
                style={{ backgroundColor: "#1d4ed8", border: "none", borderRadius: "8px" }}
            >
                Fill Application Form <i className="bi bi-arrow-right ms-2"></i>
            </Link>
        </div>
    );
}

export default StudentHome;
