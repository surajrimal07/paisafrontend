import React from 'react'
import h1image from "../images/h1image.png"
import "./header.css"

const Header = () => {
    return (
        <>
            <div className="header">
                <div className="headerContainer">
                    <div className="headerLeft">

                        <h2 className='hlTop'>We're made of innovative ideas & strategies to design portfolio</h2>

                        <span className='hlCenter'>We run simple rule keeping your money in mind to pick the strongest & let them go when the loose their strength</span>
                    </div>
                    <div className="headerRight">
                        <div className="headerImage">
                        <img src={h1image} alt="Investment" style={{ width: '70%', height: 'auto' }} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

 export default Header

// import { useLottie } from 'lottie-react';
// import React from 'react';
// import groovyWalkAnimation from '../../animation/others/others (1).json'; // Replace with the correct path

// const Header = () => {
//   const options = {
//     animationData: groovyWalkAnimation,
//     loop: true,
//     preserveAspectRatio: 'xMidYMid meet',
//   };

//   const { View } = useLottie(options);

//   return (
//     <div className="header">
//       <div className="headerContainer">
//         <div className="headerLeft">
//           <h2 className='hlTop'>We're made of innovative ideas & strategies to design portfolio</h2>
//           <span className='hlCenter'>We run simple rule keeping your money in mind to pick the strongest & let them go when they lose their strength</span>
//         </div>
//         <div className="headerRight">
//           <div className="headerImage" style={{ width: '150px', height: '150px' }}>
//             {View}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;


// import Lottie from "lottie-react";
// import React from 'react';
// import animationData from '../../animation/others/others (1).json';

// const Header = () => {
//   const options  = {
//     animationData: animationData,
//     loop: true
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row">
//         <div className="col-md-6">
//           <h2 className="fw-bold">We're made of innovative ideas & strategies to design portfolio</h2>
//           <p className="lead">We run simple rule keeping your money in mind to pick the strongest & let them go when they lose their strength</p>
//         </div>
//         <div className="col-md-6 d-flex justify-content-end align-items-end">
//           <Lottie options={options } height={200} width={200} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;


// import { useLottie } from 'lottie-react';
// import React from 'react';
// import groovyWalkAnimation from '../../animation/others/others (1).json';

// const Header = () => {
//   const options = {
//     animationData: groovyWalkAnimation,
//     loop: true,
//   };

//   const { View } = useLottie(options);

//   return (
//     <div className="header">
//       <div className="headerContainer">
//         <div className="headerLeft">
//           <h2 className='hlTop'>We're made of innovative ideas & strategies to design portfolio</h2>
//           <span className='hlCenter'>We run a simple rule keeping your money in mind to pick the strongest & let them go when they lose their strength</span>
//         </div>
//         <div className="headerRight">
//           <div className="headerImage">
//             <div className="position-absolute top-0 end-0" style={{ width: '200px', height: '200px' }}>
//               {View}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;