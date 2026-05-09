import { useEffect, useState } from "react";
import { getVisitors } from "../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    newEnquiries: 0,
    admitted: 0,
    pending: 0
  });

  const loadData = async () => {
    try {
      const res = await getVisitors();
      const visitors = res.data;
      
      setStats({
        totalVisitors: visitors.length,
        newEnquiries: visitors.filter(v => v.status === "NEW").length,
        admitted: visitors.filter(v => v.status === "ADMITTED").length,
        pending: visitors.filter(v => v.status === "PENDING" || v.status === "IN_PROGRESS").length
      });
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <div className="col-md-3">
      <div className="card border-0 shadow-sm" style={{ borderRadius: "12px" }}>
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p className="text-muted small fw-bold mb-1">{title}</p>
              <h3 className="mb-0 fw-bold">{value}</h3>
            </div>
            <div 
              className={`rounded-circle d-flex align-items-center justify-content-center bg-light`} 
              style={{ width: "45px", height: "45px", color: color }}
            >
              <i className={`bi ${icon} fs-4`}></i>
            </div>
          </div>
          <div className="mt-3">
            <span className="text-success extra-small fw-bold">
              <i className="bi bi-arrow-up"></i> 12%
            </span>
            <span className="text-muted extra-small ms-1">since last month</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="row g-4 mb-4">
        <StatCard title="Total Visitors" value={stats.totalVisitors} icon="bi-people" color="#1d4ed8" />
        <StatCard title="New Enquiries" value={stats.newEnquiries} icon="bi-envelope-paper" color="#f59e0b" />
        <StatCard title="Admitted Students" value={stats.admitted} icon="bi-check-circle" color="#10b981" />
        <StatCard title="Pending Review" value={stats.pending} icon="bi-clock-history" color="#ef4444" />
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm" style={{ borderRadius: "12px" }}>
            <div className="card-header bg-white border-0 py-3">
              <h6 className="mb-0 fw-bold">Admission Trends</h6>
            </div>
            <div className="card-body p-5 text-center text-muted">
              <i className="bi bi-graph-up fs-1 d-block mb-3"></i>
              <p>Admission trend data will be displayed here as the backend evolves.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm" style={{ borderRadius: "12px" }}>
            <div className="card-header bg-white border-0 py-3">
              <h6 className="mb-0 fw-bold">Recent Activities</h6>
            </div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                <li className="d-flex gap-3 mb-3 pb-3 border-bottom border-light">
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px", flexShrink: 0 }}>
                    <i className="bi bi-plus-lg small"></i>
                  </div>
                  <div>
                    <p className="mb-0 small fw-bold">New Enquiry Received</p>
                    <p className="mb-0 extra-small text-muted">2 minutes ago</p>
                  </div>
                </li>
                <li className="d-flex gap-3 mb-0">
                  <div className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px", flexShrink: 0 }}>
                    <i className="bi bi-check-lg small"></i>
                  </div>
                  <div>
                    <p className="mb-0 small fw-bold">Student Admitted</p>
                    <p className="mb-0 extra-small text-muted">1 hour ago</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
