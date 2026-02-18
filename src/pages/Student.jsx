export default function Student() {
  const stored = localStorage.getItem("studentProfile");
  const profile = stored ? JSON.parse(stored) : null;

  if (!profile) {
    return (
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="alert alert-info mt-4">
            No student profile found. Please complete the student application
            first.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card shadow-sm border-0">
          <div className="card-header bg-dark text-white text-center">
            <h4>Student Account Details</h4>
          </div>
          <div className="card-body">
            <p><strong>Name:</strong> {profile.fullName}</p>
            <p><strong>Application ID:</strong> {profile.applicationId}</p>
            <p><strong>Course:</strong> {profile.course}</p>
            <p><strong>Campus:</strong> {profile.campus}</p>
            <p><strong>Email / Username:</strong> {profile.username}</p>
            <p><strong>Default Password:</strong> {profile.password}</p>
            <p className="text-muted mt-3">
              Please change your password after first login. Login details have
              also been sent to your registered email (simulated).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

