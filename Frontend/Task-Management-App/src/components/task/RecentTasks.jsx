import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecentTasks = ({ tasks = [] }) => {
  const navigate = useNavigate();

  const defaultTasks = [
    { id: 1, title: "Dashboard UI", status: "Pending", priority: "High" },
    { id: 2, title: "Authentication API", status: "Completed", priority: "Medium" },
    { id: 3, title: "PDF Upload Feature", status: "In Progress", priority: "High" },
  ];

  const displayTasks = tasks.length > 0 ? tasks.slice(0, 5) : defaultTasks;

  const statusConfig = {
    Pending: { color: "#94a3b8", bg: "rgba(148,163,184,0.1)", dot: "#94a3b8" },
    "In Progress": { color: "#a5b4fc", bg: "rgba(99,102,241,0.15)", dot: "#6366f1" },
    Completed: { color: "#6ee7b7", bg: "rgba(16,185,129,0.15)", dot: "#10b981" },
  };

  const priorityDot = { High: "#ef4444", Medium: "#f59e0b", Low: "#10b981" };

  return (
    <div className="glass-card" style={{ padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2 style={{ fontSize: "17px", fontWeight: 700, color: "white" }}>Recent Tasks</h2>
        <button
          onClick={() => navigate("/tasks")}
          style={{
            background: "none", border: "none", cursor: "pointer",
            color: "var(--primary-light)", fontSize: "13px",
            display: "flex", alignItems: "center", gap: "4px",
            fontFamily: "'Satoshi', sans-serif", fontWeight: 600,
          }}
        >
          View all <ArrowRight size={14} />
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {displayTasks.map((task, index) => {
          const sc = statusConfig[task.status] || statusConfig.Pending;
          const pColor = priorityDot[task.priority] || "#94a3b8";
          return (
            <div
              key={task.id || index}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "12px", borderRadius: "10px",
                transition: "background 0.2s", cursor: "pointer",
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.03)"}
              onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
              onClick={() => navigate(`/task-details/${task.id}`)}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "8px", height: "8px", borderRadius: "50%",
                    background: pColor, flexShrink: 0,
                  }}
                />
                <span style={{ fontSize: "14px", fontWeight: 500, color: "var(--text)" }}>
                  {task.title}
                </span>
              </div>
              <span
                className="badge"
                style={{ background: sc.bg, color: sc.color }}
              >
                {task.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentTasks;