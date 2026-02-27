import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./../App.css";

function AllPoems() {
  const [poems, setPoems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedHeadline, setEditedHeadline] = useState("");
  const [editedContent, setEditedContent] = useState("");

  const fetchPoems = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/poems`
      );
      setPoems(data);
    } catch (error) {
      alert("Failed to fetch poems");
    }
  };

  useEffect(() => {
    fetchPoems();
  }, []);

  // ===== DELETE =====
  const deletePoem = async (id) => {
    

    const password = prompt("Enter Password:");
    if (password === null) return;

    if (password !== "123") {
      alert("Only User is allowed 💔");
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/poems/${id}`
      );

      setPoems((prevPoems) =>
        prevPoems.filter((poem) => poem._id !== id)
      );

      alert("Poem deleted successfully ✨");
    } catch (error) {
      alert("Failed to delete poem");
    }
  };

  // ===== START EDIT =====
  const startEdit = (poem) => {
    setEditingId(poem._id);
    setEditedHeadline(poem.headline);
    setEditedContent(poem.content);
  };

  // ===== SAVE EDIT =====
  const saveEdit = async (id) => {
    const email = prompt("Enter Email:");
    if (email === null) return;

    const password = prompt("Enter Password:");
    if (password === null) return;

    if (email !== "abc@gmail.com" || password !== "123") {
      alert("Only User is allowed 💔");
      return;
    }

    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/poems/${id}`,
        {
          headline: editedHeadline,
          content: editedContent,
        }
      );

      setPoems((prevPoems) =>
        prevPoems.map((poem) =>
          poem._id === id ? data : poem
        )
      );

      setEditingId(null);
      alert("Poem updated successfully ✨");
    } catch (error) {
      alert("Failed to update poem");
    }
  };

  return (
    <div className="poems-page">
      <div className="poems-header">
        <h2>✨ All Poems</h2>
        <Link to="/" className="back-btn">
          ← Back to Home
        </Link>
      </div>

      <div className="poems-grid">
        {poems.length === 0 && (
          <p className="no-poems">
            No poems yet. Start writing ✍️
          </p>
        )}

        {poems.map((poem) => (
          <div key={poem._id} className="modern-poem-card">
            {editingId === poem._id ? (
              <>
                <input
                  value={editedHeadline}
                  onChange={(e) =>
                    setEditedHeadline(e.target.value)
                  }
                />

                <textarea
                  value={editedContent}
                  onChange={(e) =>
                    setEditedContent(e.target.value)
                  }
                />

                <button
                  className="modern-edit-btn"
                  onClick={() => saveEdit(poem._id)}
                >
                  💾 Save
                </button>

                <button
                  className="modern-cancel-btn"
                  onClick={() => setEditingId(null)}
                >
                  ❌ Cancel
                </button>
              </>
            ) : (
              <>
                <h3>{poem.headline}</h3>
                <p>{poem.content}</p>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    className="modern-edit-btn"
                    onClick={() => startEdit(poem)}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="modern-delete-btn"
                    onClick={() => deletePoem(poem._id)}
                  >
                    🗑 Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllPoems;