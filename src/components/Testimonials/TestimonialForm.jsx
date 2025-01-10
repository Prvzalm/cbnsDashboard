import { useState, useEffect } from "react";
import axios from "axios";
import { ArrowLeft } from "../../assets";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const TestimonialForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { initialTestimonial, testimonialId } = location.state || {};
  // State for form fields
  const [formFields, setFormFields] = useState({
    name: "",
    designation: "",
    reviewTitle: "",
    rating: "",
    review: "",
  });

  const [loading, setLoading] = useState(false);

  // Pre-fill form fields if initialTestimonial exists (editing mode)
  useEffect(() => {
    if (initialTestimonial) {
      setFormFields({
        name: initialTestimonial.name || "",
        designation: initialTestimonial.designation || "",
        reviewTitle: initialTestimonial.reviewTitle || "",
        rating: initialTestimonial.rating || "",
        review: initialTestimonial.review || "",
      });
    }
  }, [initialTestimonial]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormFields({
      ...formFields,
      [field]: value,
    });
  };

  // Handle form submission (POST or PATCH)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Prepare payload
    const payload = {
      name: formFields.name,
      designation: formFields.designation,
      reviewTitle: formFields.reviewTitle,
      rating: formFields.rating,
      review: formFields.review,
    };

    console.log(payload);

    try {
      if (testimonialId) {
        // PATCH request (update existing testimonial)
        const response = await axios.patch(
          `https://blog.cribonix.com/api/testimonials/${testimonialId}`,
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
        toast.success("Testimonial updated successfully!");
        console.log("Testimonial updated:", response.data);
      } else {
        // POST request (create new testimonial)
        const response = await axios.post(
          "https://blog.cribonix.com/api/testimonials",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
        toast.success("Testimonial created successfully!");
        console.log("Testimonial created:", response.data);
      }
      navigate(-1);
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast.error("Failed to submit testimonial. Please try again.");
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
        {testimonialId ? "Edit Testimonial" : "New Testimonial"}
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col">
        {/* Input Fields */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Name</label>
          <input
            type="text"
            value={formFields.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            placeholder="Enter name"
            className="w-full border rounded px-4 py-2 mb-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Designation
          </label>
          <input
            type="text"
            value={formFields.designation}
            onChange={(e) => handleInputChange("designation", e.target.value)}
            placeholder="Enter designation"
            className="w-full border rounded px-4 py-2 mb-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Review Title
          </label>
          <input
            type="text"
            value={formFields.reviewTitle}
            onChange={(e) => handleInputChange("reviewTitle", e.target.value)}
            placeholder="Enter review title"
            className="w-full border rounded px-4 py-2 mb-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Rating</label>
          <input
            type="number"
            min="1"
            max="5"
            step="1"
            value={formFields.rating}
            onChange={(e) => {
              const value = e.target.value;
              handleInputChange(
                "rating",
                value === "" ? "" : Math.max(1, Math.min(5, Math.floor(value)))
              );
            }}
            placeholder="Enter rating (1-5)"
            className="w-full border rounded px-4 py-2 mb-2"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Review</label>
          <textarea
            value={formFields.review}
            onChange={(e) => handleInputChange("review", e.target.value)}
            placeholder="Enter review content"
            className="w-full border rounded px-4 py-2"
            rows="4"
          ></textarea>
        </div>

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
            {loading ? "SUBMITTING..." : testimonialId ? "UPDATE" : "SUBMIT"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TestimonialForm;
