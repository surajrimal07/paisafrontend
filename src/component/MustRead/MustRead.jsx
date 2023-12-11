import React from 'react'
import './MustRead.css'
import { data } from './Data'
import { CgChevronRightO, CgChevronLeftO } from 'react-icons/cg'

const MustRead = () => {
    return (
        <>
            <div className="mr">
                <div className="mrContainer">
                    <div className="mrMainTitle">
                        <h2 className="title">Must Read</h2>
                        <span className="desc">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis, ab?</span>
                    </div>
                    <div className="boxContainer">
                        {data.map((item) => (
                            <div className="box" id={item.id} >
                                <div className="boxImg">
                                    <img src={item.img} alt="img" />
                                </div>
                                <div className="content">
                                    <div className="content1">
                                        <span className="marketing">{item.market}</span>
                                        <div className="date">
                                            <span className="month">{item.date}</span>
                                            <span className="year">{item.year}</span>
                                        </div>
                                    </div>
                                    <div className="content2">
                                        <h4 className="title">{item.title}</h4>
                                        <span className="desc">{item.desc}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="more">
                        <CgChevronLeftO size='28px' cursor='pointer' /> <span>More</span> <CgChevronRightO size='28px' cursor='pointer' />
                    </div>


                </div>

            </div>
        </>
    )
}

export default MustRead
