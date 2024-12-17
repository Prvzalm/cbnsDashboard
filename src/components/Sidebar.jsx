import { Link, Outlet, useNavigate } from "react-router-dom";
import { BlogIcon, DashboardIcon } from "../assets";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.remove("isAuthenticated");
    navigate("/", { replace: true });
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="flex items-center justify-center h-20 border-b border-gray-700">
            <h1 className="text-2xl font-bold text-white">CRIBONIX</h1>
          </div>

          {/* Navigation */}
          <nav className="mt-6">
            <ul>
              <li>
                <Link
                  to="/"
                  className="flex items-center px-4 py-3 hover:bg-gray-700"
                >
                  <img className="w-6 h-6" src={DashboardIcon} alt="" />
                  <span className="ml-3">DASHBOARD</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="flex items-center px-4 py-3 hover:bg-gray-700"
                >
                  <img className="w-6 h-6" src={BlogIcon} alt="" />{" "}
                  <span className="ml-3">BLOG</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Logout */}
        <div className="border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 hover:bg-gray-700"
          >
            <span className="text-lg">🚪</span>
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
