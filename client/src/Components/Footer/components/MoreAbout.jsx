import React from 'react'
import { Link } from 'react-router-dom'

function MoreAbout() {
    return (
        <div className="footer-links">
            <Link to="about" className="footer-link-item dark-footer-link-item" aria-label="About Us">About Us</Link>
            <Link to="shop" className="footer-link-item dark-footer-link-item" aria-label="Shop">Shop</Link>
            <Link to="contact" className="footer-link-item dark-footer-link-item" aria-label="Contact Us">Contact Us</Link>
            <Link to="faq" className="footer-link-item dark-footer-link-item" aria-label="FAQ">FAQ</Link>
        </div>
    )
}

export default MoreAbout