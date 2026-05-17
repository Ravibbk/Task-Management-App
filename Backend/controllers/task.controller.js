const Task = require("../models/Task");

const getTasks = async (req, res) => {
  const filter = { createdBy: req.user.id };
  const tasks = await Task.find(filter).populate("createdBy", "email role");
  res.json(tasks);
};

const getTaskById = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, createdBy: req.user.id }).populate("createdBy", "email role");
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json(task);
};

const createTask = async (req, res) => {
  const { title, description, status, priority, dueDate, assignedTo } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required" });
  }

  const task = await Task.create({
    title,
    description,
    status: status || "Pending",
    priority: priority || "Medium",
    assignedTo: assignedTo || "",
    dueDate,
    createdBy: req.user.id,
  });

  res.status(201).json(task);
};

const updateTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, createdBy: req.user.id });
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  const { title, description, status, priority, dueDate, assignedTo } = req.body;
  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.status = status ?? task.status;
  task.priority = priority ?? task.priority;
  task.assignedTo = assignedTo ?? task.assignedTo;
  task.dueDate = dueDate ?? task.dueDate;

  await task.save();
  res.json(task);
};

const deleteTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, createdBy: req.user.id });
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  await task.remove();
  res.json({ message: "Task removed" });
};

const uploadAttachments = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, createdBy: req.user.id });
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (!req.files || !req.files.length) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  const attachments = req.files.map((file) => ({
    fileName: file.filename,
    originalName: file.originalname,
    path: file.path,
  }));

  task.attachments = [...(task.attachments || []), ...attachments];
  await task.save();

  res.json(task);
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  uploadAttachments,
};
