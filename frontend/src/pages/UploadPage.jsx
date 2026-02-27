import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./../App.css";

function UploadPage() {
  const [headline, setHeadline] = useState("");
  const [content, setContent] = useState("");

  const submitPoem = async () => {
    
    const password = prompt("Enter Password:");

    if ( password !== "ssss") {
      alert("Only User is allowed 💔");
      return;
    }

    await axios.post(`${import.meta.env.VITE_API_URL}/api/poems`, {
      headline,
      content,
    });

    alert("Poem Uploaded Successfully ✨");
    setHeadline("");
    setContent("");
  };

  return (
    <div className="upload-page">

      <div className="upload-card">

        <h2 className="upload-title">📜 Create a New Poem</h2>

        <div className="input-group">
          <input
            value={headline}
            placeholder="Poem Headline"
            onChange={(e) => setHeadline(e.target.value)}
          />
        </div>

        <div className="input-group">
          <textarea
            value={content}
            placeholder="Write your emotions here..."
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <button className="upload-btn" onClick={submitPoem}>
          ✨ Publish Poem
        </button>

        <Link to="/" className="back-home-link">
          ← Back to Home
        </Link>

      </div>

      {/* ===== Live Preview Section ===== */}
      {(headline || content) && (
        <div className="preview-section">
          <div className="preview-card">
            <h3>{headline || "Your Headline"}</h3>
            <p>{content || "Your poem will appear here beautifully..."}</p>
          </div>
        </div>
      )}

    </div>
  );
}

export default UploadPage;