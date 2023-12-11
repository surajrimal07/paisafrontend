import React from 'react'
import './Investment.css'
import { data } from './data'
import { TiArrowSortedUp } from 'react-icons/ti'

const Investment = () => {
    return (
        <>
            <div className="invest" id='invest'>
                <div className="investContainer">
                    <h2 className="title">The right investments are the ones that work</h2>
                    <h3 className="subTitle">Our Past Hero's</h3>
                    <div className="boxContainer">
                        {data.map((item) => (
                            <div className="investBox" id={item.id} >
                                <div className="iBoxImg">
                                    <img src={item.img} alt="img" />
                                </div>
                                <div className="investBorder"></div>

                                <div className="iBoxContent">
                                    <div className="price">
                                        <span className="priceTitle">Reco.Price</span>
                                        <h4 className="amount">Rs.{item.amount} </h4>
                                        <span className="date">{item.date} </span>
                                    </div>
                                    <div className="gain">
                                        <span className="gainTitle">Gain</span>
                                        <div className="percentage">
                                            <TiArrowSortedUp size='26px' />
                                            <h3 className="percent">%{item.percentage} </h3>
                                        </div>
                                        <span className="month">{item.month} Month</span>

                                    </div>
                                </div>
                            </div>
                        ))}



                    </div>

                    <div className="iBtn">Download Reports</div>

                </div>
            </div>
        </>
    )
}

export default Investment