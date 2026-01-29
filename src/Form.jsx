import React, { useState } from "react";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending..");

    try {
      const res = await axios.post("/wp-json/tcf/v1/submit", formData, {
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.success) {
        setStatus("send successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus(res.data.message);
      }
    } catch (err) {
      setStatus("there have an error ! try again", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg relative w-full backdrop-blur-md inset-1 m-auto h-screen flex flex-col items-center justify-center"
    >
      <div className="shadow-sm p-8 text-center rounded-sm">
        <h4 className="text-2xl font-black capitalize mb-10 cursor-pointer transition-all duration-300 ease-in-out whitespace-nowrap">
          Form handling with ajax
        </h4>
        <input
          name="name"
          className="w-full px-4 mb-3 py-4 bg-slate-50 outline-none focus:ring-1 focus:ring-blue-400 rounded-sm text-sm text-slate-600"
          value={formData.name}
          onChange={handleChange}
          placeholder="Admin Name.."
          required
        />
        <input
          name="email"
          value={formData.email}
          className="w-full px-4 py-4 mb-3 bg-slate-50 outline-none focus:ring-1 focus:ring-blue-400 rounded-sm text-sm text-slate-600"
          onChange={handleChange}
          type="email"
          placeholder="admin Email"
          required
        />
        <textarea
          name="message"
          className="w-full px-4 mb-3 py-4 h-30 bg-slate-50 outline-none focus:ring-1 focus:ring-blue-400 rounded-sm text-sm text-slate-600"
          value={formData.message}
          onChange={handleChange}
          placeholder="Messages"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 w-full text-sm font-medium bg-slate-200 text-slate-600 capitalize transition-all duration-300 ease-in-out focus:ring-1 focus:ring-blue-400 rounded-sm cursor-pointer hover:bg-blue-400 hover:text-black"
        >
          Submit Now
        </button>
      </div>
      <p className="text-red-300 text-sm">{status}</p>
    </form>
  );
};

export default Form;
