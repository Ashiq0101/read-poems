import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./../App.css";

function HomePage() {
  const [image, setImage] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fileInputRef = useRef(null);

  // Load banner from DB
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/poems/home-image`
        );
        if (data?.image) {
          setImage(data.image);
        }
      } catch (err) {
        console.log("No banner found");
      }
    };
    fetchImage();
  }, []);

  const handleAuthSubmit = (e) => {
    e.preventDefault();

    if (email === "abc@gmail.com" && password === "123") {
      setIsAuthenticated(true);
      setShowAuth(false);
      setEmail("");
      setPassword("");
    } else {
      alert("Only User is allowed");
      setEmail("");
      setPassword("");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async () => {
      const base64Image = reader.result;

      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/poems/home-image`,
          { image: base64Image }
        );

        setImage(base64Image);
        setIsAuthenticated(false);
        setShowAuth(false);
      } catch (error) {
        alert("Failed to save image");
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="hero-container">

      {/* NAVBAR */}
      <div className="navbar">
        <div className="logo">
          💖 <span className="brand">Welcome To User’s Diary</span>
        </div>

        <Link to="/login" className="nav-btn">
          📜 Upload Poem
        </Link>
      </div>

      {/* HERO SECTION */}
      <div
        className="hero-section"
        style={{
          backgroundImage: image
            ? `url(${image})`
            : "linear-gradient(135deg, #ff9a9e, #fad0c4)",
        }}
      >
        <div className="hero-overlay">
          <div className="hero-content">

            <h1 className="hero-title">
              Where <span>Feelings</span> Become Forever
            </h1>

            <p className="hero-subtitle">
              A sanctuary for words, emotions, and timeless poetry.
            </p>

            <div className="hero-buttons">
              <Link to="/poems" className="primary-btn">
                ❤️ Read Poems
              </Link>

              {!isAuthenticated && (
                <button
                  className="secondary-btn"
                  onClick={() => setShowAuth(true)}
                >
                  🖼 Change Banner
                </button>
              )}

              {isAuthenticated && (
                <>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    style={{ display: "none" }}
                  />

                  <button
                    className="secondary-btn"
                    onClick={() => fileInputRef.current.click()}
                  >
                    📤 Upload New Banner
                  </button>
                </>
              )}
            </div>

            {/* AUTH BOX */}
            {showAuth && (
              <div className="auth-box-modern">

                <form onSubmit={handleAuthSubmit}>

                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button type="submit">
                    🔐 Login
                  </button>

                  {/* NEW: Cancel Button */}
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={() => {
                      setShowAuth(false);
                      setEmail("");
                      setPassword("");
                    }}
                  >
                    ❌ Cancel
                  </button>

                  {/* NEW: Back to Home Link */}
                  <Link
                    to="/"
                    className="back-link"
                    onClick={() => setShowAuth(false)}
                  >
                    ← Back to Home
                  </Link>

                </form>

              </div>
            )}

          </div>
        </div>
      </div>

    </div>
  );
}

export default HomePage;