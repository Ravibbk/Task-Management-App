import { Search, Bell, ChevronDown } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const Navbar = ({ title = "" }) => {
  const user = useAuth();
  const [notif, setNotif] = useState(3);

  return (
    <div
      style={{
        background: "rgba(13,13,31,0.8)",
        borderBottom: "1px solid var(--border)",
        padding: "16px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backdropFilter: "blur(20px)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Left - Search */}
      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        {title && (
          <div
            style={{
              color: "white",
              fontSize: "18px",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            {title}
          </div>
        )}
        <div style={{ position: "relative", width: "320px" }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
            }}
          />
          <input
            placeholder="Search tasks, users..."
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--glass-border)",
              borderRadius: "10px",
              padding: "10px 14px 10px 42px",
              color: "var(--text)",
              fontSize: "14px",
              width: "100%",
              outline: "none",
              fontFamily: "'Satoshi', sans-serif",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "var(--primary)";
              e.target.style.background = "rgba(99,102,241,0.05)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "var(--glass-border)";
              e.target.style.background = "rgba(255,255,255,0.04)";
            }}
          />
        </div>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* Notifications */}
        <button
          onClick={() => setNotif(0)}
          style={{
            position: "relative",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--glass-border)",
            borderRadius: "10px",
            padding: "10px",
            cursor: "pointer",
            color: "var(--text-muted)",
            display: "flex",
          }}
        >
          <Bell size={18} />
          {notif > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-4px",
                right: "-4px",
                background: "var(--danger)",
                color: "white",
                fontSize: "10px",
                fontWeight: 700,
                borderRadius: "50%",
                width: "18px",
                height: "18px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {notif}
            </span>
          )}
        </button>

        {/* Divider */}
        <div style={{ width: "1px", height: "32px", background: "var(--border)" }} />

        {/* User */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, var(--primary), var(--accent-pink))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "15px",
              fontWeight: 700,
              color: "white",
              fontFamily: "'Clash Display', sans-serif",
            }}
          >
            {(user?.email?.[0] || "A").toUpperCase()}
          </div>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)", lineHeight: 1.3 }}>
              {user?.email?.split("@")[0] || "Admin"}
            </p>
            <p style={{ fontSize: "11px", color: "var(--primary-light)", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              {user?.role || "Admin"}
            </p>
          </div>
          <ChevronDown size={14} color="var(--text-muted)" />
        </div>
      </div>
    </div >
  );
};

export default Navbar;