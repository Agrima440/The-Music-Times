import React from "react";
import { assets } from "../../assets/assets";

import "./footer.css";

import MoreAbout from "./components/MoreAbout"
import SocialLinks from "./components/SocialLinks.jsx"

const Footer = () => {

    return (
        <div className="footer dark-footer">
            <div
                className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="flex flex-col items-start space-y-4 mb-8 md:mb-0">
                    <img src={assets.logo} className="footer-logo mix-blend-difference" alt="The Music Times Logo" />
                    <p className="footer-text dark-footer-text">
                        Explore the best selection of musical instruments and gear. Quality and performance at your fingertips.
                    </p>
                </div>

                <div>
                    <p className="footer-section-title dark-footer-section-title">
                        Stay Updated
                    </p>
                    <form className="flex w-full">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="footer-input dark-footer-input"
                        />
                        <button
                            className="footer-button "
                            onClick={(e) => e.preventDefault()}
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <MoreAbout />

            <SocialLinks />

            {/* <div className="flex justify-center my-8">
                <button
                    className="footer-login-button"
                    aria-label="Login"
                    onClick={() => {
                        const element = document.getElementById("cursor");
                        if (element) {
                            window.scrollTo({
                                top: element.offsetTop,
                                behavior: "smooth"
                            });
                        }
                    }}
                >
                    Login
                </button>
            </div> */}

            <p className="footer-copyright dark-footer-copyright">
                © {new Date().getFullYear()} The Music Times. All rights reserved.
            </p>
        </div>
    );
};

export default Footer;
