import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SubmissionTable() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [resendStatus, setResendStatus] = useState({ id: null, msg: "" });
  const itemsPerPage = 5;

  useEffect(() => {
    axios
      .get(`${window.location.origin}/wp-json/form_plugin/v1/submissions`)
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  // ১. Resend Function
  const handleResend = async (id) => {
    setResendStatus({ id, msg: "Sending..." });
    try {
      const response = await axios.post(
        `${window.location.origin}/wp-json/form_plugin/v1/resend/${id}`,
      );
      if (response.data.success) {
        setResendStatus({ id, msg: "Sending!" });
      }
    } catch (err) {
      setResendStatus({ id, msg: "Failed", err });
    }
    // after 3 seconds reset the message
    setTimeout(() => setResendStatus({ id: null, msg: "" }), 3000);
  };

  // Search Logic
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-2 mx-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl font-bold text-gray-800">
          Admin Submissions Table
        </h2>

        {/* Search Box */}
        <div className="max-w-md w-full">
          <input
            type="text"
            placeholder="Search anythings..."
            className="w-full px-3 py-7 border-none shadow-sm cursor-pointer transition-all duration-300 ease-in-out rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 bg-clip-text text-transparent bg-linear-to-br from-pink-300 to-blue-400"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto rounded-sm">
        <table className="w-full text-left border-collapse rounded-sm px-3 cursor-pointer text-sm">
          <thead className="bg-black px-3 rounded-sm border-b border-slate-400 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Message</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm font-sm border-collapse">
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-100 border-b border-slate-100 transition-all duration-300 ease-in-out"
                >
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">"{item.message}"</td>
                  <td className="p-3 text-left">
                    <button
                      onClick={() => handleResend(item.id)}
                      className="bg-blue-500 truncate hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold transition"
                    >
                      {resendStatus.id === item.id
                        ? resendStatus.msg
                        : "Resend Mail"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-400">
                  No submissions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <span className="px-3 py-1 text-slate-600 border-none outline-none hover:bg-clip-text hover:text-transparent hover:bg-linear-to-r from-purple-500 to-blue-500 cursor-pointer transition-all duration-300 ease-in-out  disabled:opacity-30 disabled:cursor-not-allowed">
          Showing {filteredData.length > 0 ? indexOfFirstItem + 1 : 0} to{" "}
          {Math.min(indexOfLastItem, filteredData.length)} of{" "}
          {filteredData.length} entries
        </span>
        <div className="flex gap-2 relative after:absolute after:top-1/2 after:left-1/2 after:-translate-1/2 w-px h-5 after:rotate-45 bg-linear-to-r from-blue-600 to-purple-600 after:content-['']">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 text-slate-400 border-none outline-none hover:bg-clip-text hover:text-transparent hover:bg-linear-to-r from-purple-500 to-blue-500 cursor-pointer transition-all duration-300 ease-in-out  disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-1 text-slate-400 border-none outline-none hover:bg-clip-text hover:text-transparent hover:bg-linear-to-r from-purple-500 to-blue-500 cursor-pointer transition-all duration-300 ease-in-out  disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
