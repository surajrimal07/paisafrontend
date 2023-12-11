import React from 'react'
import { data } from './data'
import "./featured.css"

const Featured = () => {
    return (
        <>
            <div className="featured">
                <div className="featuredContainer">
                    <h2 className="title">Featured On</h2>

                    <div className="featuredContainerImage">
                        {data.map((item) => (
                            <div className="imageContainer" id={item.id}>
                                <img src={item.image} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Featured