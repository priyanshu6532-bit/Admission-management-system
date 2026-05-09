import { useEffect, useState } from "react";
import { getVisitors, updateVisitorStatus } from "../services/api";
import StatusBadge from "../components/StatusBadge";

function AdminApplications() {
  const [visitors, setVisitors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadData = async () => {
    try {
      const res = await getVisitors();
      setVisitors(res.data);
    } catch (err) {
      console.error("Failed to load applications", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateVisitorStatus(id, status);
      loadData();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const filteredVisitors = visitors.filter(v => 
    v.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card border-0 shadow-sm" style={{ borderRadius: "12px" }}>
      <div className="card-header bg-white border-0 py-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0 fw-bold">Admission Applications</h5>
        <div className="d-flex gap-2">
            <div className="input-group input-group-sm" style={{ width: "250px" }}>
                <span className="input-group-text bg-light border-0"><i className="bi bi-search"></i></span>
                <input 
                    type="text" 
                    className="form-control bg-light border-0" 
                    placeholder="Search students..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button className="btn btn-primary btn-sm px-3" onClick={loadData}>
                <i className="bi bi-arrow-clockwise"></i> Refresh
            </button>
        </div>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-4 py-3 border-0">Student Name</th>
                <th className="py-3 border-0">Email / Contact</th>
                <th className="py-3 border-0">Course</th>
                <th className="py-3 border-0 text-center">Status</th>
                <th className="pe-4 py-3 border-0 text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisitors.length > 0 ? (
                filteredVisitors.map((v) => (
                  <tr key={v.id}>
                    <td className="ps-4">
                      <div className="fw-bold text-dark">{v.name}</div>
                      <div className="extra-small text-muted">ID: #APP-{v.id}</div>
                    </td>
                    <td>
                      <div className="small">{v.email}</div>
                      <div className="extra-small text-muted">{v.phone || "No phone"}</div>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark fw-normal border">
                        {v.courseInterested || "N/A"}
                      </span>
                    </td>
                    <td className="text-center">
                      <StatusBadge status={v.status} />
                    </td>
                    <td className="pe-4 text-end">
                      <div className="d-flex justify-content-end gap-2">
                        <button 
                            className="btn btn-outline-primary btn-sm"
                            title="View Full Application"
                            onClick={() => alert("Viewing full application for " + v.name)}
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        {v.status !== "ADMITTED" && (
                          <button
                            className="btn btn-success btn-sm"
                            onClick={() => handleStatusUpdate(v.id, "ADMITTED")}
                          >
                            Admit
                          </button>
                        )}
                        <button className="btn btn-outline-secondary btn-sm">
                            <i className="bi bi-three-dots-vertical"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    No applications found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminApplications;
