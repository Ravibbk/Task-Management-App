import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginSuccess } from "../../redux/slices/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validations/loginSchema";
import { Zap, Mail, Lock, ArrowRight } from "lucide-react";
import { loginUser } from "../../services/authService";

const Login = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const [apiError, setApiError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setApiError("");
    try {
      const response = await loginUser(data);
      dispatch(loginSuccess({
        user: { email: response.data.email, role: response.data.role },
        token: response.data.token,
      }));
      navigate("/dashboard");
    } catch (error) {
      setApiError(error.response?.data?.message || "Invalid email or password");
    }
  };

  return (
    <div
      className="gradient-bg"
      style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", padding: "20px",
      }}
    >
      {/* Card */}
      <div
        style={{
          width: "100%", maxWidth: "420px",
          background: "linear-gradient(145deg, rgba(26,26,46,0.95), rgba(22,33,62,0.95))",
          border: "1px solid var(--glass-border)",
          borderRadius: "24px", padding: "40px",
          backdropFilter: "blur(20px)",
          boxShadow: "0 25px 60px rgba(0,0,0,0.4), 0 0 80px rgba(99,102,241,0.08)",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              width: "52px", height: "52px",
              background: "linear-gradient(135deg, var(--primary), var(--accent-pink))",
              borderRadius: "14px", display: "flex", alignItems: "center",
              justifyContent: "center", margin: "0 auto 16px",
              boxShadow: "0 8px 25px rgba(99,102,241,0.35)",
            }}
          >
            <Zap size={24} color="white" />
          </div>
          <h1 style={{ fontSize: "26px", fontWeight: 700, color: "white", marginBottom: "6px" }}>
            Welcome back
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            Sign in to your TaskFlow workspace
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="email"
                placeholder="admin@example.com"
                className="input-dark"
                style={{ paddingLeft: "42px" }}
                {...register("email")}
              />
            </div>
            {errors.email && <p style={{ color: "var(--danger)", fontSize: "12px", marginTop: "4px" }}>{errors.email.message}</p>}
          </div>

          <div>
            <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "var(--text-muted)", marginBottom: "6px" }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <Lock size={16} style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input
                type="password"
                placeholder="••••••••"
                className="input-dark"
                style={{ paddingLeft: "42px" }}
                {...register("password")}
              />
            </div>
            {errors.password && <p style={{ color: "var(--danger)", fontSize: "12px", marginTop: "4px" }}>{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              width: "100%", marginTop: "10px", fontSize: "15px",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              opacity: isSubmitting ? 0.7 : 1,
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Signing in..." : (<>Sign In <ArrowRight size={16} /></>)}
          </button>
          {apiError && <p style={{ color: "#f87171", fontSize: "13px", marginTop: "8px" }}>{apiError}</p>}
        </form>

        <p style={{ textAlign: "center", marginTop: "20px", fontSize: "14px", color: "var(--text-muted)" }}>
          No account?{" "}
          <Link to="/register" style={{ color: "var(--primary-light)", fontWeight: 600, textDecoration: "none" }}>
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;