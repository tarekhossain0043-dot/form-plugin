import React, { useEffect, useState } from "react";
import axios from "axios";

const SubmissionTable = () => {
  const [submissions, setSubmissions] = useState([]);
  const [status, setStatus] = useState("");

  // ১. ডেটা নিয়ে আসা
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${window.location.origin}/wp-json/form_plugin/v1/submissions`,
      );
      setSubmissions(res.data);
    };
    fetchData();
  }, []);

  // ২. রিসেন্ড হ্যান্ডলার
  const handleResend = async (id) => {
    setStatus("Sending...");
    try {
      const res = await axios.post(
        `${window.location.origin}/wp-json/form_plugin/v1/resend/${id}`,
      );
      if (res.data.success) {
        setStatus("Mail Sent Successfully!");
        setTimeout(() => setStatus(""), 3000); // ৩ সেকেন্ড পর মেসেজ চলে যাবে
      }
    } catch (err) {
      setStatus("Failed to resend.", err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Submission Dashboard
      </h1>
      {status && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {status}
        </div>
      )}

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-blue-600 text-white font-medium">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Message</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {submissions.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition">
                <td className="p-4">{item.name}</td>
                <td className="p-4">{item.email}</td>
                <td className="p-4 italic text-gray-600">{item.message}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleResend(item.id)}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded shadow-sm text-sm"
                  >
                    Resend Mail
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

export default SubmissionTable;
