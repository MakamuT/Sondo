import './home.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
function Footer() {
return (<footer className="footer">
    <div >
        <div className="row">
            <div className="footer-col">
                <h4>Need to know</h4>
            <ul>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/services">Our Services</Link></li>
            </ul>
            </div>
            <div className="footer-col">
                <h4>Need Help</h4>
            <ul>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
            </div>
            <div className="footer-col">
                <h4>company</h4>
            <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/cookies">Cookies Policy</Link></li>
            </ul>
            </div>
            <div className="footer-col">
                <h4>follow us</h4>
                <div className="social-links">
                    <a href="#"> <FaFacebookF /></a>
                    <a href="#"><FaTwitter/></a>
                    <a href="#"><FaInstagram/></a>
                    <a href="#"><FaLinkedinIn/></a>
                </div>
            </div>
        </div>
    </div>
</footer>
);
}

export default Footer;
