import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./../App.css";

function LoginPage() {
  
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if ( password === "s123") {
      navigate("/upload");
    } else {
      alert("Only User is allowed 💔");
    }
  };

  return (
    <div className="login-page">

      <div className="login-overlay">

        <div className="login-card">

          <h2 className="login-title">
            💖 User’s Diary
          </h2>

          <p className="login-subtitle">
            Enter your credentials to continue ✨
          </p>

          

          <div className="login-input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-btn" onClick={handleLogin}>
            🔐 Login
          </button>

          <Link to="/" className="back-link">
            ← Back to Home
          </Link>

        </div>

      </div>
    </div>
  );
}

export default LoginPage;