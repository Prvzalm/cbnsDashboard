import { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from "../../assets";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Testimonials = () => {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([]);

  const handleOpenTestimonialForm = () => {
    navigate("new");
  };

  const handleEditTestimonial = (initialTestimonial, testimonialId) => {
    navigate("edit", { state: { initialTestimonial, testimonialId } });
  };

  const fetchTestimonials = async () => {
    try {
      const response = await axios.get(
        "https://blog.cribonix.com/api/testimonials"
      );
      if (response) {
        setTestimonials(response.data);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      await axios.delete(`https://blog.cribonix.com/api/testimonials/${id}`);
      toast.success("Testimonial deleted successfully!");
      fetchTestimonials();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div>
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">Testimonial List</h1>
      <p className="text-gray-500 mb-6">Dashboard / Testimonials</p>

      {/* Add Testimonial Button */}
      <button
        onClick={handleOpenTestimonialForm}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-6"
      >
        + New Testimonial
      </button>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Designation</th>
              <th className="py-2 px-4">Review Title</th>
              <th className="py-2 px-4">Review</th>
              <th className="py-2 px-4">Rating</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((testimonial, index) => (
              <tr key={testimonial._id} className="border-t">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{testimonial.name}</td>
                <td className="py-2 px-4">{testimonial.designation}</td>
                <td className="py-2 px-4">{testimonial.reviewTitle}</td>
                <td className="py-2 px-4">{testimonial.review}</td>
                <td className="py-2 px-4">{testimonial.rating}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() =>
                      handleEditTestimonial(testimonial, testimonial._id)
                    }
                    className="mr-2 p-2 rounded"
                  >
                    <img className="w-10 h-10" src={EditIcon} alt="Edit" />
                  </button>
                  <button
                    onClick={() => deleteTestimonial(testimonial._id)}
                    className="p-2 text-white rounded"
                  >
                    <img className="w-10 h-10" src={DeleteIcon} alt="Delete" />
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

export default Testimonials;
