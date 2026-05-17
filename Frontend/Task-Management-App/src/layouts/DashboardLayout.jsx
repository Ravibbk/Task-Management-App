import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--bg)",
      }}
    >
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <Navbar />
        <main
          style={{ flex: 1, padding: "28px", overflowY: "auto" }}
          className="page-enter"
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;