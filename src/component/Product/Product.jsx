import React from 'react'
import a12 from "../images/a12.png"
import a2 from "../images/a2.png"
import a3 from "../images/a3.png"
import a4 from "../images/a4.png"
import { Product1, Product2 } from "./data"
import { MdOutlineDoubleArrow } from "react-icons/md"
import "./product.css"

const Product = () => {
    return (
        <>
            <div className="product">
                <div className="productContainer">
                    <h1 className="title">
                        Fill in the gaps.  Gain a Holistic view of your portfolio with time tested Accuracy
                    </h1>
                    <div className="productMain">
                        <div className="mainCard">
                            <div className="cardLeft">
                                <img src={a12} alt="Product" />
                            </div>
                            <div className="cardRight">
                                <h3 className="titleCard">Why to choose us</h3>

                                <span className='subTitle'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, amet tempore, delectus suscipit quo, in odit totam unde culpa earum aliquid totam unde.</span>
                                {Product1.map((item) => (
                                    <div className="pointContainer" id={item.id}>
                                        <MdOutlineDoubleArrow color='green' /> <span className="point">
                                            {item.desc}
                                        </span>
                                    </div>
                                ))}


                            </div>
                        </div>
                        <div className="mainCard">
                            <div className="cardLeft">
                                <img src={a2} alt="Product" />
                            </div>
                            <div className="cardRight">
                                <h3 className="titleCard">Focus Areas</h3>

                                <span className='subTitle'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, amet tempore, delectus suscipit quo, in odit totam unde culpa earum aliquid.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde labore odio perspiciatis non aliquam sunt, praesentium voluptatibus porro id placeat assumenda minima.Lorem ipsum dolor.</span>


                            </div>
                        </div>
                        <div className="mainCard">
                            <div className="cardLeft">
                                <img src={a3} alt="Product" />
                            </div>
                            <div className="cardRight">
                                <h3 className="titleCard">Methodology</h3>

                                <span className='subTitle'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde labore odio perspiciatis non</span>
                                {Product2.map((item) => (
                                    <div className="pointContainer" id={item.id}>
                                        <MdOutlineDoubleArrow color='green' /> <span className="point">
                                            {item.desc}
                                        </span>
                                    </div>
                                ))}


                            </div>
                        </div>
                        <div className="mainCard">
                            <div className="cardLeft">
                                <img src={a4} alt="Product" />
                            </div>
                            <div className="cardRight">
                                <h3 className="titleCard">Core Values</h3>

                                <span className='subTitle'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, amet tempore, delectus suscipit quo, in odit totam unde culpa earum aliquid.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde labore odio perspiciatis non aliquam suny.</span>


                            </div>
                        </div>
                    </div>
                    <div className="productBtn">Learn More About Our Product</div>
                </div>
            </div>
        </>
    )
}

export default Product