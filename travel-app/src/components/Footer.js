import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link to="/services">Blogs</Link></li>
            <li><Link to="/">Products</Link></li>
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
          <p>Phone: +917980921021</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2023 NaturesDeck. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
