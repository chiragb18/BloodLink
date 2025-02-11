import React from "react";
import { Header } from "./Header";
import Footer from "./Footer";

const AboutUs = () => {
  return (
    <div>
      <Header />
      <main className="container text-center mt-5">
        <h2>About Us</h2>
        <p>
          The Blood Bank Management System is a platform designed to connect blood donors with those in need.
          Our mission is to ensure a smooth, efficient, and reliable way for people to donate and receive blood.
        </p>
        <p>
          We work with hospitals and volunteers to maintain an up-to-date blood inventory, ensuring that life-saving
          blood is available whenever and wherever it is needed.
        </p>
        <p>
          Join us in our mission to save lives by donating blood or helping spread awareness.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
