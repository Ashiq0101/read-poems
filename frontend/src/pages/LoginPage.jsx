import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./../App.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // prevent page reload

    if (email === "abc@gmail.com" && password === "123") {
      navigate("/upload");
    } else {
      alert("Only User is allowed 💔");
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        <div className="login-card">

          <h2 className="login-title">💖 User’s Diary</h2>
          <p className="login-subtitle">
            Enter your credentials to continue ✨
          </p>

          {/* Use form instead of div */}
          <form onSubmit={handleLogin}>

            <div className="login-input-group">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="login-input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="login-btn" type="submit">
              🔐 Login
            </button>

          </form>

          <Link to="/" className="back-link">
            ← Back to Home
          </Link>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;