import React, { useState } from 'react';

const AdmissionForm = () => {

  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Corrected state name
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple Validation for Name, Email, and Password
    if (Name.length > 2) {
      if (Email.length > 5) {
        if (password.length > 3) {
          try {
            const newUser = {
              userName: Name,
              userEmail: Email,
              hasPassword: password,
            };

            // API call to insert the data
            const response = await fetch("https://669b43dc276e45187d34f8ff.mockapi.io/school/Login", {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newUser),
            });

            if (response.ok) {
              setSuccess("User entered successfully!");
              setError(""); // Clear any previous errors
              console.log("User successfully added:", newUser);
            } else {
              throw new Error('Failed to enter student');
            }
          } catch (err) {
            setError(err.message); // Set error state
            setSuccess(""); // Clear any previous success messages
          }
        } else {
          setError("Password should be at least 4 characters");
        }
      } else {
        setError("Email should be valid");
      }
    } else {
      setError("Name should be at least 3 characters");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className='text-center mt-5'>CRUD by Salman Developer</h1>
      {error && <div className="alert alert-danger">{error}</div>} {/* Display error */}
      {success && <div className="alert alert-success">{success}</div>} {/* Display success */}

      <form className='mt-4' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={password} // Make it a controlled component
            onChange={(e) => setPassword(e.target.value)} // Handle password change
          />
        </div>

        <button type="submit" className="btn btn-dark">Submit</button>
      </form>
    </div>
  );
};

export default AdmissionForm;
