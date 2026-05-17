import DashboardLayout from "../../layouts/DashboardLayout";
import StatsCard from "../../components/common/StatsCard";
import RecentTasks from "../../components/task/RecentTasks";
import TaskSummary from "../../components/task/TaskSummary";
import { FolderOpen, ClipboardList, CheckCircle, Clock } from "lucide-react";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const user = useAuth();

  const stats = [
    { title: "Projects", value: "8", icon: <FolderOpen size={20} />, color: "#6366f1", trend: 12, },
    { title: "Total Tasks", value: "24", icon: <ClipboardList size={20} />, color: "#f59e0b", trend: 8 },
    { title: "Completed", value: "15", icon: <CheckCircle size={20} />, color: "#10b981", trend: 20 },
    { title: "Pending", value: "9", icon: <Clock size={20} />, color: "#ef4444", trend: -5 },
  ];

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div style={{ marginBottom: "28px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 700, color: "white", marginBottom: "6px" }}>
          {greeting()}, {user?.email?.split("@")[0] || "Admin"} 👋
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          Here's what's happening in your workspace today.
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "16px",
          marginBottom: "28px",
        }}
      >
        {stats.map((s) => (
          <StatsCard key={s.title} {...s} />
        ))}
      </div>

      {/* Widgets Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <RecentTasks />
        <TaskSummary />
      </div>

      {/* Activity Row */}
      <div style={{ marginTop: "20px" }}>
        <div
          className="glass-card"
          style={{
            padding: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "white", marginBottom: "4px" }}>
              🚀 Backend Integration Ready
            </h3>
            <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
              Connect your Express + MongoDB backend to replace mock data with real APIs
            </p>
          </div>
          <div
            style={{
              padding: "8px 18px",
              background: "linear-gradient(135deg, var(--primary), var(--primary-dark))",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: 600,
              color: "white",
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            View Setup Guide
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;