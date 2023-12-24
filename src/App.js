import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Featured from './component/Featured/Featured';
import Footer from './component/Footer/Footer';
import Header from './component/Header/Header';
import Navbar from './component/Navbar/Navbar';
import Product from './component/Product/Product';
import Questions from './component/Questions/Questions';
import Review from './component/Review/Review';
import Unique from './component/Unique/Unique';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/admin/dashboard';
import { AdminRoutes } from './protected/AdminRoutes';
import { UserRoutes } from './protected/UserRoutes';





const Homepage = () => {

  return (
    <div>
      <Header />
      <Featured />
      <Product />
      <Unique />
      <Review />
      <Questions />
      <Footer />
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
