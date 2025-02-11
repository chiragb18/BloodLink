

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Button, Card, Alert, Spinner } from "react-bootstrap";
// import Certificate from "./Certificate"; // Import the Certificate component

// const DonorDashboard = () => {
//   const [user, setUser] = useState(null);
//   const [donationRequestStatus, setDonationRequestStatus] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isEligibleForCertificate, setIsEligibleForCertificate] = useState(false);
//   const [donationDate, setDonationDate] = useState("");
//   const [showCertificate, setShowCertificate] = useState(false); // State to track certificate visibility
//   const navigate = useNavigate();

//   // Fetch user data from localStorage (including blood type)
//   useEffect(() => {
//     const loggedInUser = localStorage.getItem("user");

//     if (loggedInUser) {
//       try {
//         setUser(JSON.parse(loggedInUser));
//       } catch (error) {
//         console.error("Failed to parse user data:", error);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (user) {
//       checkDonationEligibility(user.id);
//     }
//   }, [user]);

//   const checkDonationEligibility = async (donorId) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Token is missing. Please log in again.");
//         return;
//       }

//       const response = await axios.get(
//         `http://localhost:8080/donation-requests/donation-eligibility/${donorId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.status === 200) {
//         setIsEligibleForCertificate(true);
//         setDonationDate(response.data.donationDate); // Use the actual donation date from the response
//       }
//     } catch (err) {
//       setIsEligibleForCertificate(false);
//       setError("No approved donation in the last 3 months.");
//     }
//   };

//   const handleDonationRequest = async () => {
//     if (!user) {
//       setError("User data is missing.");
//       return;
//     }

//     if (!user.bloodType) {
//       setError("Blood type is required to make a donation request.");
//       return;
//     }

//     const donationData = {
//       donorId: user.id,
//       bloodType: user.bloodType,
//       quantity: 1,
//     };

//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         setError("Token is missing. Please log in again.");
//         return;
//       }

//       const response = await axios.post(
//         "http://localhost:8080/donation-requests/blood-request",
//         donationData,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       if (response.status === 201) {
//         setDonationRequestStatus("Donation request successfully made!");
//         setError(""); // Clear any previous errors
//       }
//     } catch (err) {
//       if (err.response) {
//         setError(err.response.data.message || "You have already donated blood in the past month. Please wait before making another request.");
//       } else {
//         setError("Network error. Please try again later.");
//       }
//       setDonationRequestStatus(""); // Clear success message
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user"); // Remove user data from localStorage
//     localStorage.removeItem("token"); // Remove token from localStorage
//     localStorage.removeItem("role"); // Optionally remove role if needed
//     navigate("/login"); // Redirect to login page
//   };

//   const handleViewCertificate = () => {
//     setShowCertificate(true); // Show certificate when the button is clicked
//   };

//   return (
//     <div className="container mt-5">
//       <Card className="shadow-sm p-4">
//         <Card.Body>
//           <h1 className="text-center mb-4">Donor Dashboard</h1>
//           <p className="text-center">
//             Welcome, <strong>{user ? user.name : "Donor"}</strong>! You can make a blood donation request here.
//           </p>

//           <div className="d-flex justify-content-center">
//             <Button
//               variant="primary"
//               size="lg"
//               onClick={handleDonationRequest}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <Spinner animation="border" size="sm" /> Submitting...
//                 </>
//               ) : (
//                 "Make Donation Request"
//               )}
//             </Button>
//           </div>

//           {/* Display status messages */}
//           {donationRequestStatus && (
//             <Alert variant="success" className="mt-4">
//               {donationRequestStatus}
//             </Alert>
//           )}

//           {error && (
//             <Alert variant="danger" className="mt-4">
//               {error}
//             </Alert>
//           )}

//           {/* Conditionally render the button to view or download the certificate */}
//           {isEligibleForCertificate && (
//             <div className="d-flex justify-content-center mt-4">
//               <Button variant="success" onClick={handleViewCertificate}>
//                 View Certificate
//               </Button>
//             </div>
//           )}

