import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await API.post("/api/auth/register", formData);

      setSuccess("Registration successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        {/* ICON */}
        <div style={styles.icon}>🎓</div>

        {/* TITLE */}
        <h1 style={styles.title}>Create Account</h1>

        {/* SUBTITLE */}
        <p style={styles.subtitle}>
          Join AI Study Buddy and start learning smarter.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>

          {/* FULL NAME */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* EMAIL */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
          </div>

          {/* PASSWORD */}
          <div style={styles.fieldGroup}>
            <label style={styles.label}>Password</label>

            <div style={styles.passwordBox}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                style={styles.passwordInput}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eye}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <p style={styles.error}>
              {error}
            </p>
          )}

          {/* SUCCESS */}
          {success && (
            <p style={styles.success}>
              {success}
            </p>
          )}

          {/* REGISTER BUTTON */}
          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Registering..." : "Create Account"}
          </button>

        </form>

        {/* LOGIN */}
        <p style={styles.loginText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.loginLink}>
            Login
          </Link>
        </p>

        {/* HOME */}
        <p
          style={styles.homeLink}
          onClick={() => navigate("/")}
        >
          ← Back to AI Study Buddy
        </p>

      </div>
    </div>
  );
}

/* =========================
   🎨 AI STUDY BUDDY STYLES
   ========================= */

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    background:
      "linear-gradient(135deg, #050824 0%, #0b0d2e 45%, #17134a 100%)",

    fontFamily:
      "Arial, Helvetica, sans-serif",

    padding: "20px",
    boxSizing: "border-box",
  },

  card: {
    width: "100%",
    maxWidth: "420px",

    padding: "40px",

    borderRadius: "24px",

    background:
      "linear-gradient(145deg, rgba(44, 43, 82, 0.95), rgba(28, 27, 65, 0.95))",

    border: "1px solid rgba(255, 255, 255, 0.12)",

    boxShadow:
      "0 20px 60px rgba(0, 0, 0, 0.45)",

    boxSizing: "border-box",
  },

  icon: {
    textAlign: "center",

    fontSize: "38px",

    marginBottom: "10px",
  },

  title: {
    textAlign: "center",

    color: "#ffffff",

    fontSize: "30px",

    fontWeight: "700",

    margin: "0 0 10px 0",
  },

  subtitle: {
    textAlign: "center",

    color: "#c4c5d8",

    fontSize: "14px",

    lineHeight: "1.6",

    margin: "0 0 30px 0",
  },

  form: {
    display: "flex",

    flexDirection: "column",

    gap: "18px",
  },

  fieldGroup: {
    display: "flex",

    flexDirection: "column",

    gap: "8px",
  },

  label: {
    color: "#ffffff",

    fontSize: "14px",

    fontWeight: "600",
  },

  input: {
    width: "100%",

    padding: "14px 16px",

    boxSizing: "border-box",

    borderRadius: "12px",

    border:
      "1px solid rgba(255, 255, 255, 0.15)",

    outline: "none",

    fontSize: "14px",

    color: "#ffffff",

    backgroundColor:
      "rgba(255, 255, 255, 0.08)",
  },

  passwordBox: {
    position: "relative",

    width: "100%",
  },

  passwordInput: {
    width: "100%",

    padding: "14px 45px 14px 16px",

    boxSizing: "border-box",

    borderRadius: "12px",

    border:
      "1px solid rgba(255, 255, 255, 0.15)",

    outline: "none",

    fontSize: "14px",

    color: "#ffffff",

    backgroundColor:
      "rgba(255, 255, 255, 0.08)",
  },

  eye: {
    position: "absolute",

    right: "14px",

    top: "50%",

    transform: "translateY(-50%)",

    cursor: "pointer",

    fontSize: "17px",

    userSelect: "none",
  },

  button: {
    width: "100%",

    marginTop: "5px",

    padding: "14px",

    borderRadius: "12px",

    border: "none",

    background:
      "linear-gradient(135deg, #16a34a, #22c55e)",

    color: "#ffffff",

    fontWeight: "700",

    fontSize: "16px",

    boxShadow:
      "0 8px 20px rgba(34, 197, 94, 0.25)",

    transition: "all 0.2s ease",
  },

  error: {
    color: "#ff7b7b",

    backgroundColor:
      "rgba(255, 70, 70, 0.1)",

    border:
      "1px solid rgba(255, 70, 70, 0.2)",

    borderRadius: "8px",

    padding: "10px",

    fontSize: "13px",

    textAlign: "center",

    margin: "0",
  },

  success: {
    color: "#4ade80",

    backgroundColor:
      "rgba(34, 197, 94, 0.1)",

    border:
      "1px solid rgba(34, 197, 94, 0.2)",

    borderRadius: "8px",

    padding: "10px",

    fontSize: "13px",

    textAlign: "center",

    margin: "0",
  },

  loginText: {
    textAlign: "center",

    color: "#bfc0d2",

    fontSize: "14px",

    marginTop: "25px",

    marginBottom: "10px",
  },

  loginLink: {
    color: "#60a5fa",

    textDecoration: "none",

    fontWeight: "700",
  },

  homeLink: {
    textAlign: "center",

    color: "#a5b4fc",

    fontSize: "13px",

    cursor: "pointer",

    marginTop: "15px",

    marginBottom: "0",
  },
};

export default Register;