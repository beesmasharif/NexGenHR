import React, { useState } from 'react';
import './CreateJobPost.css'; // Enable this if you add custom styles below

const CreateJobPost = () => {
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    description: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/job-posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      alert(data.message);
      setForm({ title: '', company: '', location: '', description: '' });
    } catch (err) {
      console.error(err);
      alert('Failed to create job post');
    }
  };

  return (
    <div className="job-form-container">
      <div className="job-form-card">
        <h2 className="text-center mb-4">Create Job Post</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" value={form.title} onChange={handleChange} className="form-control mb-3" placeholder="Job Title" required />
          <input name="company" value={form.company} onChange={handleChange} className="form-control mb-3" placeholder="Company" required />
          <input name="location" value={form.location} onChange={handleChange} className="form-control mb-3" placeholder="Location" required />
          <textarea name="description" value={form.description} onChange={handleChange} className="form-control mb-4" placeholder="Description" rows="4" />
          <button type="submit" className="btn btn-success w-100">Create</button>
          </form>
      </div>
    </div>
  );
};

export default CreateJobPost;
