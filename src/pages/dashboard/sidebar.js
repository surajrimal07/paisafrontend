// Sidebar.js
import React from 'react';
import './sidebar.css';

const Sidebar = () => {
  const toggleSideBar = () => {
    const sidebar = document.getElementById("sidebar");
    const header = document.getElementById("header");
    sidebar.classList.toggle("open");
    header.classList.toggle("open");
  };

  return (
    <>
      <header id="header">
        <i onClick={toggleSideBar} className="material-symbols-outlined">
          menu
        </i>
        <h4>Studio</h4>
      </header>
      <nav id="sidebar" className="sidebar">
        <div className="profile">
          <img src="profile.jpeg" alt="Profile" />
          <div className="info">
            <h4>Web Path</h4>
            <h5>Webdeveloper</h5>
          </div>
        </div>
        <ul className="link">
          <li>
            <a href="#">
              <i className="material-symbols-outlined">dashboard</i>
              <p>Dashboard</p>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="material-symbols-outlined">video_library</i>
              <p>Content</p>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="material-symbols-outlined">insert_chart</i>
              <p>Analytics</p>
            </a>
          </li>

        <li>
          <a href="#">
            <i class="material-symbols-outlined">comment</i>
            <p>Comments</p>
          </a>
        </li>

        <li>
          <a href="#">
            <i class="material-symbols-outlined">subtitles</i>
            <p>Subtitles</p>
          </a>
        </li>

        <li>
          <a href="#">
            <i class="material-symbols-outlined">copyright</i>
            <p>Copyright</p>
          </a>
        </li>

        <li>
          <a href="#">
            <i class="material-symbols-outlined">attach_money</i>
            <p>Earn</p>
          </a>
        </li>

        <li>
          <a href="#">
            <i class="material-symbols-outlined">settings</i>
            <p>Settings</p>
          </a>
        </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
