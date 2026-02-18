import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <Sidebar />
      <div className="flex-grow-1 p-4 bg-light">
        {children}
      </div>
    </div>
  );
}

export default Layout;
