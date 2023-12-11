import React from 'react'
import './Questions.css'
import { BsChevronDown } from 'react-icons/bs'
import { data } from './Data'

const Questions = () => {
    return (
        <>
            <div className="que">
                <div className="queContainer">
                    <h2 className="title">Have a Question ?</h2>
                    <ul className='mainQueContainer'>
                        {data.map((item) => (
                            <li id={item.id}>
                                <label htmlFor={item.for}>{item.question} <span><BsChevronDown /> </span> </label>
                                <input type="radio" name='question' id={item.for} checked />
                                <div className="content">
                                    <span className="desc">{item.desc1}</span>
                                    <span className="desc">{item.desc2}</span>
                                    <span className="desc">{item.desc3}</span>
                                    <span className="desc">{item.desc4}</span>
                                </div>
                                <div className="queBorder"></div>
                            </li>

                        ))}

                    </ul>
                </div>
            </div>
        </>
    )
}

export default Questions