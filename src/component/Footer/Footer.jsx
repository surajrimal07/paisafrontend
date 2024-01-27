
import { BiTimeFive } from 'react-icons/bi';
import { BsTwitter, BsYoutube } from 'react-icons/bs';
import { CgMail } from 'react-icons/cg';
import { FaFacebookF, FaPhoneAlt } from 'react-icons/fa';
import { GrInstagram } from 'react-icons/gr';
import { RiWhatsappLine } from 'react-icons/ri';
import { React, useNavigate } from 'react-router-dom';
import logo from '../images/logo.png';
import './Footer.css';

const Footer = () => {
    const navigate = useNavigate();

    const handleNavigation = (event) => {
        event.preventDefault();
        navigate('/faq');
      };

      const handledisclosure = (event) => {
        event.preventDefault();
        navigate('/disclosure');
      };

      const handleprivacy = (event) => {
        event.preventDefault();
        navigate('/privacypolicy');
      };

      const handleterms = (event) => {
        event.preventDefault();
        navigate('/termsandconditions');
      };

      const handledisc = (event) => {
        event.preventDefault();
        navigate('/disclaimer');
      };

      const handleabout = (event) => {
        event.preventDefault();
        navigate('/aboutus');
      };

      const handlecarrier = (event) => {
        event.preventDefault();
        navigate('/career');
      };


    return (
        <>
            <div className="footer" id="footer">
                <div className="footerContainer">

                    <div className="logo">
                        <div className="logoImg">
                            <img src={logo} alt="logo" />
                        </div>
                        <h2 onClick={() => navigate('/') } className="logoName">10Paisa</h2>
                    </div>

                    <div className="topFooter">
                        <div className="tf1">
                            <h4 className="title">Connect with us</h4>
                            <div className="fContactContainer">
                                <div className="fContact">
                                    <FaPhoneAlt color='black' size='20px' />
                                    <span className="fCon">+9779840220290</span>
                                </div>
                                <div className="fContact">
                                    <RiWhatsappLine color='black' size='20px' />
                                    <span className="fCon">+9779840220290</span>
                                </div>
                                <div className="fContact">
                                    <CgMail color='black' size='20px' />
                                    <span className="fCon">10paisaservices@gmail.com</span>
                                </div>
                                <div className="fContact">
                                    <BiTimeFive color='black' size='20px' />
                                    <span className="fCon">Sun to Sat, 9:00AM to 5:00PM</span>
                                </div>
                            </div>
                            <div className="follow">
                                <h4 className="title">Follow Us</h4>
                                <div className="followImgContainer">
                                    <div className="followImg">
                                        <FaFacebookF color='white' size='20px' />
                                    </div>
                                    <div className="followImg">
                                        <BsTwitter color='white' size='20px' />
                                    </div>
                                    <div className="followImg">
                                        <BsYoutube color='white' size='20px' />
                                    </div>
                                    <div className="followImg">
                                        <GrInstagram color='white' size='20px' />
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className="tf2">
                            <h2 className="title">About</h2>
                            <ul>
                            <li>
          <a href="/aboutus" onClick={handleabout} className="footer-link">
          About us
          </a>
        </li>
        <li>
          <a href="/career" onClick={handlecarrier}className="footer-link">
          Career
          </a>
        </li>
        <li>
          <a href="/complaint" onClick={handlecarrier}className="footer-link">
          Complaint
          </a>
        </li>
        <li>
          <a href="/complaint" onClick={handlecarrier}className="footer-link">
          From CEO
          </a>
        </li>
        <li>
          <a href="/complaint" onClick={handlecarrier}className="footer-link">
          Contact
          </a>
        </li>

                            </ul>
                        </div>

                        <div className="tf2">
                            <h2 className="title">Service</h2>
                            <ul>
                                <li>Investment Analaysis</li>
                                <li>Live Notifications</li>
                                <li>Portfolio Comparison</li>
                                <li>Asset Watchlist</li>
                                <li>Wide Assets</li>

                            </ul>
                        </div>

                        <div className="tf2">
                            <h2 className="title">Terms</h2>
                            <ul>

                                <li>
          <a href="/disclaimer" className="footer-link" onClick={handledisc}>
          Disclaimer
          </a>
        </li>

                                <li>
          <a href="/termsandconditions" className="footer-link" onClick={handleterms}>
          Terms & Conditions
          </a>
        </li>
                                <li>
          <a href="/privacypolicy" className="footer-link" onClick={handleprivacy}>
          Privacy Policy
          </a>
        </li>
                                <li>
          <a href="/disclosure" className="footer-link" onClick={handledisclosure}>
          Disclosure
          </a>
        </li>

                                <li>
          <a href="/faq" className="footer-link" onClick={handleNavigation}>
            FAQ
          </a>
        </li>
                            </ul>
                        </div>
                    </div>

                    <div className="footerBorder"></div>

                                      {/* Google Map Embed */}
                                      <div className="google-map">
              </div>
              <div className="middleFooter" style={{ display: 'flex', justifyContent: 'space-around' }}>
            <div className="google-map">
              <iframe
                title="Google Map"
                width="450"
                height="300"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.7173622488464!2d85.32441701506173!3d27.717368382839795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19bb09ebc50b%3A0x98e49d824c13c675!2sSamakushi%20Road%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1648277850934!5m2!1sen!2snp"
              ></iframe>
            </div>

            <div style={{ width: '100px' }}></div>

            <div className="mfContainer">
              <span className="title">SEBON Registered Analyst Details: </span>
              <span className="desc">Registered Name: 10 Paisa pvt ltd</span>
              <span className="desc">Types of registration: Non-Individual</span>
              <span className="desc">Registration No.: 009786453589</span>
              <span className="desc">Validity: till 2026</span>
            </div>

            <div className="mfContainer">
              <span className="title">10Paisa Private Limited.</span>
              <span className="desc">Reg Address: Samakushi Road, Kathmandu</span>
              <span className="desc">Telephone: 01-5678912</span>
              <span className="desc">Principal Officer: Suraj Rimal</span>
              <span className="desc">Email: suraj@10Paisa.com</span>
              <span className="desc">Telephone: +977 9840220290</span>
            </div>
          </div>

                    <div className="footerBorder1"></div>

                    <div className="bottomFooter">
                        © 10Paisa 2023 All Rights Reserved
                    </div>

                </div>
            </div>
        </>


    )
}

export default Footer
