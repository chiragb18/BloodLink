// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [donationRequests, setDonationRequests] = useState([]);
//   const [hospitalRequests, setHospitalRequests] = useState([]);
//   const [error, setError] = useState("");
//   const [adminName, setAdminName] = useState("");
//   const [activeTab, setActiveTab] = useState("users");

//   useEffect(() => {
//     const loggedInAdmin = JSON.parse(localStorage.getItem("user"));
//     if (loggedInAdmin && loggedInAdmin.name) {
//       setAdminName(loggedInAdmin.name);
//     }
//     fetchUsers();
//     fetchDonationRequests();
//     fetchHospitalRequests();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const loggedInUser = JSON.parse(localStorage.getItem("user"));
//       const token = loggedInUser ? loggedInUser.token : '';  // Retrieve token from localStorage
  
//       const response = await axios.get("http://localhost:8080/users/", {
//         headers: {
//           "Authorization": `Bearer ${token}`,  // Include token in Authorization header
//         },
//       });
  
//       setUsers(response.data);
//     } catch (err) {
//       setError("Failed to fetch users.");
//     }
//   };
  

//   const fetchDonationRequests = async () => {
//     try {
//       const loggedInUser = JSON.parse(localStorage.getItem("user"));
//       const token = loggedInUser ? loggedInUser.token : '';  // Retrieve token from localStorage
  
//       const response = await axios.get("http://localhost:8080/donation-requests/pending", {
//         headers: {
//           "Authorization": `Bearer ${token}`,  // Include token in Authorization header
//         },
//       });
  
//       setDonationRequests(response.data);
//     } catch (err) {
//       setError("Failed to fetch donation requests.");
//     }
//   };
  

//   const fetchHospitalRequests = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/blood-requests/");
//       setHospitalRequests(response.data);
//     } catch (err) {
//       setError("Failed to fetch hospital blood requests.");
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     window.location.href = "/";
//   };

//   const approveDonationRequest = async (id) => {
//     try {
//       await axios.put(`http://localhost:8080/donation-requests/approve/${id}`);
//       fetchDonationRequests();  // Refresh donation requests
//     } catch (err) {
//       setError("Failed to approve donation request.");
//     }
//   };

//   const deleteDonationRequest = async (id) => {
//     try {
//       await axios.delete(`http://localhost:8080/donation-requests/delete/${id}`);
//       fetchDonationRequests();  // Refresh donation requests
//     } catch (err) {
//       setError("Failed to delete donation request.");
//     }
//   };

//   const approveBloodRequest = async (id) => {
//     try {
//       await axios.put(`http://localhost:8080/blood-requests/approve/${id}`);
//       fetchHospitalRequests();  // Refresh hospital blood requests
//     } catch (err) {
//       setError("Failed to approve blood request.");
//     }
//   };

//   const approveRemainingBloodRequest = async (id) => {
//     try {
//       await axios.put(`http://localhost:8080/blood-requests/approve-remaining/${id}`);
//       fetchHospitalRequests();  // Refresh hospital blood requests
//     } catch (err) {
//       setError("Failed to approve remaining blood request.");
//     }
//   };

//   const rejectBloodRequest = async (id) => {
//     try {
//       await axios.put(`http://localhost:8080/blood-requests/reject/${id}`);
//       fetchHospitalRequests();  // Refresh hospital blood requests
//     } catch (err) {
//       setError("Failed to reject blood request.");
//     }
//   };

//   return (
//     <div className="container-fluid">
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//         <div className="container">
//           <span className="navbar-brand">Admin Dashboard</span>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav me-auto">
//               <li className="nav-item">
//                 <button className={`nav-link ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>
//                   Users
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button className={`nav-link ${activeTab === "donationRequests" ? "active" : ""}`} onClick={() => setActiveTab("donationRequests")}>
//                   Donation Requests
//                 </button>
//               </li>
//               <li className="nav-item">
//                 <button className={`nav-link ${activeTab === "hospitalRequests" ? "active" : ""}`} onClick={() => setActiveTab("hospitalRequests")}>
//                   Blood Requests
//                 </button>
//               </li>
//             </ul>
//           </div>
//           <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
//         </div>
//       </nav>

