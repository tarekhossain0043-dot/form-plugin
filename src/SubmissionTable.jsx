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
        setResendStatus({ id, msg: "Senting!" });
      }
    } catch (err) {
      setResendStatus({ id, msg: "Failed", err });
    }
    // ৩ সেকেন্ড পর স্ট্যাটাস মেসেজ সরিয়ে ফেলা
    setTimeout(() => setResendStatus({ id: null, msg: "" }), 3000);
  };

  // ২. Search Logic
  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // ৩. Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-2 mx-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl flex-1 w-full font-bold text-gray-800">
          Admin Submissions
        </h2>

        {/* Search Box */}
        <div>
          <input
            type="text"
            placeholder="Search anythings..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse px-3 cursor-pointer text-sm">
          <thead className="bg-black border-b border-slate-400 text-white">
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
                  <td className="p-3 text-right">
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
        <span className="text-sm text-gray-500 italic">
          Showing {filteredData.length > 0 ? indexOfFirstItem + 1 : 0} to{" "}
          {Math.min(indexOfLastItem, filteredData.length)} of{" "}
          {filteredData.length} entries
        </span>
        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-3 py-1 bg-gray-100 hover:bg-blue-900 border rounded  disabled:opacity-30 disabled:cursor-not-allowed text-black"
          >
            Prev
          </button>
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-3 py-2 hover:bg-blue-900 cursor-pointer transition-all duration-300 ease-in-out  border rounded disabled:cursor-not-allowed  disabled:opacity-30 text-black"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
