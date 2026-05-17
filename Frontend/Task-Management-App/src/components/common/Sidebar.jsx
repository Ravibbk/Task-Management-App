import { LayoutDashboard, ClipboardList, Users, Settings, LogOut, Zap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const links = [
    { to: "/dashboard", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
    { to: "/tasks", icon: <ClipboardList size={18} />, label: "Tasks" },
    { to: "/users", icon: <Users size={18} />, label: "Users" },
    { to: "/settings", icon: <Settings size={18} />, label: "Settings" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "var(--sidebar-w)",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0d0d1f 0%, #111128 100%)",
        borderRight: "1px solid var(--border)",
        display: "flex",
        flexDirection: "column",
        padding: "24px 16px",
        flexShrink: 0,
        position: "sticky",
        top: 0,
        height: "100vh",
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: "36px", padding: "0 8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              background: "linear-gradient(135deg, var(--primary), var(--accent-pink))",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Zap size={18} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: "16px", fontWeight: 700, color: "white", lineHeight: 1.2 }}>
              TaskFlow
            </h1>
            <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>Workspace</p>
          </div>
        </div>
      </div>

      {/* Nav Label */}
      <p
        style={{
          fontSize: "10px",
          color: "var(--text-muted)",
          textTransform: "uppercase",
          letterSpacing: "1.5px",
          fontWeight: 600,
          marginBottom: "8px",
          padding: "0 8px",
        }}
      >
        Navigation
      </p>

      {/* Links */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`sidebar-link ${isActive ? "active" : ""}`}
            >
              {link.icon}
              {link.label}
              {isActive && (
                <div
                  style={{
                    marginLeft: "auto",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: "var(--primary-light)",
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
        <button
          onClick={handleLogout}
          className="sidebar-link"
          style={{
            width: "100%",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--danger)",
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;