//       <div className="container mt-4">
//         <h2 className="text-center">Welcome, {adminName}!</h2>
//         {error && <p className="text-danger text-center">{error}</p>}

//         {/* Users Tab */}
//         {activeTab === "users" && (
//           <div>
//             <h3>All Users</h3>
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Role</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {users.length > 0 ? (
//                   users.map((user) => (
//                     <tr key={user.id}>
//                       <td>{user.id}</td>
//                       <td>{user.name}</td>
//                       <td>{user.role}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="3" className="text-center">No users found</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Donation Requests Tab */}
//         {activeTab === "donationRequests" && (
//           <div>
//             <h3>Pending Donation Requests</h3>
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th>Donor Name</th>
//                   <th>Blood Type</th>
//                   <th>Quantity</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {donationRequests.length > 0 ? (
//                   donationRequests.map((request) => (
//                     <tr key={request.id}>
//                       <td>{request.donor?.name || "Unknown"}</td>
//                       <td>{request.bloodType}</td>
//                       <td>{request.quantity}</td>
//                       <td>
//                         <button className="btn btn-success" onClick={() => approveDonationRequest(request.id)}>Approve</button>
//                         <button className="btn btn-danger" onClick={() => deleteDonationRequest(request.id)}>Delete</button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="text-center">No pending requests</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Hospital Requests Tab */}
//         {activeTab === "hospitalRequests" && (
//           <div>
//             <h3>Hospital Blood Requests</h3>
//             <table className="table table-striped">
//               <thead>
//                 <tr>
//                   <th>Hospital Name</th>
//                   <th>Blood Type</th>
//                   <th>Quantity</th>
//                   <th>Remaining Quantity</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {hospitalRequests.length > 0 ? (
//                   hospitalRequests.map((request) => (
//                     <tr key={request.id}>
//                       <td>{request.hospital?.name || "Unknown"}</td>
//                       <td>{request.bloodType}</td>
//                       <td>{request.quantity}</td>
//                       <td>{request.remainingQuantity}</td>
//                       <td>{request.status}</td>
//                       <td>
//                         {request.status === "PARTIALLY_APPROVED" && (
//                           <button className="btn btn-success" onClick={() => approveRemainingBloodRequest(request.id)}>Approve Remaining</button>
//                         )}
//                         <button className="btn btn-success" onClick={() => approveBloodRequest(request.id)}>Approve</button>
//                         <button className="btn btn-danger" onClick={() => rejectBloodRequest(request.id)}>Reject</button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="6" className="text-center">No hospital requests found</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [donationRequests, setDonationRequests] = useState([]);
  const [hospitalRequests, setHospitalRequests] = useState([]);
  const [error, setError] = useState("");
  const [adminName, setAdminName] = useState("");
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    const loggedInAdmin = JSON.parse(localStorage.getItem("user"));
    if (loggedInAdmin && loggedInAdmin.name) {
      setAdminName(loggedInAdmin.name);
    }
    fetchUsers();
    fetchDonationRequests();
    fetchHospitalRequests();
  }, []);

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  const fetchUsers = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get("http://localhost:8080/users/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err) {
      setError("Failed to fetch users.");
    }
  };

  const fetchDonationRequests = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get("http://localhost:8080/donation-requests/pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDonationRequests(response.data);
    } catch (err) {
      setError("Failed to fetch donation requests.");
    }
  };

  const fetchHospitalRequests = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get("http://localhost:8080/blood-requests/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHospitalRequests(response.data);
    } catch (err) {
      setError("Failed to fetch hospital blood requests.");
    }
  };

  const approveDonationRequest = async (id) => {
    try {
      const token = getAuthToken();
      await axios.put(`http://localhost:8080/donation-requests/approve/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDonationRequests();
    } catch (err) {
      setError("Failed to approve donation request.");
    }
  };

  const deleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = getAuthToken();
        await axios.delete(`http://localhost:8080/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("User deleted successfully!");
        fetchUsers(); // Refresh user list
      } catch (err) {
        setError("Failed to delete user.");
      }
    }
  };
  

  const deleteDonationRequest = async (id) => {
    try {
      const token = getAuthToken();
      await axios.delete(`http://localhost:8080/donation-requests/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchDonationRequests();
    } catch (err) {
      setError("Failed to delete donation request.");
    }
  };

  const approveBloodRequest = async (id) => {
    try {
      const token = getAuthToken();
      await axios.put(`http://localhost:8080/blood-requests/approve/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchHospitalRequests();
    } catch (err) {
      setError("Mail Sent Successfully Blood cannot be approved");
    }
  };

  const approveRemainingBloodRequest = async (id) => {
    try {
      const token = getAuthToken();
      await axios.put(`http://localhost:8080/blood-requests/approve-remaining/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchHospitalRequests();
    } catch (err) {
      setError("Failed to approve remaining blood request.");
    }
  };

  const rejectBloodRequest = async (id) => {
    try {
      const token = getAuthToken();
      await axios.put(`http://localhost:8080/blood-requests/reject/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchHospitalRequests();
    } catch (err) {
      setError("Failed to reject blood request.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="container-fluid">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <span className="navbar-brand">Admin Dashboard</span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <button className={`nav-link ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>
                  Users
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeTab === "donationRequests" ? "active" : ""}`} onClick={() => setActiveTab("donationRequests")}>
                  Donation Requests
                </button>
              </li>
              <li className="nav-item">
                <button className={`nav-link ${activeTab === "hospitalRequests" ? "active" : ""}`} onClick={() => setActiveTab("hospitalRequests")}>
                  Blood Requests
                </button>
              </li>
            </ul>
          </div>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="container mt-4">
        <h2 className="text-center">Welcome, {adminName}!</h2>
        {error && <p className="text-danger text-center">{error}</p>}

        {/* Users Tab */}
        {activeTab === "users" && (
          <div>
            <h3>All Users</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.role}</td>
                      <td><button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button></td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center">No users found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Donation Requests Tab */}
        {activeTab === "donationRequests" && (
          <div>
            <h3>Pending Donation Requests</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Donor Name</th>
                  <th>Blood Type</th>
                  <th>Quantity</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {donationRequests.length > 0 ? (
                  donationRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.donor?.name || "Unknown"}</td>
                      <td>{request.bloodType}</td>
                      <td>{request.quantity}</td>
                      <td>
                        <button className="btn btn-success" onClick={() => approveDonationRequest(request.id)}>Approve</button>
                        <button className="btn btn-danger" onClick={() => deleteDonationRequest(request.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No pending requests</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Hospital Requests Tab */}
        {activeTab === "hospitalRequests" && (
          <div>
            <h3>Hospital Blood Requests</h3>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Hospital Name</th>
                  <th>Blood Type</th>
                  <th>Quantity</th>
                  <th>Remaining Quantity</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {hospitalRequests.length > 0 ? (
                  hospitalRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.hospital?.name || "Unknown"}</td>
                      <td>{request.bloodType}</td>
                      <td>{request.quantity}</td>
                      <td>{request.remainingQuantity}</td>
                      <td>{request.status}</td>
                      <td>
                        {request.status === "PARTIALLY_APPROVED" && (
                          <button className="btn btn-success" onClick={() => approveRemainingBloodRequest(request.id)}>Approve Remaining</button>
                        )}
                        <button className="btn btn-success" onClick={() => approveBloodRequest(request.id)}>Approve</button>
                        <button className="btn btn-danger" onClick={() => rejectBloodRequest(request.id)}>Reject</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No hospital requests found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