//           {/* Conditionally render the certificate if the user clicks the button */}
//           {showCertificate && isEligibleForCertificate && (
//             <Certificate donorName={user.name} bloodType={user.bloodType} donationDate={donationDate} />
//           )}
//         </Card.Body>
//       </Card>
//       <button onClick={handleLogout} className="btn btn-danger">
//         Logout
//       </button>
//     </div>
//   );
// };

// export default DonorDashboard;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Card, Alert, Spinner } from "react-bootstrap";
import Certificate from "./Certificate"; // Import the Certificate component

const DonorDashboard = () => {
  const [user, setUser] = useState(null);
  const [donationRequestStatus, setDonationRequestStatus] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEligibleForCertificate, setIsEligibleForCertificate] = useState(false);
  const [donationDate, setDonationDate] = useState("");
  const [showCertificate, setShowCertificate] = useState(false); // State to track certificate visibility
  const navigate = useNavigate();

  // Fetch user data from localStorage (including blood type)
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");

    if (loggedInUser) {
      try {
        setUser(JSON.parse(loggedInUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  const handleDonationRequest = async () => {
    if (!user) {
      setError("User data is missing.");
      return;
    }

    if (!user.bloodType) {
      setError("Blood type is required to make a donation request.");
      return;
    }

    const donationData = {
      donorId: user.id,
      bloodType: user.bloodType,
      quantity: 1,
    };

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token is missing. Please log in again.");
        return;
      }

      const response = await axios.post(
        "http://localhost:8080/donation-requests/blood-request",
        donationData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        setDonationRequestStatus("Donation request successfully made!");
        setError(""); // Clear any previous errors
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "You have already donated blood in the past month. Please wait before making another request.");
      } else {
        setError("Network error. Please try again later.");
      }
      setDonationRequestStatus(""); // Clear success message
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove user data from localStorage
    localStorage.removeItem("token"); // Remove token from localStorage
    localStorage.removeItem("role"); // Optionally remove role if needed
    navigate("/login"); // Redirect to login page
  };

  const handleViewCertificate = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token is missing. Please log in again.");
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/donation-requests/donation-eligibility/${user.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setIsEligibleForCertificate(true);
        setDonationDate(response.data.donationDate); // Set donation date from response
        setShowCertificate(true); // Show certificate if eligible
        setError(""); // Clear any previous errors
      }
    } catch (err) {
      setIsEligibleForCertificate(false);
      setShowCertificate(false); // Hide certificate if not eligible
      setError("No approved donation in the last 3 months.");
    }
  };

  return (
    <div className="container mt-5">
      <Card className="shadow-sm p-4">
        <Card.Body>
          <h1 className="text-center mb-4">Donor Dashboard</h1>
          <p className="text-center">
            Welcome, <strong>{user ? user.name : "Donor"}</strong>! You can make a blood donation request here.
          </p>

          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              size="lg"
              onClick={handleDonationRequest}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" /> Submitting...
                </>
              ) : (
                "Make Donation Request"
              )}
            </Button>
          </div>

          {/* Display status messages */}
          {donationRequestStatus && (
            <Alert variant="success" className="mt-4">
              {donationRequestStatus}
            </Alert>
          )}

          {error && (
            <Alert variant="danger" className="mt-4">
              {error}
            </Alert>
          )}

          {/* Always show the "View Certificate" button */}
          <div className="d-flex justify-content-center mt-4">
            <Button variant="success" onClick={handleViewCertificate}>
              View Certificate
            </Button>
          </div>

          {/* Conditionally render the certificate or error message */}
          {showCertificate && isEligibleForCertificate && (
            <Certificate donorName={user.name} bloodType={user.bloodType} donationDate={donationDate} />
          )}

          {showCertificate && !isEligibleForCertificate && (
            <Alert variant="danger" className="mt-4">
              No approved donation in the last 3 months.
            </Alert>
          )}
        </Card.Body>
      </Card>
      <button onClick={handleLogout} className="btn btn-danger">
        Logout
      </button>
    </div>
  );
};

export default DonorDashboard;
