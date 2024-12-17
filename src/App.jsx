import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Blog from "./components/Blog";
import Login from "./components/Login";
import { useEffect, useState } from "react";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    const checkAuth = () => {
      const auth = sessionStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(auth);
    };

    window.addEventListener("storage", checkAuth); // Handle cross-tab login/logout
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Sidebar setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" replace /> // Redirect if not logged in
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/new" element={<BlogForm />} />
          <Route path="blog/edit" element={<BlogForm />} />
        </Route>

        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
