import { Filter, SortAsc } from "lucide-react";

const TaskFilter = ({ filters, onChange }) => {
  const selectStyle = {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid var(--glass-border)",
    borderRadius: "10px",
    padding: "10px 14px",
    color: "var(--text)",
    fontSize: "13px",
    fontFamily: "'Satoshi', sans-serif",
    cursor: "pointer",
    outline: "none",
    minWidth: "130px",
  };

  return (
    <div
      style={{
        display: "flex", gap: "10px", marginBottom: "20px",
        flexWrap: "wrap", alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)" }}>
        <Filter size={15} />
        <span style={{ fontSize: "13px", fontWeight: 600 }}>Filter:</span>
      </div>

      <select
        style={selectStyle}
        value={filters?.status || ""}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
      >
        <option value="">All Status</option>
        <option>Pending</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <select
        style={selectStyle}
        value={filters?.priority || ""}
        onChange={(e) => onChange({ ...filters, priority: e.target.value })}
      >
        <option value="">All Priority</option>
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>

      <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", marginLeft: "8px" }}>
        <SortAsc size={15} />
        <span style={{ fontSize: "13px", fontWeight: 600 }}>Sort:</span>
      </div>

      <select
        style={selectStyle}
        value={filters?.sortBy || ""}
        onChange={(e) => onChange({ ...filters, sortBy: e.target.value })}
      >
        <option value="">Default</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
        <option value="status">Status</option>
      </select>

      {(filters?.status || filters?.priority || filters?.sortBy) && (
        <button
          onClick={() => onChange({ status: "", priority: "", sortBy: "" })}
          style={{
            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)",
            borderRadius: "10px", padding: "10px 14px", color: "#fca5a5",
            fontSize: "13px", cursor: "pointer", fontFamily: "'Satoshi', sans-serif",
          }}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default TaskFilter;