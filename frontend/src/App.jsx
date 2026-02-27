import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UploadPage from "./pages/UploadPage";
import AllPoems from "./pages/AllPoems";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/poems" element={<AllPoems />} />
      </Routes>
    </Router>
  );
}

export default App;