import React from 'react'
import { IoIosArrowDroprightCircle } from "react-icons/io"
import { Paisaartha1, Paisaartha2 } from '../Unique/data'
import e1 from "../images/e1.png"
import e2 from "../images/e2.png"
import "./Paisa.css"

const paisaartha = () => {
    return (
        <>
            <div className="paisaartha">
                <div className="paisaContainer">
                    <div className="paisaCard">
                        <div className="paisaLeft">
                            <h2 className="title">What should you expect from 10Paisa</h2>
                            {Paisaartha1.map((item) => (
                                <div className="pointContainer" id={item.id}>
                                    <span className="point">
                                        {item.desc}
                                    </span>
                                </div>
                            ))}

                        </div>
                        <div className="paisaRight">
                            <div className="ightImage">
                                <img src={e1} alt="paisa" />
                            </div>
                        </div>

                    </div>
                    <div className="paisaCard">
                        <div className="paisaLeft1">
                            <img src={e2} alt="paisa" />
                        </div>
                        <div className="paisaRight1">
                            <h2 className="title">What should you expect from paisaartha</h2>
                            {Paisaartha2.map((item) => (
                                <div className="pointContainer" id={item.id}>
                                    <IoIosArrowDroprightCircle color='green' /> <span className="point">
                                        {item.desc}
                                    </span>
                                </div>
                            ))}
                            <div className="paisaBtn">Get Started</div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default paisaartha