import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "../assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  const handleOpenBlogFrom = () => {
    navigate("new");
  };

  const handleEditBlog = (initialBlog, blogId) => {
    navigate("edit", { state: { initialBlog, blogId } });
  };

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("https://blog.cribonix.in/api/blogs");
      if (response) {
        setBlogs(response.data);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`https://blog.cribonix.in/api/blogs/${id}`);
      toast.success("Blog deleted successfully!");
      fetchBlogs();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">Blog List</h1>
      <p className="text-gray-500 mb-6">Dashboard / Blog</p>

      {/* Add Blog Button */}
      <button
        onClick={handleOpenBlogFrom}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-6"
      >
        + New Blog
      </button>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Content</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={blog._id} className="border-t">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">{blog.heading1.slice(0, 50)}...</td>
                <td className="py-2 px-4">{blog.content1.slice(0, 50)}...</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => handleEditBlog(blog, blog._id)}
                    className="mr-2 p-2 rounded"
                  >
                    <img className="w-10 h-10" src={EditIcon} alt="" />
                  </button>
                  <button
                    onClick={() => deleteBlog(blog._id)}
                    className="p-2 text-white rounded"
                  >
                    <img className="w-10 h-10" src={DeleteIcon} alt="" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Blog;
