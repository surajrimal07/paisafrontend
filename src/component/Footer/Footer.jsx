import React from 'react'
import { BiTimeFive } from 'react-icons/bi'
import { BsTwitter, BsYoutube } from 'react-icons/bs'
import { CgMail } from 'react-icons/cg'
import { FaFacebookF, FaPhoneAlt } from 'react-icons/fa'
import { GrInstagram } from 'react-icons/gr'
import { RiWhatsappLine } from 'react-icons/ri'
import logo from '../images/logo.png'
import './Footer.css'

const Footer = () => {
    return (
        <>
            <div className="footer" id="footer">
                <div className="footerContainer">

                    <div className="logo">
                        <div className="logoImg">
                            <img src={logo} alt="logo" />
                        </div>
                        <h2 className="logoName">10<span className="logoNameColor">PA</span>ISA</h2>
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
                                    <span className="fCon">++9779840220290</span>
                                </div>
                                <div className="fContact">
                                    <CgMail color='black' size='20px' />
                                    <span className="fCon">Davidparkedme@gmail.com</span>
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
                            <h2 className="title">10 Paisa</h2>
                            <ul>
                                <li>About us</li>
                                <li>Career</li>
                                <li>Complaint</li>
                                <li>From CEO</li>
                                <li>Contact</li>
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
                                <li>Disclaimer</li>
                                <li>Terms & Conditions</li>
                                <li>Privacy Policy</li>
                                <li>Disclosure</li>
                                <li>FAQ</li>
                            </ul>
                        </div>

                        {/* <div className="tf2">
                            <h2 className="title">More</h2>
                            <ul>
                                <li>Disclaimer</li>
                                <li>Terms & Conditions</li>
                                <li>Privacy Policy</li>
                                <li>Disclosure</li>
                                <li>FAQ</li>
                                <li>Refund Policy</li>
                            </ul>
                        </div> */}

                    </div>

                    <div className="footerBorder"></div>

                    <div className="middleFooter">
                        <div className="mfContainer">
                            <span className="desc">SEBON Registered Analyst Details: </span>
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
