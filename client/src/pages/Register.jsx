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

      console.log("REGISTER RESPONSE:", res.data);

      // SAFE STORAGE (only if exists)
      if (res.data.user) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }

      // token only if backend sends it
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      setSuccess("Registration successful! Redirecting...");

      setTimeout(() => {
        navigate("/login"); // better than dashboard for register flow
      }, 1000);

    } catch (err) {
      console.log("ERROR:", err.response || err);

      setError(
        err.response?.data?.message ||
          "Server error. Check backend."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.title}>📝 Register</h1>

        <p style={styles.subtitle}>
          Create your AI Study Buddy account
        </p>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Create Password"
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
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
    background: "linear-gradient(135deg, #dbeafe, #ede9fe)",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },

  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "30px",
    borderRadius: "18px",
    background: "#ffffff",
    boxShadow: "0 12px 35px rgba(0,0,0,0.12)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  title: {
    textAlign: "center",
    margin: 0,
    color: "#111827",
  },

  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    fontSize: "14px",
    marginTop: "-5px",
    marginBottom: "10px",
  },

  input: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "#fff",
  },

  button: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "#16a34a",
    color: "#fff",
    fontWeight: "bold",
    fontSize: "15px",
  },

  error: {
    color: "#dc2626",
    fontSize: "14px",
    textAlign: "center",
  },

  success: {
    color: "#16a34a",
    fontSize: "14px",
    textAlign: "center",
  },

  linkText: {
    textAlign: "center",
    color: "#4b5563",
    fontSize: "14px",
  },

  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Register;