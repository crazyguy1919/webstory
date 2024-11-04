import React, { useState } from "react";
import "../styles/header.css";
import { Icon } from "@iconify/react";
import User from "../../assets/images/user.png";
import { Link } from 'react-router-dom';


const Header = ({ isSidebarVisible, setIsSidebarVisible }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
    console.log('hello')
    // setIsSidebarVisible(!isSidebarVisible);
    console.log('hellllllllllo',isSidebarVisible)
  };


  const toggleTheme = () => {
    setIsLightTheme(prevState => !prevState);
  };
  return (
    <div className="header-section">
      <div className="d-flex align-items-center justify-content-between">
        <div className="col-auto">
          <div className="d-flex flex-wrap align-items-center gap-4">
            <button
              type="button"
              className="sidebar-toggle"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? (
                <Icon
                  icon="iconoir:arrow-right"
                  className="icon text-2xl active"
                />
              ) : (
                <Icon
                  icon="heroicons:bars-3-solid"
                  className="icon text-2xl non-active"
                />
              )}
            </button>
          
            <form className="navbar-search">
              <input type="text" name="search" placeholder="Search" />
              <Icon icon="ion:search-outline" className="icon" />
            </form>
          </div>
        </div>
        <div className="col-auto">
          <div className="d-flex flex-wrap align-items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              data-theme-toggle=""
              className="brithness-icon"
              aria-label="light"
            >
               {isLightTheme ? (
        <Icon fontSize={24} icon="proicons:brightness" /> // Light theme icon
      ) : (
        <Icon icon="ic:outline-brightness-2" className="dark-icon"/> // Dark theme icon
      )}
            </button>
            <div className="dropdown">
              <button
                className="user-button"
                type="button"
                data-bs-toggle="dropdown"
              >
                <img src={User} alt="User" className="" />
              </button>
              <div className="dropdown-menu to-top dropdown-menu-sm">
                <div className="py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                  <div>
                    <h6 className="text-lg text-primary-light fw-semibold mb-2">
                      Admin Panel
                    </h6>
                  </div>
                  <button type="button" className="hover-text-danger">
                    <Icon icon="radix-icons:cross-1" className="icon text-xl" />
                  </button>
                </div>
                <ul className="to-top-list">
                  <li>
                    <a
                      className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-primary d-flex align-items-center gap-3"
                      href="profile.php"
                    >
                      <Icon
                        icon="icon-park-outline:setting-two"
                        className="icon text-xl"
                      />{" "}
                      Settings
                    </a>
                  </li>
                  <li>
                  <Link
  className="dropdown-item text-black px-0 py-8 hover-bg-transparent hover-text-danger d-flex align-items-center gap-3"
  to="/login"
>
  <Icon icon="lucide:power" className="icon text-xl" /> Log Out
</Link>
                  </li>
                </ul>
              </div>
            </div>
            {/* Profile dropdown end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
