import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft } from "../assets";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const BlogForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { initialBlog, blogId } = location.state || {};
  // State for form fields
  const [formFields, setFormFields] = useState([
    { heading: "", content: "" },
    { heading: "", content: "" },
    { heading: "", content: "" },
    { heading: "", content: "" },
    { heading: "", content: "" },
  ]);

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Pre-fill form fields if initialBlog exists (editing mode)
  useEffect(() => {
    if (initialBlog) {
      setFormFields([
        {
          heading: initialBlog.heading1 || "",
          content: initialBlog.content1 || "",
        },
        {
          heading: initialBlog.heading2 || "",
          content: initialBlog.content2 || "",
        },
        {
          heading: initialBlog.heading3 || "",
          content: initialBlog.content3 || "",
        },
        {
          heading: initialBlog.heading4 || "",
          content: initialBlog.content4 || "",
        },
        {
          heading: initialBlog.heading5 || "",
          content: initialBlog.content5 || "",
        },
      ]);
      setImage(initialBlog.image || null);
    }
  }, [initialBlog]);

  // Handle input changes
  const handleInputChange = (index, field, value) => {
    const updatedFields = [...formFields];
    updatedFields[index][field] = value;
    setFormFields(updatedFields);
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImage(URL.createObjectURL(file));
  };

  // Handle form submission (POST or PATCH)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare payload
    const payload = {
      image: image || "https://picsum.photos/id/237/536/354", // Use existing image or placeholder
      heading1: formFields[0].heading,
      content1: formFields[0].content,
      heading2: formFields[1].heading,
      content2: formFields[1].content,
      heading3: formFields[2].heading,
      content3: formFields[2].content,
      heading4: formFields[3].heading,
      content4: formFields[3].content,
      heading5: formFields[4].heading,
      content5: formFields[4].content,
    };

    try {
      if (blogId) {
        // PATCH request (update existing blog)
        const response = await axios.patch(
          `https://blog.cribonix.com/api/blogs/${blogId}`,
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
        toast.success("Blog updated successfully!");
        console.log("Blog updated:", response.data);
      } else {
        // POST request (create new blog)
        const response = await axios.post(
          "https://blog.cribonix.com/api/blogs",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
        toast.success("Blog created successfully!");
        console.log("Blog created:", response.data);
      }
      navigate(-1);
    } catch (error) {
      console.error("Error submitting blog:", error);
      toast.error("Failed to submit blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 h-full overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <button onClick={() => navigate(-1)}>
          <img src={ArrowLeft} alt="Back" />
        </button>
        {blogId ? "Edit Blog" : "New Blog"}
      </h1>

      <form onSubmit={handleSubmit} className="flex">
        {/* Left Section */}
        <div className="w-3/4 mr-4">
          {formFields.map((field, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Heading {index + 1}
              </label>
              <input
                type="text"
                value={field.heading}
                onChange={(e) =>
                  handleInputChange(index, "heading", e.target.value)
                }
                placeholder="Enter heading"
                className="w-full border rounded px-4 py-2 mb-2"
              />

              <label className="block text-gray-700 font-medium mb-1">
                Content {index + 1} <span className="text-red-500">*</span>
              </label>
              <textarea
                value={field.content}
                onChange={(e) =>
                  handleInputChange(index, "content", e.target.value)
                }
                placeholder="Enter content"
                className="w-full border rounded px-4 py-2"
                rows="4"
              ></textarea>
            </div>
          ))}
        </div>

        {/* Right Section */}
        <div className="w-1/4 flex flex-col items-center">
          <div className="border border-gray-300 rounded-lg p-4 w-full mb-4">
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="w-full h-auto rounded mb-2"
              />
            ) : (
              <div className="text-gray-500 text-center mb-2">
                Please select your image for blog
              </div>
            )}
            <label
              htmlFor="imageUpload"
              className="flex items-center justify-center cursor-pointer text-blue-600 border-dashed border-2 rounded py-2"
            >
              <span>⬆ UPLOAD IMAGE</span>
              <input
                type="file"
                id="imageUpload"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </form>

      {/* Buttons */}
      <div className="w-full flex justify-end mt-4 space-x-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          CANCEL
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "SUBMITTING..." : blogId ? "UPDATE" : "UPLOAD"}
        </button>
      </div>
    </div>
  );
};

export default BlogForm;
