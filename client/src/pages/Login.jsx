import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.title}>🔐 Login</h1>
        <p style={styles.subtitle}>Welcome back! Please enter your details.</p>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />

        {/* PASSWORD + TOGGLE */}
        <div style={styles.passwordBox}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            style={styles.eye}
          >
            {showPassword ? "🙈" : "👁️"}
          </span>
        </div>

        {/* ERROR */}
        {error && <p style={styles.error}>{error}</p>}

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.6 : 1,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #dbeafe, #ede9fe)",
    fontFamily: "Arial",
  },

  card: {
    width: "380px",
    padding: "25px",
    borderRadius: "16px",
    background: "white",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  title: {
    textAlign: "center",
    marginBottom: "0",
  },

  subtitle: {
    textAlign: "center",
    fontSize: "13px",
    color: "#666",
    marginTop: "-5px",
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "14px",
    color: "#111",
    backgroundColor: "#fff",
  },

  passwordBox: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  eye: {
    position: "absolute",
    right: "10px",
    cursor: "pointer",
    fontSize: "16px",
  },

  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    background: "#2563eb",
    color: "white",
    fontWeight: "bold",
    fontSize: "15px",
  },

  error: {
    color: "red",
    fontSize: "13px",
  },
};

export default Login;