import React from "react";
import { Header } from "./Header";
import Footer from "./Footer";

const ContactUs = () => {
  return (
    <div>
      <Header />
      <main className="container text-center mt-5">
        <h2>Contact Us</h2>
        <p>If you have any questions or need assistance, feel free to reach out to us:</p>

        <div className="mt-4">
          <p><strong>Email:</strong> chiragborole00.com</p>
          <p><strong>Phone:</strong> +1 234 567 890</p>
          <p><strong>Address:</strong> Shree Ganesh pg Near Honda Showroom Ravet</p>
        </div>

        <p>We are here to help you 24/7. Don't hesitate to contact us!</p>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
