
// import { jwtDecode } from "jwt-decode";  // Updated import
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Alert, Button, Card, Form, Spinner } from "react-bootstrap"; // Bootstrap components

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); // Error state to handle login errors
//   const [loading, setLoading] = useState(false); // Loading state for the login button
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     setLoading(true);
//     setError(""); // Clear previous errors

//     try {
//       const response = await axios.post("http://localhost:8080/users/login", {
//         email,
//         password,
//       });

//       const token = response.data.jwtToken;
//       localStorage.setItem("token", token); // Store token

//       const userData = {
//         id: response.data.id,
//         name: response.data.name,
//         role: response.data.role,
//         bloodType: response.data.bloodType,
//       };

//       console.log("User data to store:", userData); // Verify the user data

//       // Store user data as a JSON string in localStorage
//       localStorage.setItem("user", JSON.stringify(userData));

//       const decodedToken = jwtDecode(token); // Decode token
//       localStorage.setItem("role", response.data.role); // Store role from response

//       console.log("Token decoded:", decodedToken); // Verify token decoding
//       console.log("User role:", response.data.role); // Verify the role

//       // Redirect based on role
//       if (response.data.role === "ADMIN") {
//         navigate("/admin/dashboard"); // Navigate to Admin dashboard
//       } else if (response.data.role === "DONOR") {
//         navigate("/donor/dashboard"); // Navigate to Donor dashboard
//       } else if (response.data.role === "HOSPITAL") {
//         navigate("/hospital/dashboard"); // Navigate to Hospital dashboard
//       }
//     } catch (error) {
//       setError("Invalid email or password"); // Show error message if login fails
//       setLoading(false); // Stop loading spinner
//     }
//   };

//   const handleRegisterRedirect = () => {
//     navigate("/register"); // Navigate to the registration page
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
//       <Card className="p-4 shadow-sm" style={{ width: "400px" }}>
//         <h2 className="text-center mb-4">Login</h2>

//         {/* Show error message if login fails */}
//         {error && <Alert variant="danger">{error}</Alert>}

//         <Form>
//           <Form.Group className="mb-3" controlId="formBasicEmail">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               placeholder="Enter email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </Form.Group>

//           <Button
//             variant="primary"
//             size="lg"
//             block
//             onClick={handleLogin}
//             disabled={loading}
//           >
//             {loading ? (
//               <>
//                 <Spinner animation="border" size="sm" /> Logging in...
//               </>
//             ) : (
//               "Login"
//             )}
//           </Button>
//         </Form>

//         {/* Register button */}
//         <div className="mt-3 text-center">
//           <Button variant="link" onClick={handleRegisterRedirect}>
//             Don't have an account? Register here
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default LoginPage;




import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        email,
        password,
      });

      const token = response.data.jwtToken;
      localStorage.setItem("token", token);

      const userData = {
        id: response.data.id,
        name: response.data.name,
        role: response.data.role,
        bloodType: response.data.bloodType,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("role", response.data.role);

      if (response.data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (response.data.role === "DONOR") {
        navigate("/donor/dashboard");
      } else if (response.data.role === "HOSPITAL") {
        navigate("/hospital/dashboard");
      }
    } catch (error) {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: `url('https://png.pngtree.com/background/20210711/original/pngtree-geometric-gradient-creative-blood-donation-poster-background-material-picture-image_1127152.jpg`,
      }}
    >
      <Card
        className="p-4 shadow-lg text-white"
        style={{
          width: "400px",
          background: "rgba(220, 20, 60, 0.9)", // Dark red with transparency
          borderRadius: "15px",
        }}
      >
        <h2 className="text-center mb-4">🔴 Blood Bank Login</h2>

        {error && <Alert variant="danger">{error}</Alert>}

        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderRadius: "8px" }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ borderRadius: "8px" }}
            />
          </Form.Group>

          <Button
            variant="light"
            size="lg"
            block
            onClick={handleLogin}
            disabled={loading}
            style={{ borderRadius: "8px", fontWeight: "bold", color: "crimson" }}
          >
            {loading ? (
              <>
                <Spinner animation="border" size="sm" /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </Form>

        <div className="mt-3 text-center">
          <Button variant="link" onClick={handleRegisterRedirect} style={{ color: "white" }}>
            Don't have an account? Register here
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
