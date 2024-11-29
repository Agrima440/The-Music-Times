import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function SocialLinks() {

    const socialIcons = [
        { Icon: FaFacebook, onHover: 'hover:text-blue-400', link: '/facebook' },
        { Icon: FaXTwitter, onHover: 'hover:text-black', link: '/x' },
        { Icon: FaInstagram, onHover: 'hover:text-purple-400', link: '/instagram' },
        { Icon: FaLinkedin, onHover: 'hover:text-blue-400', link: '/linkedin' },
    ]

    return (
        <div className="footer-icons">
            {socialIcons.map(({ Icon, onHover, link }, idx) => (
                <Link to={link} key={idx} aria-label={`social-${idx}`} className={`footer-icon ${onHover}`}>
                    <Icon />
                </Link>
            ))}
        </div>
    )
}

export default SocialLinks