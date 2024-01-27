import React from 'react'
import './Review.css'
import { CgChevronRightO, CgChevronLeftO } from 'react-icons/cg'
import { BsPersonCircle } from 'react-icons/bs'
import { data } from './Data'

const Review = () => {
    return (
        <>
            <div className="review">
                <div className="reviewContainer">
                    <h2 className="title">Don't take our word for it</h2>
                    <span className="subTitle">Our Client's word say everything</span>
                    <div className="reviewBoxContainer">
                        {data.map((item) => (
                            <div className="rCard" id={item.id} >
                                <span className="desc">{item.desc1}</span>
                                <span className="desc">{item.desc}</span>
                                <div className="client">

                                    <BsPersonCircle size='40px' color='rgb(87, 86, 86)' />
                                    <h4 className="clientName">{item.client}</h4>

                                </div>

                            </div>
                        ))}


                    </div>
                    <div className="more">
                        <CgChevronLeftO size='28px' cursor='pointer' />
                        <CgChevronRightO size='28px' cursor='pointer' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Review