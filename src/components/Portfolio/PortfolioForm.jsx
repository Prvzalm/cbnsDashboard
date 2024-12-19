import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft } from "../../assets";
import { FaPlus } from "react-icons/fa";

const PortfolioForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { initialPortfolio, portfolioId } = location.state || {};
  const [portfolioName, setPortfolioName] = useState("");
  const [headingOne, setHeadingOne] = useState("");
  const [headingTwo, setHeadingTwo] = useState("");
  const [description, setDescription] = useState("");
  const [homePageImage, setHomePageImage] = useState(null);
  const [imageGallery, setImageGallery] = useState([
    { heading: "", content: "", imgUrl: "" },
  ]);
  const [loading, setLoading] = useState(false);

  // Pre-fill fields if initialPortfolio exists (editing mode)
  useEffect(() => {
    if (initialPortfolio) {
      setPortfolioName(initialPortfolio.portfolioName || "");
      setHeadingOne(initialPortfolio.headingOne || "");
      setHeadingTwo(initialPortfolio.headingTwo || "");
      setDescription(initialPortfolio.description || "");
      setHomePageImage(initialPortfolio.homePageImage || null);
      setImageGallery(
        initialPortfolio.imageGallery?.map((image) => ({
          heading: image.heading || "",
          content: image.content || "",
          imgUrl: image.imgUrl || "",
        })) || [{ heading: "", content: "", imgUrl: "" }]
      );
    }
  }, [initialPortfolio]);

  // Handle input changes for gallery
  const handleGalleryChange = (index, field, value) => {
    const updatedGallery = [...imageGallery];
    updatedGallery[index][field] = value;
    setImageGallery(updatedGallery);
  };

  // Handle homepage image upload
  // const handleHomePageImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) setHomePageImage(URL.createObjectURL(file));
  // };

  const handleHomePageImageURLChange = (e) => {
    const url = e.target.value;
    if (url) {
      setHomePageImage(url); // Assuming setHomePageImage is your state setter
    }
  };

  // Add new gallery item
  const addGalleryItem = () => {
    setImageGallery([
      ...imageGallery,
      { heading: "", content: "", imgUrl: "" },
    ]);
  };

  // Handle form submission (POST or PATCH)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      portfolioName,
      headingOne,
      headingTwo,
      homePageImage,
      description,
      imageGallery,
    };

    console.log(payload);

    try {
      if (portfolioId) {
        // PATCH request (update existing portfolio)
        const response = await axios.patch(
          `https://blog.cribonix.com/api/portfolios/${portfolioId}`,
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
        toast.success("Portfolio updated successfully!");
        console.log("Portfolio updated:", response.data);
      } else {
        // POST request (create new portfolio)
        const response = await axios.post(
          "https://blog.cribonix.com/api/portfolios",
          payload,
          { headers: { "Content-Type": "application/json" } }
        );
        toast.success("Portfolio created successfully!");
        console.log("Portfolio created:", response.data);
      }
      navigate(-1);
    } catch (error) {
      console.error("Error submitting portfolio:", error);
      toast.error("Failed to submit portfolio. Please try again.");
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
        {portfolioId ? "Edit Portfolio" : "New Portfolio"}
      </h1>

      <form onSubmit={handleSubmit} className="flex">
        {/* Left Section */}
        <div className="w-3/4 mr-4">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Portfolio Name
            </label>
            <input
              type="text"
              value={portfolioName}
              onChange={(e) => setPortfolioName(e.target.value)}
              placeholder="Enter portfolio name"
              className="w-full border rounded px-4 py-2 mb-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Home Page Image
            </label>
            {homePageImage ? (
              <img
                src={homePageImage}
                alt="Homepage Preview"
                className="w-full h-auto rounded mb-2"
              />
            ) : (
              <input
                type="text"
                value={homePageImage}
                onChange={handleHomePageImageURLChange}
                placeholder="Paste image URL here"
                className="w-full border rounded px-4 py-2 mb-2"
              />
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Heading One
            </label>
            <input
              type="text"
              value={headingOne}
              onChange={(e) => setHeadingOne(e.target.value)}
              placeholder="Enter header one"
              className="w-full border rounded px-4 py-2 mb-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Heading Two
            </label>
            <input
              type="text"
              value={headingTwo}
              onChange={(e) => setHeadingTwo(e.target.value)}
              placeholder="Enter header two"
              className="w-full border rounded px-4 py-2 mb-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-1">
              Content
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter content"
              className="w-full border rounded px-4 py-2"
              rows="4"
            ></textarea>
          </div>

          {imageGallery.map((image, index) => (
            <div key={index} className="mb-4">
              <label className="block text-gray-700 font-medium mb-1">
                Image {index + 1} Heading
              </label>
              <input
                type="text"
                value={image.heading}
                onChange={(e) =>
                  handleGalleryChange(index, "heading", e.target.value)
                }
                placeholder="Enter heading"
                className="w-full border rounded px-4 py-2 mb-2"
              />

              <label className="block text-gray-700 font-medium mb-1">
                Image {index + 1} Content
              </label>
              <textarea
                value={image.content}
                onChange={(e) =>
                  handleGalleryChange(index, "content", e.target.value)
                }
                placeholder="Enter content"
                className="w-full border rounded px-4 py-2"
                rows="4"
              ></textarea>

              <label className="block text-gray-700 font-medium mb-1">
                Image {index + 1} URL
              </label>
              <input
                type="text"
                value={image.imgUrl}
                onChange={(e) =>
                  handleGalleryChange(index, "imgUrl", e.target.value)
                }
                placeholder="Enter image URL"
                className="w-full border rounded px-4 py-2 mb-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addGalleryItem}
            className="flex items-center text-blue-600 border-dashed border-2 rounded px-4 py-2 mt-4"
          >
            <FaPlus className="mr-2" /> Add
          </button>
        </div>

        {/* Right Section */}
        {homePageImage && (
          <div className="w-1/4 flex flex-col items-center">
            <div className="border border-gray-300 rounded-lg p-4 w-full mb-4">
              <div className="text-gray-500 text-center mb-2">
                Please select or paste your homepage image URL
              </div>
              <input
                type="text"
                placeholder="Paste image URL here"
                onChange={handleHomePageImageURLChange}
                className="w-full border border-gray-300 rounded p-2 text-sm"
              />
            </div>
          </div>
        )}
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
          {loading ? "SUBMITTING..." : portfolioId ? "UPDATE" : "CREATE"}
        </button>
      </div>
    </div>
  );
};

export default PortfolioForm;
