import { useNavigate } from "react-router-dom";
import { Eye, Edit2, Trash2, Calendar, User } from "lucide-react";
import formatDate from "../../utils/formatDate";

const TaskCard = ({ task, onDelete, onEdit }) => {
  const navigate = useNavigate();

  const priorityConfig = {
    High: { color: "#ef4444", bg: "rgba(239,68,68,0.12)", border: "rgba(239,68,68,0.25)" },
    Medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.25)" },
    Low: { color: "#10b981", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.25)" },
  };

  const statusConfig = {
    Pending: { color: "#94a3b8", bg: "rgba(148,163,184,0.1)" },
    "In Progress": { color: "#a5b4fc", bg: "rgba(99,102,241,0.15)" },
    Completed: { color: "#6ee7b7", bg: "rgba(16,185,129,0.15)" },
  };

  const pc = priorityConfig[task.priority] || priorityConfig.Medium;
  const sc = statusConfig[task.status] || statusConfig.Pending;

  return (
    <div
      className="task-card glass-card"
      style={{ padding: "20px", position: "relative", overflow: "hidden" }}
    >
      {/* Priority stripe */}
      <div
        style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "4px",
          background: pc.color, borderRadius: "16px 0 0 16px",
        }}
      />

      <div style={{ paddingLeft: "12px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
          <h3
            style={{
              fontSize: "15px", fontWeight: 700, color: "white",
              flex: 1, marginRight: "10px", lineHeight: 1.4,
            }}
          >
            {task.title}
          </h3>
          <span
            className="badge"
            style={{ background: sc.bg, color: sc.color, whiteSpace: "nowrap" }}
          >
            {task.status}
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6,
            marginBottom: "14px",
            display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}
        >
          {task.description || "No description provided"}
        </p>

        {/* Meta */}
        <div style={{ display: "flex", gap: "16px", marginBottom: "16px", flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span
              className="badge"
              style={{ background: pc.bg, color: pc.color, border: `1px solid ${pc.border}` }}
            >
              {task.priority}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <User size={13} color="var(--text-muted)" />
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              {task.assignedTo || "Unassigned"}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <Calendar size={13} color="var(--text-muted)" />
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>
              {formatDate(task.dueDate)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => navigate(`/task-details/${task.id}`)}
            style={{
              flex: 1, padding: "8px", borderRadius: "8px",
              background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)",
              color: "var(--primary-light)", fontSize: "12px", fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
              transition: "all 0.2s", fontFamily: "'Satoshi', sans-serif",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(99,102,241,0.25)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(99,102,241,0.12)"}
          >
            <Eye size={13} /> View
          </button>
          <button
            onClick={() => onEdit(task)}
            style={{
              flex: 1, padding: "8px", borderRadius: "8px",
              background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)",
              color: "#6ee7b7", fontSize: "12px", fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
              transition: "all 0.2s", fontFamily: "'Satoshi', sans-serif",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(16,185,129,0.2)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(16,185,129,0.1)"}
          >
            <Edit2 size={13} /> Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            style={{
              flex: 1, padding: "8px", borderRadius: "8px",
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)",
              color: "#fca5a5", fontSize: "12px", fontWeight: 600, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "5px",
              transition: "all 0.2s", fontFamily: "'Satoshi', sans-serif",
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.2)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "rgba(239,68,68,0.1)"}
          >
            <Trash2 size={13} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;