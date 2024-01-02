import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ScrollToTop from "react-scroll-to-top";
import './App.css';

import Footer from './component/Footer/Footer';
import Header from './component/Header/Header';
import Navbar from './component/Navbar/Navbar';
import Product from './component/Product/Product';
import Review from './component/Review/Review';
import Unique from './component/Unique/Unique';
import Register from './pages/Register';
//import Signup from './pages/signup/newregister';

import AboutUsPage from './component/about/about';
import Feathures from './component/feathures/feathures';
import Dashboard from './pages/admin/dashboard';
import MyProfilePage from './pages/dashboard/userdashboard';
import Login from './pages/login/Login';
import { AdminRoutes } from './protected/AdminRoutes';
import { UserRoutes } from './protected/UserRoutes';


const Homepage = () => {

  return (
    <div>
      <Header />
      <Product />
      <Unique />
      <Review />
      <Footer />
      <ScrollToTop smooth />
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>


          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/feathures" element={<Feathures />} />
          <Route path="/myprofile" element={<MyProfilePage />} />

          <Route element = {<UserRoutes/>}>
            <Route path ='/profile' element={<h1> Profile </h1>} />
            </Route>

          <Route element = {<AdminRoutes/>} >
            <Route path ='/admin/dashboard' element={<Dashboard/>} />
            </Route>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
