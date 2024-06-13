// import { useEffect, useState } from "react";

// export const Checkuser = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const sessionCookie = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("tenpaisa.session"));

//     console.log("sessionCookie", sessionCookie);

//     if (sessionCookie) {
//       const sessionData = sessionCookie.split("=")[1];
//       const parsedSessionData = JSON.parse(sessionData);

//       if (parsedSessionData && parsedSessionData.userEmail) {
//         setIsLoggedIn(true);
//       }
//     }
//   }, []);

//   return isLoggedIn;
// };

// export default Checkuser;
