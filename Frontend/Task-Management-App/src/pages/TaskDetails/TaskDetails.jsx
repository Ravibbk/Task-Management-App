import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { ArrowLeft, FileText, Download, Eye, Calendar, User, Flag, Activity } from "lucide-react";
import { getTaskById } from "../../services/taskService";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTask = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getTaskById(id);
        setTask({ ...response.data, id: response.data._id || response.data.id });
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load task details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadTask();
    }
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <div style={{ color: "white", textAlign: "center", padding: "80px 20px" }}>Loading task details...</div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div style={{ color: "#f87171", textAlign: "center", padding: "80px 20px" }}>{error}</div>
      </DashboardLayout>
    );
  }

  if (!task) {
    return (
      <DashboardLayout>
        <div style={{ color: "white", textAlign: "center", padding: "80px 20px" }}>Task not found.</div>
      </DashboardLayout>
    );
  }

  const priorityColor = { High: "#ef4444", Medium: "#f59e0b", Low: "#10b981" };
  const statusConfig = {
    Pending: { color: "#94a3b8", bg: "rgba(148,163,184,0.1)" },
    "In Progress": { color: "#a5b4fc", bg: "rgba(99,102,241,0.15)" },
    Completed: { color: "#6ee7b7", bg: "rgba(16,185,129,0.15)" },
  };
  const sc = statusConfig[task.status] || statusConfig.Pending;
  const pc = priorityColor[task.priority] || "#f59e0b";
  const attachments = Array.isArray(task.attachments) ? task.attachments : [];

  return (
    <DashboardLayout>
      <button
        onClick={() => navigate("/tasks")}
        style={{
          display: "flex", alignItems: "center", gap: "8px",
          background: "none", border: "none", cursor: "pointer",
          color: "var(--text-muted)", fontSize: "14px", marginBottom: "20px",
          fontFamily: "'Satoshi', sans-serif", fontWeight: 500,
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = "var(--text)"}
        onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}
      >
        <ArrowLeft size={16} /> Back to Tasks
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "20px", alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="glass-card" style={{ padding: "28px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "5px", background: pc, borderRadius: "16px 0 0 16px" }} />
            <div style={{ paddingLeft: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px", flexWrap: "wrap", gap: "10px" }}>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "white" }}>{task.title}</h1>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  <span className="badge" style={{ background: sc.bg, color: sc.color }}>{task.status}</span>
                  <span className="badge" style={{ background: `${pc}22`, color: pc, border: `1px solid ${pc}44` }}>
                    <Flag size={10} style={{ display: "inline", marginRight: "3px" }} />
                    {task.priority}
                  </span>
                </div>
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "15px", lineHeight: 1.7 }}>{task.description}</p>
            </div>
          </div>

          <div className="glass-card" style={{ padding: "24px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 700, color: "white", marginBottom: "18px" }}>Task Details</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {[
                { label: "Assigned To", value: task.assignedTo || "Unassigned", icon: <User size={14} /> },
                { label: "Due Date", value: task.dueDate ? new Date(task.dueDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "No date", icon: <Calendar size={14} /> },
                { label: "Priority", value: task.priority, icon: <Flag size={14} />, color: pc },
                { label: "Status", value: task.status, icon: <Activity size={14} />, color: sc.color },
              ].map((item) => (
                <div key={item.label} style={{ padding: "14px", background: "rgba(255,255,255,0.03)", borderRadius: "10px", border: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px", color: "var(--text-muted)", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px" }}>
                    {item.icon} {item.label}
                  </div>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: item.color || "var(--text)" }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card" style={{ padding: "24px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: "white", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <FileText size={16} color="var(--primary-light)" /> Attachments ({attachments.length})
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {attachments.length > 0 ? attachments.map((attachment, index) => {
              const fileUrl = `/uploads/${attachment.fileName}`;
              return (
                <div key={index} style={{ background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: "10px", padding: "14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                    <div style={{ width: "34px", height: "34px", borderRadius: "8px", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <FileText size={16} color="#fca5a5" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{attachment.originalName}</p>
                      <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>PDF Document</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => window.open(fileUrl, "_blank")}
                      style={{ flex: 1, padding: "7px", borderRadius: "7px", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", color: "var(--primary-light)", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", fontFamily: "'Satoshi', sans-serif" }}
                    >
                      <Eye size={12} /> View
                    </button>
                    <a
                      href={fileUrl}
                      download={attachment.originalName}
                      style={{ flex: 1, padding: "7px", borderRadius: "7px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#6ee7b7", fontSize: "12px", fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "4px", fontFamily: "'Satoshi', sans-serif", textDecoration: "none" }}
                    >
                      <Download size={12} /> Download
                    </a>
                  </div>
                </div>
              );
            }) : (
              <div style={{ padding: "20px", textAlign: "center", color: "var(--text-muted)", border: "1px dashed rgba(255,255,255,0.12)", borderRadius: "12px" }}>
                No attachments available.
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TaskDetails;
