import { useEffect, useState } from "react";
import { getVisitors, updateVisitorStatus } from "../services/api";
import StatusBadge from "../components/StatusBadge";
import Layout from "../components/Layout";


function AdminDashboard() {
  const [visitors, setVisitors] = useState([]);

  const loadData = async () => {
    const res = await getVisitors();
    setVisitors(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const admit = async (id) => {
    await updateVisitorStatus(id, "ADMITTED");
    loadData();
  };

  return (
    <Layout>
    <div>
      <h2>Admin Dashboard</h2>
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((v) => (
            <tr key={v.id}>
              <td>{v.name}</td>
              <td>{v.email}</td>
              <td><StatusBadge status={v.status} /></td>
              <td>
                {v.status !== "ADMITTED" && (
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => admit(v.id)}
                  >
                    Admit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Layout>
  );
}

export default AdminDashboard;
