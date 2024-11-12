import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AdmissionForm = () => {
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const { id } = useParams();  // To get the user ID if we're editing
  const navigate = useNavigate(); // To navigate after submit

  // Fetch user data if editing
  useEffect(() => {
    if (id) {
      fetch(`https://669b43dc276e45187d34f8ff.mockapi.io/school/Login/${id}`)
        .then(response => response.json())
        .then(data => {
          setName(data.userName);
          setEmail(data.userEmail);
          setPassword(data.hasPassword);
        })
        .catch(() => setMessage('Error fetching user data'));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { userName: Name, userEmail: Email, hasPassword: password };

    const method = id ? 'PUT' : 'POST';  // Use PUT for updates, POST for new users
    const url = id 
      ? `https://669b43dc276e45187d34f8ff.mockapi.io/school/Login/${id}`
      : 'https://669b43dc276e45187d34f8ff.mockapi.io/school/Login';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setMessage(id ? 'User updated successfully!' : 'User added successfully!');
        navigate('/'); // Redirect after successful submission
      } else {
        setMessage('Failed to save user data');
      }
    } catch {
      setMessage('Error saving data');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mt-5">{id ? 'Update User' : 'Add New User'}</h1>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" value={Name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={Email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-dark">{id ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default AdmissionForm;
