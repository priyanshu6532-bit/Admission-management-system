import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "250px" }}
    >
      <h4 className="mb-4">Admin Panel</h4>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/admin">
            <i className="bi bi-speedometer2 me-2"></i>
            Dashboard
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
