import DashboardLayout from "../../layouts/DashboardLayout";
import { User, Bell, Palette, Shield, Save } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Settings = () => {
  const user = useAuth();

  const sections = [
    {
      icon: <User size={18} />, label: "Profile Settings", color: "#6366f1",
      items: ["Display Name", "Email Address", "Profile Picture", "Bio"],
    },
    {
      icon: <Bell size={18} />, label: "Notifications", color: "#f59e0b",
      items: ["Email Notifications", "Task Reminders", "Weekly Digest", "Mobile Push"],
    },
    {
      icon: <Palette size={18} />, label: "Appearance", color: "#ec4899",
      items: ["Theme Mode", "Accent Color", "Font Size", "Compact View"],
    },
    {
      icon: <Shield size={18} />, label: "Security", color: "#10b981",
      items: ["Change Password", "Two-Factor Auth", "Active Sessions", "Login History"],
    },
  ];

  return (
    <DashboardLayout>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "white", marginBottom: "4px" }}>Settings</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Manage your account preferences</p>
      </div>

      {/* Profile card */}
      <div className="glass-card" style={{ padding: "24px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "20px", flexWrap: "wrap" }}>
        <div
          style={{
            width: "64px", height: "64px", borderRadius: "16px",
            background: "linear-gradient(135deg, var(--primary), var(--accent-pink))",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "24px", fontWeight: 700, color: "white",
            fontFamily: "'Clash Display', sans-serif",
          }}
        >
          {(user?.email?.[0] || "A").toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "white", marginBottom: "4px" }}>
            {user?.email?.split("@")[0] || "Admin User"}
          </h2>
          <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>{user?.email || "admin@example.com"}</p>
          <span className="badge" style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc", marginTop: "6px", display: "inline-flex" }}>
            {user?.role || "ADMIN"}
          </span>
        </div>
        <button className="btn-primary" style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }}>
          <Save size={14} /> Save Changes
        </button>
      </div>

      {/* Setting sections */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
        {sections.map((section) => (
          <div key={section.label} className="glass-card" style={{ padding: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "36px", height: "36px", borderRadius: "10px",
                  background: `${section.color}22`, border: `1px solid ${section.color}44`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: section.color,
                }}
              >
                {section.icon}
              </div>
              <h3 style={{ fontSize: "14px", fontWeight: 700, color: "white" }}>{section.label}</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              {section.items.map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 12px", borderRadius: "8px", cursor: "pointer",
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <span style={{ fontSize: "13px", color: "var(--text-muted)" }}>{item}</span>
                  <span style={{ fontSize: "12px", color: section.color }}>Edit →</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Settings;