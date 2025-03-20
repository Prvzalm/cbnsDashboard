import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteIcon, EditIcon } from "../../assets";
import { toast } from "react-toastify";
import axios from "axios";

const Portfolio = () => {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState([]);

  const handleOpenPortfolioForm = () => {
    navigate("new");
  };

  const handleEditPortfolio = (initialPortfolio, portfolioId) => {
    navigate("edit", { state: { initialPortfolio, portfolioId } });
  };

  const fetchPortfolios = async () => {
    try {
      const response = await axios.get(
        "https://blog.cribonix.in/api/portfolios"
      );
      if (response) {
        setPortfolios(response.data);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`https://blog.cribonix.in/api/portfolios/${id}`);
      toast.success("Blog deleted successfully!");
      fetchPortfolios();
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Portfolio List</h1>
      <p className="text-gray-500 mb-6">Dashboard / Portfolio</p>

      {/* Add Blog Button */}
      <button
        onClick={handleOpenPortfolioForm}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-6"
      >
        + New Portfolio
      </button>
      <div className="overflow-x-auto">
        <table className="w-full bg-white border rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Heading</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {portfolios.map((portfolio, index) => (
              <tr key={portfolio._id} className="border-t">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">
                  {new Date(portfolio.createdAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4">{portfolio.portfolioName}</td>
                <td className="py-2 px-4">{portfolio.headingOne}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() =>
                      handleEditPortfolio(portfolio, portfolio._id)
                    }
                    className="mr-2 p-2 rounded"
                  >
                    <img className="w-10 h-10" src={EditIcon} alt="" />
                  </button>
                  <button
                    onClick={() => handleDeleteBlog(portfolio._id)}
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

export default Portfolio;
