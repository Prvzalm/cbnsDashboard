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

const App = () => {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Sidebar />
            ) : (
              <Navigate to="/login" replace /> // Redirect if not logged in
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="blog" element={<Blog />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
