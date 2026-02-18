import { Link } from "react-router-dom";
import SSMLogo from "../assets/images/SSM.png";

export default function Home() {
  return (
    <div
      className="min-vh-100 w-100 d-flex flex-column align-items-center"
      style={{
        backgroundImage: `url(${SSMLogo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "rgba(0,0,0,0.6)",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Hero section */}
      <section className="flex-grow-1 d-flex align-items-center justify-content-center w-100">
        <div className="text-center" style={{ maxWidth: "720px" }}>
          <h1 className="display-4 fw-bold text-white mb-3">
            Welcome to SSM College
          </h1>

          <p className="fs-5 text-light mb-4">
            Begin your admission journey with our modern, streamlined online
            process.
          </p>

          <div className="d-flex justify-content-center flex-wrap gap-3 mt-3">
            <Link
              to="/apply"
              className="btn btn-lg px-5 py-2 rounded-pill shadow-sm"
              style={{ backgroundColor: "#1d4ed8", color: "#ffffff", border: "none" }}
            >
              Apply Now
            </Link>
            <Link
              to="/login"
              className="btn btn-lg px-5 py-2 rounded-pill shadow-sm"
              style={{ backgroundColor: "#1d4ed8", color: "#ffffff", border: "none" }}
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Courses section */}
      <section className="w-100 py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">Courses Offered</h2>
          <div className="row justify-content-center g-4">
            <div className="col-md-5">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h3 className="card-title">MCA - Master of Computer Applications</h3>
                  <p className="card-text text-muted">
                    A professional postgraduate program focusing on advanced
                    software development, data structures, databases, networking,
                    and modern technologies to build industry-ready IT
                    professionals.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <h3 className="card-title">BA (JMC) - Journalism & Mass Communication</h3>
                  <p className="card-text text-muted">
                    An undergraduate program designed for aspiring journalists
                    and media professionals, covering reporting, digital media,
                    public relations, content creation, and media ethics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
