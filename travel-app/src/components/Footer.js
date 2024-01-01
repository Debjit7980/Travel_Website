import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Connect with Us</h3>
          <ul>
            <li><a href="https://facebook.com" target='blank'>Facebook</a></li>
            <li><a href="https://twitter.com" target='blank'>Twitter</a></li>
            <li><a href="https://linkedin.com" target='blank'>LinkedIn</a></li>
            <li><a href="https://instagram.com" target='blank'>Instagram</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Information</h3>
          <p>Email: debjitsingharoy007@gmail.com</p>
          <p>Phone: +91 7980921021</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2023 NaturesDeck. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
