const Blog = () => {
  return (
    <div>
      {/* Header */}
      <h1 className="text-3xl font-bold mb-2">Blog List</h1>
      <p className="text-gray-500 mb-6">Dashboard / Blog</p>

      {/* Add Blog Button */}
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mb-6">
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
            <tr className="border-t">
              <td className="py-2 px-4">1</td>
              <td className="py-2 px-4">16/12/2024</td>
              <td className="py-2 px-4">Lorem Dolor is simple dummy</td>
              <td className="py-2 px-4">
                Lorem Dolor is simple dummy Lorem Dolor is simple
              </td>
              <td className="py-2 px-4">
                <button className="mr-2 p-2 bg-gray-200 rounded hover:bg-gray-300">
                  ✏️
                </button>
                <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
                  🗑️
                </button>
              </td>
            </tr>
            <tr className="border-t">
              <td className="py-2 px-4">2</td>
              <td className="py-2 px-4">16/12/2024</td>
              <td className="py-2 px-4">Lorem Dolor is simple dummy</td>
              <td className="py-2 px-4">Lorem Dolor is simple dummy</td>
              <td className="py-2 px-4">
                <button className="mr-2 p-2 bg-gray-200 rounded hover:bg-gray-300">
                  ✏️
                </button>
                <button className="p-2 bg-red-500 text-white rounded hover:bg-red-600">
                  🗑️
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Blog;
