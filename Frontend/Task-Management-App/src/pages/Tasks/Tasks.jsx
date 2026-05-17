import { useState, useMemo, useEffect } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import TaskCard from "../../components/task/TaskCard";
import TaskFilter from "../../components/task/TaskFilter";
import CreateTaskModal from "../../components/task/CreateTaskModal";
import { getTasks, createTask, updateTask, deleteTaskApi, uploadTaskFiles } from "../../services/taskService";
import { Plus, Search } from "lucide-react";

const Tasks = () => {
  const [open, setOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");
  const [filters, setFilters] = useState({ status: "", priority: "", sortBy: "" });
  const [search, setSearch] = useState("");

  const filteredTasks = useMemo(() => {
    let result = [...tasks];
    if (search.trim()) {
      result = result.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.description?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filters.status) result = result.filter((t) => t.status === filters.status);
    if (filters.priority) result = result.filter((t) => t.priority === filters.priority);
    if (filters.sortBy === "dueDate") {
      result.sort((a, b) => new Date(a.dueDate || 0) - new Date(b.dueDate || 0));
    } else if (filters.sortBy === "priority") {
      const order = { High: 0, Medium: 1, Low: 2 };
      result.sort((a, b) => (order[a.priority] ?? 3) - (order[b.priority] ?? 3));
    }
    return result;
  }, [tasks, filters, search]);

  const deleteTask = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this task? This action cannot be undone.");
    if (!confirmed) return;

    try {
      await deleteTaskApi(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      alert(error.response?.data?.message || "Unable to delete task.");
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);
      setApiError("");
      try {
        const response = await getTasks();
        const normalized = response.data.map((item) => ({
          ...item,
          id: item._id || item.id,
        }));
        setTasks(normalized);
      } catch (error) {
        setApiError(error.response?.data?.message || "Failed to load tasks.");
      } finally {
        setLoading(false);
      }
    };
    loadTasks();
  }, []);

  const handleEdit = (task) => {
    setEditTask(task);
    setOpen(true);
  };

  const handleCreate = async (newTask) => {
    try {
      let response;
      if (editTask) {
        response = await updateTask(editTask.id, newTask);
        if (newTask.files?.length > 0) {
          const formData = new FormData();
          newTask.files.forEach((file) => formData.append("files", file));
          response = await uploadTaskFiles(editTask.id, formData);
        }
        setTasks(tasks.map((t) => (t.id === editTask.id ? { ...response.data, id: response.data._id || response.data.id } : t)));
        setEditTask(null);
      } else {
        response = await createTask(newTask);
        const createdTask = { ...response.data, id: response.data._id || response.data.id };
        if (newTask.files?.length > 0) {
          const formData = new FormData();
          newTask.files.forEach((file) => formData.append("files", file));
          const uploadResponse = await uploadTaskFiles(createdTask.id, formData);
          setTasks([...tasks, { ...uploadResponse.data, id: uploadResponse.data._id || uploadResponse.data.id }]);
        } else {
          setTasks([...tasks, createdTask]);
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || "Unable to save task.");
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "white", marginBottom: "4px" }}>Tasks</h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <button
          onClick={() => { setEditTask(null); setOpen(true); }}
          className="btn-primary"
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <Plus size={16} /> Create Task
        </button>
      </div>

      {/* Search bar */}
      <div style={{ position: "relative", marginBottom: "16px", maxWidth: "380px" }}>
        <Search size={15} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
        <input
          className="input-dark"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ paddingLeft: "40px" }}
        />
      </div>

      {/* Filters */}
      <TaskFilter filters={filters} onChange={setFilters} />

      {loading && (
        <div className="glass-card" style={{ padding: "60px 24px", textAlign: "center" }}>
          <p style={{ fontSize: "18px", color: "white" }}>Loading tasks...</p>
        </div>
      )}
      {apiError && !loading && (
        <div className="glass-card" style={{ padding: "40px 24px", textAlign: "center" }}>
          <p style={{ fontSize: "16px", color: "#fca5a5" }}>{apiError}</p>
        </div>
      )}

      {/* Task Grid */}
      {!loading && !apiError && filteredTasks.length === 0 ? (
        <div
          className="glass-card"
          style={{ padding: "60px 24px", textAlign: "center" }}
        >
          <p style={{ fontSize: "40px", marginBottom: "12px" }}>📋</p>
          <p style={{ fontSize: "18px", fontWeight: 600, color: "white", marginBottom: "6px" }}>No tasks found</p>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>Try adjusting your filters or create a new task</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} onDelete={deleteTask} onEdit={handleEdit} />
          ))}
        </div>
      )}

      <CreateTaskModal
        isOpen={open}
        closeModal={() => { setOpen(false); setEditTask(null); }}
        onCreate={handleCreate}
        editData={editTask}
      />
    </DashboardLayout>
  );
};

export default Tasks;