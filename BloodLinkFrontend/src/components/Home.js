import React from "react";
import { Link } from "react-router-dom";

import Footer from "./Footer";
import { Header } from "./Header";

import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  return (
    <div>
      <Header />
      <main className="container text-center mt-5">

        <p>
          Welcome to the Blood Bank Management System, your trusted platform for blood donations and requests.
          We are committed to bridging the gap between donors and those in need, ensuring that every life gets the help it deserves.
        </p>
        
        <div className="mt-4">
          <Link to="/register" className="btn btn-danger m-2">Register</Link>
          <Link to="/login" className="btn btn-danger m-2">Login</Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;

