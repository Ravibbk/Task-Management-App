import { useState, useEffect } from "react";
import { X, Upload, FileText, Trash2 } from "lucide-react";

const CreateTaskModal = ({ isOpen, closeModal, onCreate, editData = null }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("High");
  const [status, setStatus] = useState("Pending");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [dragging, setDragging] = useState(false);

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setDescription(editData.description || "");
      setPriority(editData.priority || "High");
      setStatus(editData.status || "Pending");
      setDueDate(editData.dueDate || "");
      setAssignedTo(editData.assignedTo || "");
    }
  }, [editData]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (!dueDate) newErrors.dueDate = "Due date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFiles = (selected) => {
    const arr = [...selected];
    if (arr.length + files.length > 3) {
      alert("Maximum 3 PDFs only");
      return;
    }
    const pdfs = arr.filter((f) => f.type === "application/pdf");
    setFiles((prev) => [...prev, ...pdfs]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onCreate({ title, description, priority, status, dueDate, assignedTo, files });
    resetForm();
    closeModal();
  };

  const resetForm = () => {
    setTitle(""); setDescription(""); setDueDate(""); setAssignedTo("");
    setPriority("High"); setStatus("Pending"); setFiles([]); setErrors({});
  };

  const handleClose = () => { resetForm(); closeModal(); };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
      }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        style={{
          background: "linear-gradient(145deg, #1a1a2e, #16213e)",
          border: "1px solid var(--glass-border)",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "560px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "32px",
          position: "relative",
          boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
          <div>
            <h2 style={{ fontSize: "22px", fontWeight: 700, color: "white" }}>
              {editData ? "Edit Task" : "Create New Task"}
            </h2>
            <p style={{ fontSize: "13px", color: "var(--text-muted)", marginTop: "4px" }}>
              Fill in the details below
            </p>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: "rgba(255,255,255,0.05)", border: "1px solid var(--glass-border)",
              borderRadius: "8px", padding: "8px", cursor: "pointer", color: "var(--text-muted)",
              display: "flex",
            }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Title */}
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
              Task Title *
            </label>
            <input
              className="input-dark"
              placeholder="e.g. Design dashboard wireframes"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && <p style={{ color: "var(--danger)", fontSize: "12px", marginTop: "4px" }}>{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
              Description *
            </label>
            <textarea
              className="input-dark"
              placeholder="Describe the task..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              style={{ resize: "none" }}
            />
            {errors.description && <p style={{ color: "var(--danger)", fontSize: "12px", marginTop: "4px" }}>{errors.description}</p>}
          </div>

          {/* Status + Priority row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
                Status
              </label>
              <select className="input-dark" value={status} onChange={(e) => setStatus(e.target.value)}>
                {["Pending", "In Progress", "Completed"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
                Priority
              </label>
              <select className="input-dark" value={priority} onChange={(e) => setPriority(e.target.value)}>
                {["High", "Medium", "Low"].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Due Date + Assigned */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
                Due Date *
              </label>
              <input
                type="date"
                className="input-dark"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                style={{ colorScheme: "dark" }}
              />
              {errors.dueDate && <p style={{ color: "var(--danger)", fontSize: "12px", marginTop: "4px" }}>{errors.dueDate}</p>}
            </div>
            <div>
              <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
                Assign To
              </label>
              <select className="input-dark" value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                <option value="">Select User</option>
                {["John", "Admin", "Alex", "Sara"].map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
              Attachments (max 3 PDFs)
            </label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${dragging ? "var(--primary)" : "var(--glass-border)"}`,
                borderRadius: "12px",
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
                background: dragging ? "rgba(99,102,241,0.05)" : "rgba(255,255,255,0.02)",
                transition: "all 0.2s",
              }}
              onClick={() => document.getElementById("file-input").click()}
            >
              <Upload size={24} color={dragging ? "var(--primary)" : "var(--text-muted)"} style={{ margin: "0 auto 8px" }} />
              <p style={{ fontSize: "13px", color: "var(--text-muted)" }}>
                Drag & drop PDFs here or <span style={{ color: "var(--primary-light)" }}>browse</span>
              </p>
              <input
                id="file-input"
                type="file"
                multiple
                accept=".pdf"
                style={{ display: "none" }}
                onChange={(e) => handleFiles(e.target.files)}
              />
            </div>

            {/* File list */}
            {files.length > 0 && (
              <div style={{ marginTop: "10px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {files.map((file, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)",
                      borderRadius: "8px", padding: "8px 12px",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <FileText size={14} color="var(--primary-light)" />
                      <span style={{ fontSize: "13px", color: "var(--text)" }}>{file.name}</span>
                      <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                        ({(file.size / 1024).toFixed(1)} KB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "var(--danger)", display: "flex" }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary"
            style={{ marginTop: "8px", width: "100%", fontSize: "15px" }}
          >
            {editData ? "Update Task" : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;