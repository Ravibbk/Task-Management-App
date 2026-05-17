import { Trash2, Shield, User } from "lucide-react";

const UserTable = ({ users, onDelete }) => {
  return (
    <div className="glass-card" style={{ overflow: "hidden" }}>
      <table className="dark-table" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>User</th>
            <th style={{ textAlign: "left" }}>Role</th>
            <th style={{ textAlign: "left" }}>Status</th>
            <th style={{ textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "36px", height: "36px", borderRadius: "10px",
                      background: `linear-gradient(135deg, ${user.role === "ADMIN" ? "#6366f1, #ec4899" : "#10b981, #059669"})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "13px", fontWeight: 700, color: "white",
                      fontFamily: "'Clash Display', sans-serif",
                    }}
                  >
                    {user.email[0].toUpperCase()}
                  </div>
                  <div>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)" }}>
                      {user.email}
                    </p>
                  </div>
                </div>
              </td>
              <td>
                <span
                  className="badge"
                  style={{
                    background: user.role === "ADMIN" ? "rgba(99,102,241,0.15)" : "rgba(16,185,129,0.15)",
                    color: user.role === "ADMIN" ? "#a5b4fc" : "#6ee7b7",
                    display: "inline-flex", alignItems: "center", gap: "4px",
                  }}
                >
                  {user.role === "ADMIN" ? <Shield size={10} /> : <User size={10} />}
                  {user.role}
                </span>
              </td>
              <td>
                <span
                  className="badge"
                  style={{ background: "rgba(16,185,129,0.1)", color: "#6ee7b7" }}
                >
                  Active
                </span>
              </td>
              <td style={{ textAlign: "right" }}>
                <button
                  onClick={() => onDelete(user.id)}
                  style={{
                    background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)",
                    borderRadius: "8px", padding: "7px 12px", color: "#fca5a5",
                    fontSize: "12px", cursor: "pointer", fontFamily: "'Satoshi', sans-serif",
                    fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "5px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.2)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
                >
                  <Trash2 size={13} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;