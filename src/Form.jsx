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
    <form onSubmit={handleSubmit} className="bg-slate-200 rounded-sm">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Admin Name.."
        required
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
        type="email"
        placeholder="admin Email"
        required
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        placeholder="Messages"
        required
      />
      <button type="submit">Submit Now</button>
      <p>{status}</p>
    </form>
  );
};

export default Form;
