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
      const res = await axios.post("/wp-json/form_plugin/v1/form", formData, {
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
    <div className="flex items-center bg-linear-to-r from-blue-400 to-purple-400 justify-center w-full h-screen bg-slate-100 backdrop-blur-sm inset-2">
      <form
        onSubmit={handleSubmit}
        className=" flex flex-col rounded-sm max-w-sm w-full py-12 px-5 rounded-sm shadow-md backdrop-blur-sm"
      >
        <input
          name="name"
          className="w-full bg-transparent outline-none mb-5 border-b py-2 pl-1 pr-3 text-white cursor-pointer transition-all duration-500 ease-in-out outline-none focus:border-b-white/20 border-b-white/40 text-sm capitalize"
          value={formData.name}
          onChange={handleChange}
          placeholder="Admin Name.."
          required
        />
        <input
          name="email"
          className="w-full bg-transparent outline-none mb-5 border-b py-2 pl-1 pr-3 text-white cursor-pointer transition-all duration-500 ease-in-out outline-none focus:border-b-white/20 border-b-white/40 text-sm capitalize"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="admin Email"
          required
        />
        <textarea
          name="message"
          className="w-full bg-transparent mb-5 border-b py-2 pl-1 pr-3 text-white cursor-pointer transition-all duration-500 ease-in-out outline-none focus:border-b-white/20 border-b-white/40 text-sm capitalize h-10"
          value={formData.message}
          onChange={handleChange}
          placeholder="Messages"
          required
        />
        <button
          type="submit"
          className="text-black font-medium capitalize cursor-pointer transition-colors duration-500 ease-in-out bg-transparent hover:text-white underline py-2 rounded-sm hover:text-blue-400"
        >
          Submit Now
        </button>
        <p className="text-red-400 text-sm font-normal">{status}</p>
      </form>
    </div>
  );
};

export default Form;
