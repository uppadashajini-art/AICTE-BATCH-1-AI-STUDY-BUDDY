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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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

      const res = await API.post("/api/auth/register", formData);

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
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <p style={styles.subtitle}>
          Please fill your details below
        </p>

        {/* NAME */}
        <label style={styles.label}>Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />

        {/* EMAIL */}
        <label style={styles.label}>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />

        {/* PASSWORD */}
        <label style={styles.label}>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Registering..." : "Create Account"}
        </button>

        <p style={styles.linkText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3f4f6",   // FIXED (clear background)
    fontFamily: "Arial",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "380px",
    padding: "25px",
    borderRadius: "12px",
    background: "#ffffff",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  title: {
    textAlign: "center",
    marginBottom: "5px",
    color: "#111827",
  },

  subtitle: {
    textAlign: "center",
    fontSize: "13px",
    color: "#6b7280",
    marginBottom: "10px",
  },

  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#111827",
    marginTop: "8px",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "#ffffff",
    color: "#000000",   // IMPORTANT FIX (visibility issue)
  },

  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#16a34a",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },

  error: {
    color: "red",
    fontSize: "13px",
    textAlign: "center",
  },

  success: {
    color: "green",
    fontSize: "13px",
    textAlign: "center",
  },

  linkText: {
    textAlign: "center",
    fontSize: "13px",
    marginTop: "10px",
  },

  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Register;