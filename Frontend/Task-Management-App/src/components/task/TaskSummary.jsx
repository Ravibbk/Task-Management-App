const TaskSummary = ({ tasks = [] }) => {
  const countByPriority = (p) =>
    tasks.length > 0
      ? tasks.filter((t) => t.priority === p).length
      : { High: 6, Medium: 4, Low: 2 }[p];

  const total = tasks.length > 0 ? tasks.length : 12;

  const priorities = [
    { label: "High", color: "#ef4444", bg: "rgba(239,68,68,0.15)", count: countByPriority("High") },
    { label: "Medium", color: "#f59e0b", bg: "rgba(245,158,11,0.15)", count: countByPriority("Medium") },
    { label: "Low", color: "#10b981", bg: "rgba(16,185,129,0.15)", count: countByPriority("Low") },
  ];

  const completedCount = tasks.length > 0 ? tasks.filter((t) => t.status === "Completed").length : 15;
  const completionRate = total > 0 ? Math.round((completedCount / total) * 100) : 63;

  return (
    <div className="glass-card" style={{ padding: "24px" }}>
      <h2 style={{ fontSize: "17px", fontWeight: 700, color: "white", marginBottom: "20px" }}>
        Priority Overview
      </h2>

      {/* Completion circle */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" }}>
        <div style={{ position: "relative", width: "70px", height: "70px" }}>
          <svg width="70" height="70" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="35" cy="35" r="28" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
            <circle
              cx="35" cy="35" r="28"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="6"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - completionRate / 100)}`}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1s ease" }}
            />
          </svg>
          <div style={{
            position: "absolute", inset: 0, display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: "14px", fontWeight: 700, color: "white",
            fontFamily: "'Clash Display', sans-serif",
          }}>
            {completionRate}%
          </div>
        </div>
        <div>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "white" }}>Completion Rate</p>
          <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>
            {completedCount} of {total} tasks done
          </p>
        </div>
      </div>

      {/* Priority bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        {priorities.map((p) => {
          const pct = total > 0 ? (p.count / total) * 100 : [75, 50, 25][priorities.indexOf(p)];
          return (
            <div key={p.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: p.color }} />
                  <span style={{ fontSize: "13px", color: "var(--text)", fontWeight: 500 }}>{p.label}</span>
                </div>
                <span style={{ fontSize: "13px", fontWeight: 700, color: p.color }}>
                  {p.count}
                </span>
              </div>
              <div
                style={{
                  height: "6px", borderRadius: "3px",
                  background: "rgba(255,255,255,0.06)", overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%", borderRadius: "3px",
                    background: p.color,
                    width: `${pct}%`,
                    transition: "width 1s ease",
                    boxShadow: `0 0 10px ${p.color}66`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskSummary;