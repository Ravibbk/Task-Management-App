import { useState } from "react";
import { X, UserPlus } from "lucide-react";

const AddUserModal = ({ isOpen, closeModal, onAdd }) => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("USER");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    onAdd({ email, role });
    setEmail(""); setRole("USER"); setError(""); closeModal();
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div
        style={{
          background: "linear-gradient(145deg, #1a1a2e, #16213e)",
          border: "1px solid var(--glass-border)",
          borderRadius: "20px", width: "100%", maxWidth: "420px",
          padding: "32px", boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "white" }}>Add New User</h2>
          <button
            onClick={closeModal}
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)", borderRadius: "8px", padding: "8px", cursor: "pointer", color: "var(--text-muted)", display: "flex" }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
              Email Address
            </label>
            <input
              className="input-dark"
              type="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
            />
            {error && <p style={{ color: "var(--danger)", fontSize: "12px", marginTop: "4px" }}>{error}</p>}
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
              Role
            </label>
            <select className="input-dark" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          <button type="submit" className="btn-primary" style={{ width: "100%", marginTop: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            <UserPlus size={16} /> Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;