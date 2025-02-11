import axios from "axios";

// Base URL for API
const API_URL = "http://localhost:8080"; // Adjust backend URL if necessary

// Login API - Using Axios for sending POST request to login
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    return response.data; // Ensure response contains the `role` and other user info
  } catch (error) {
    throw new Error("Login failed");
  }
};

// Register API - Using Axios for sending POST request to register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data; // Returning response data (e.g., the user object)
  } catch (error) {
    throw new Error("Registration failed");
  }
};

// Example of how to fetch pending donation requests for Admin
export const getPendingRequests = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/donation-requests/pending`);
    return response.data; // Assuming response returns a list of requests
  } catch (error) {
    throw new Error("Error fetching pending requests");
  }
};

// Example of how to approve a donation request for Admin
export const approveRequest = async (requestId) => {
  try {
    const response = await axios.put(`${API_URL}/admin/donation-requests/approve/${requestId}`);
    return response.data; // Return approved request data
  } catch (error) {
    throw new Error("Error approving request");
  }
};

// Example of how a donor submits a blood donation request
export const submitDonationRequest = async (donorId, bloodType, quantity) => {
  try {
    const requestData = { donorId, bloodType, quantity, status: "PENDING" };
    const response = await axios.post(`${API_URL}/donor/blood-request`, requestData);
    return response.data; // Return the data from the server (e.g., donation request details)
  } catch (error) {
    throw new Error("Error submitting donation request");
  }
};
