const StatsCard = ({ title, value, icon, color = "#6366f1", trend, sub }) => {
  return (
    <div
      className="stats-card glass-card"
      style={{
        padding: "24px",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: "-20px",
          right: "-20px",
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p
            style={{
              fontSize: "12px",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "1px",
              fontWeight: 600,
              marginBottom: "10px",
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontSize: "36px",
              fontWeight: 700,
              color: "white",
              fontFamily: "'Clash Display', sans-serif",
              lineHeight: 1,
              marginBottom: "8px",
            }}
          >
            {value}
          </p>
          {trend && (
            <span
              style={{
                fontSize: "12px",
                color: trend > 0 ? "var(--success)" : "var(--danger)",
                fontWeight: 600,
              }}
            >
              {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% this week
            </span>
          )}
          {sub && (
            <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{sub}</span>
          )}
        </div>
        {icon && (
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              background: `${color}22`,
              border: `1px solid ${color}44`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: color,
              fontSize: "22px",
            }}
          >
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;