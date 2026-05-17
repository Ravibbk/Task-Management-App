import { useState, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import UserTable from "../../components/user/UserTable";
import AddUserModal from "./AddUserModal";
import { UserPlus, Users as UsersIcon } from "lucide-react";
import { getUsers, createUser, deleteUser } from "../../services/userService";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setApiError("");
      try {
        const response = await getUsers();
        setUsers(response.data.map((user) => ({ ...user, id: user._id || user.id })));
      } catch (error) {
        setApiError(error.response?.data?.message || "Unable to load users.");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  const addUser = async (data) => {
    try {
      const response = await createUser({ email: data.email, password: "TaskManager123!", role: data.role });
      setUsers((prev) => [...prev, { ...response.data, id: response.data.id || response.data._id }]);
      setModalOpen(false);
    } catch (error) {
      alert(error.response?.data?.message || "Unable to add user.");
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user? This action cannot be undone.");
    if (!confirmed) return;

    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Unable to delete user.");
    }
  };

  const stats = [
    { label: "Total Users", value: users.length, color: "#6366f1" },
    { label: "Admins", value: users.filter((u) => u.role === "ADMIN").length, color: "#ec4899" },
    { label: "Regular Users", value: users.filter((u) => u.role === "USER").length, color: "#10b981" },
  ];

  return (
    <DashboardLayout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "white", marginBottom: "4px" }}>User Management</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>{users.length} registered users</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="btn-primary"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <UserPlus size={16} /> Add User
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px", marginBottom: "24px" }}>
        {stats.map((s) => (
          <div key={s.label} className="glass-card" style={{ padding: "18px 22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "12px", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 600 }}>{s.label}</p>
              <p style={{ fontSize: "28px", fontWeight: 700, color: "white", fontFamily: "'Clash Display', sans-serif" }}>{s.value}</p>
            </div>
            <UsersIcon size={24} color={s.color} style={{ opacity: 0.6 }} />
          </div>
        ))}
      </div>

      {loading && (
        <div className="glass-card" style={{ padding: "40px 24px", textAlign: "center" }}>
          <p style={{ color: "white" }}>Loading users...</p>
        </div>
      )}
      {apiError && !loading && (
        <div className="glass-card" style={{ padding: "40px 24px", textAlign: "center", color: "#f87171" }}>
          {apiError}
        </div>
      )}
      {!loading && !apiError && <UserTable users={users} onDelete={handleDeleteUser} />}

      <AddUserModal isOpen={modalOpen} closeModal={() => setModalOpen(false)} onAdd={addUser} />
    </DashboardLayout>
  );
};

export default Users;
