// RegisterPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "../world-blood-donor-day-creative-collage.jpg";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Donor");
  const [bloodType, setBloodType] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const bloodTypes = [
    "A_POSITIVE", "B_POSITIVE", "O_POSITIVE", "AB_POSITIVE",
    "A_NEGATIVE", "B_NEGATIVE", "O_NEGATIVE", "AB_NEGATIVE"
  ];

  const handleRegister = async (e) => {
    e.preventDefault();
    if (role === "Donor" && !bloodType) {
      setError("Blood type is required for donors.");
      return;
    }
    setError("");

    const userData = { name, email, password, role: role.toUpperCase(), bloodType: role === "Donor" ? bloodType : null };

    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert("Registration Successful");
        navigate("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration Failed");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover" }}>
      <div className="card p-4 shadow-lg" style={{ width: "400px", background: "rgba(255, 255, 255, 0.9)", borderRadius: "15px" }}>
        <h2 className="text-center mb-4 text-danger">Blood Bank Registration</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="Donor">Donor</option>
              <option value="Hospital">Hospital</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          {role === "Donor" && (
            <div className="mb-3">
              <label className="form-label">Blood Type</label>
              <select className="form-select" value={bloodType} onChange={(e) => setBloodType(e.target.value)} required>
                <option value="">Select Blood Type</option>
                {bloodTypes.map((type) => (
                  <option key={type} value={type}>{type.replace("_", " ")}</option>
                ))}
              </select>
            </div>
          )}
          <button type="submit" className="btn btn-danger w-100">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;