
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import sanketImage from "../header3.jpg"; // Adjust the path if needed

const HospitalDashboard = () => {
  const [hospital, setHospital] = useState(null);
  const [bloodType, setBloodType] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [bloodTypes, setBloodTypes] = useState([]);

  // Fetch hospital data from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setHospital(parsedUser); // Set hospital data
    } else {
      setError("Hospital data not found.");
    }
  }, []);

  // Fetch available blood types when the hospital is loaded
  useEffect(() => {
    if (hospital) {
      const fetchBloodTypes = async () => {
        try {
          const token = localStorage.getItem("token"); // Get JWT token
          const response = await axios.get("http://localhost:8080/blood-requests/blood-types", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setBloodTypes(response.data);
        } catch (err) {
          setError("Failed to fetch blood types. Please try again.");
        }
      };
      fetchBloodTypes();
    }
  }, [hospital]);

  const handleSubmitRequest = async (e) => {
    e.preventDefault();

    if (!bloodType || quantity <= 0) {
      setError("Please provide a valid blood type and quantity.");
      return;
    }

    try {
      const hospitalId = hospital.id; // Use 'id' from localStorage for hospitalId

      await submitBloodRequest(hospitalId, bloodType, quantity);

      setSuccessMessage("Blood request submitted successfully!");
      setError("");
      setBloodType(""); // Reset form fields
      setQuantity(1);
    } catch (err) {
      setError("Error submitting the blood request. Please try again.");
      setSuccessMessage("");
    }
  };

  const submitBloodRequest = async (hospitalId, bloodType, quantity) => {
    try {
      const token = localStorage.getItem("token"); // Get JWT token

      await axios.post("http://localhost:8080/blood-requests/create", {
        hospitalId,
        bloodType,
        quantity,
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token in the headers
        },
      });
    } catch (error) {
      throw new Error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Remove token as well
    window.location.href = "/"; // Redirect to home or login page
  };

  return (
    <div
      className="hospital-dashboard container-fluid"
      style={{
        backgroundImage: `url(${sanketImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        color: "white",
        padding: "50px 0",
      }}
    >
      {hospital ? (
        <div className="row justify-content-center">
          <div className="col-md-8 bg-dark bg-opacity-50 p-4 rounded">
            <h2 className="text-center mb-4">Welcome, {hospital.name}!</h2>
            <p className="text-center">Hospital ID: {hospital.id}</p> {/* Display hospital's 'id' */}

            <div className="text-center mb-3">
              <button onClick={handleLogout} className="btn btn-danger">
                Logout
              </button>
            </div>

            <form onSubmit={handleSubmitRequest}>
              <div className="mb-3">
                <label className="form-label">Blood Type</label>
                <select
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
                  className="form-control"
                  required
                >
                  <option value="">Select Blood Type</option>
                  {bloodTypes.map((type) => (
                    <option key={type} value={type}>
                      {type.replace("_", " ").toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Quantity (in units)</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min="1"
                  className="form-control"
                  placeholder="Enter quantity"
                />
              </div>

              {error && <p className="text-danger">{error}</p>}
              {successMessage && <p className="text-success">{successMessage}</p>}

              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Submit Blood Request
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="text-center text-white">
          <p>Loading user data...</p>
        </div>
      )}
    </div>
  );
};

export default HospitalDashboard;
