import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ScrollToTop from "react-scroll-to-top";
import './App.css';

import Footer from './component/Footer/Footer';
import Header from './component/Header/Header';
import Navbar from './component/Navbar/Navbar';
import Review from './component/Review/Review';
import Unique from './component/Unique/Unique';
import NewsDisplay from './component/news/news';
import Register from './pages/Register';
import Stock from './pages/stockdashboard/stock';
//import Signup from './pages/signup/newregister';

import AboutUsPage from './component/about/about';
import Feathures from './component/feathures/feathures';
import Dashboard from './pages/admin/dashboard';
import MyProfilePage from './pages/dashboard/userdashboard';
//import Login from './pages/login/Login';
import Login from './pages/login/login3';

import { AdminRoutes } from './protected/AdminRoutes';
import { UserRoutes } from './protected/UserRoutes';

//homepage small pages
import Career from './component/carrier/carrier';
import Complaint from './component/complain/complain';
import Disclaimer from './component/disclamer/disclaimer';
import Disclosure from './component/disclosure/disclosure';
import FAQ from './component/faq/faq';
import PrivacyPolicy from './component/privacy/privacy';
import TermsAndConditions from './component/terms/terms';


const Homepage = () => {

  return (
    <div>
      <Header />
      <Unique />
      <Review />
      <ScrollToTop smooth />
    </div>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="mt-5">
        <Routes>

          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/feathures" element={<Feathures />} />
          <Route path="/myprofile" element={<MyProfilePage />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/news" element={<NewsDisplay />} />
          <Route path="/disclosure" element={<Disclosure />} />
          <Route path="/stocks" element={<Stock />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/termsandconditions" element={<TermsAndConditions />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/career" element={<Career />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route element = {<UserRoutes/>}>
            <Route path ='/profile' element={<h1> Profile </h1>} />

            </Route>
          <Route element = {<AdminRoutes/>} >
            <Route path ='/admin/dashboard' element={<Dashboard/>} />
            </Route>

        </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
