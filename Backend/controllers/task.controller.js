const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const filter = { createdBy: req.user.id };
    const tasks = await Task.find(filter).populate("createdBy", "email role");
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ success: false, message: "Failed to fetch tasks" });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user.id }).populate("createdBy", "email role");
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ success: false, message: "Failed to fetch task" });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, assignedTo } = req.body;

    // Validation
    if (!title || title.trim().length === 0) {
      return res.status(400).json({ success: false, message: "Title is required and cannot be empty" });
    }

    if (!description || description.trim().length === 0) {
      return res.status(400).json({ success: false, message: "Description is required and cannot be empty" });
    }

    if (!dueDate) {
      return res.status(400).json({ success: false, message: "Due date is required" });
    }

    const dueDateObj = new Date(dueDate);
    if (isNaN(dueDateObj.getTime())) {
      return res.status(400).json({ success: false, message: "Invalid due date format" });
    }

    // Validate enum values
    const validStatuses = ["Pending", "In Progress", "Completed"];
    const validPriorities = ["High", "Medium", "Low"];

    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: `Status must be one of: ${validStatuses.join(", ")}` });
    }

    if (priority && !validPriorities.includes(priority)) {
      return res.status(400).json({ success: false, message: `Priority must be one of: ${validPriorities.join(", ")}` });
    }

    const task = await Task.create({
      title: title.trim(),
      description: description.trim(),
      status: status || "Pending",
      priority: priority || "Medium",
      assignedTo: assignedTo ? assignedTo.trim() : "",
      dueDate: dueDateObj,
      createdBy: req.user.id,
    });

    res.status(201).json({ success: true, data: task });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ success: false, message: "Failed to create task" });
  }
};

const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    const { title, description, status, priority, dueDate, assignedTo } = req.body;

    // Validation for updates
    const validStatuses = ["Pending", "In Progress", "Completed"];
    const validPriorities = ["High", "Medium", "Low"];

    if (title !== undefined) {
      if (title.trim().length === 0) {
        return res.status(400).json({ success: false, message: "Title cannot be empty" });
      }
      task.title = title.trim();
    }

    if (description !== undefined) {
      if (description.trim().length === 0) {
        return res.status(400).json({ success: false, message: "Description cannot be empty" });
      }
      task.description = description.trim();
    }

    if (status !== undefined) {
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: `Status must be one of: ${validStatuses.join(", ")}` });
      }
      task.status = status;
    }

    if (priority !== undefined) {
      if (!validPriorities.includes(priority)) {
        return res.status(400).json({ success: false, message: `Priority must be one of: ${validPriorities.join(", ")}` });
      }
      task.priority = priority;
    }

    if (dueDate !== undefined) {
      const dueDateObj = new Date(dueDate);
      if (isNaN(dueDateObj.getTime())) {
        return res.status(400).json({ success: false, message: "Invalid due date format" });
      }
      task.dueDate = dueDateObj;
    }

    if (assignedTo !== undefined) {
      task.assignedTo = assignedTo.trim();
    }

    await task.save();
    res.json({ success: true, data: task });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ success: false, message: "Failed to update task" });
  }
};

const deleteTask = async (req, res) => {
  try {
    const result = await Task.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });
    if (!result) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    res.json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ success: false, message: "Failed to delete task" });
  }
};

const uploadAttachments = async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user.id });
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    if (!req.files || !req.files.length) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const attachments = req.files.map((file) => ({
      fileName: file.filename,
      originalName: file.originalname,
      path: file.path,
    }));

    task.attachments = [...(task.attachments || []), ...attachments];
    await task.save();

    res.json({ success: true, data: task });
  } catch (error) {
    console.error("Error uploading attachments:", error);
    res.status(500).json({ success: false, message: "Failed to upload attachments" });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  uploadAttachments,
};
