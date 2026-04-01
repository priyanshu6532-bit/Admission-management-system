import { Link } from "react-router-dom";

function EnquirySuccess() {
    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-8 col-lg-6">
                <div className="card shadow-lg border-0 text-center p-5">
                    <div className="mb-4 text-success">
                        <i className="bi bi-check-circle-fill" style={{ fontSize: "4rem" }}></i>
                    </div>
                    <h3 className="mb-3">Congratulations!</h3>
                    <p className="fs-5 text-muted mb-4">
                        You have successfully generated an enquiry.
                    </p>
                    <hr />
                    <p className="mt-3">
                        If you want to proceed and register now, click the button below.
                    </p>
                    <Link
                        to="/register"
                        className="btn btn-lg w-100 mt-3 text-white"
                        style={{ backgroundColor: "#1d4ed8", border: "none" }}
                    >
                        Register Now
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default EnquirySuccess;
