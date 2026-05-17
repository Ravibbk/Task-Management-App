import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Tasks from "../pages/Tasks/Tasks";
import Users from "../pages/Users/Users";
import TaskDetails from "../pages/TaskDetails/TaskDetails";
import Settings from "../pages/Settings/Settings";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/task-details/:id" element={<TaskDetails />} />
        <Route path="/task-details" element={<TaskDetails />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;