import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../styles/sidebar.css'
import Logoicon from '../../assets/images/logo.png'

const Sidebar = ({isSidebarVisible}) => {
  const [activeTab, setActiveTab] = useState('');
console.log('sidebarfun',isSidebarVisible)
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <aside className={`sidebar bg-white ${isSidebarVisible ? '' : 'isActive'}`} style={{minHeight: '100vh' }}>
      <div className="sidebar-header mb-3 px-3 pt-1">
        <Link to="/dashboard" className="sidebar-logo d-block pb-1">
          <img src={Logoicon} alt="Dashboard Logo" className="img-fluid" style={{ width: '90px',height:'55px' }} />
        </Link>
      </div>
      <ul className="list-unstyled p-3 ">
        <li className="dropdown">
          <Link
            to="#stories"
            data-bs-toggle="collapse"
            className={`d-flex align-items-center text-dark side-links ${activeTab === 'stories' ? 'bg-primary text-white' : ''}`}
            onClick={() => handleTabClick('stories')}
            style={{ textDecoration: 'none' }}
          >
            <Icon icon="ri:table-line" className="me-2" />
            <span>Stories</span>
          </Link>
          <ul id="stories" className={`collapse list-unstyled ${isSidebarVisible ? "ms-4" : ''}`}>
            <li>
              <Link
                to="/add-story"
                className={`d-flex align-items-center text-dark side-links ${activeTab === 'add-story' ? 'bg-primary text-white' : ''}`}
                onClick={() => handleTabClick('add-story')}
                style={{ textDecoration: 'none' }}
              >
                <Icon icon="ri:picture-in-picture-exit-fill" className="me-2" /> {isSidebarVisible ? "Add Stories" : ''}
              </Link>
            </li>
            <li>
              <Link
                to="/edit-story"
                className={`d-flex align-items-center text-dark side-links ${activeTab === 'edit-story' ? 'bg-primary text-white' : ''}`}
                onClick={() => handleTabClick('edit-story')}
                style={{ textDecoration: 'none' }}
              >
                <Icon icon="ri:edit-box-line" className="me-2" />{isSidebarVisible ? " Edit Stories" : ""}
              </Link>
            </li>
            <li>
              <Link
                to="/published"
                className={`d-flex align-items-center text-dark side-links ${activeTab === 'published' ? 'bg-primary text-white' : ''}`}
                onClick={() => handleTabClick('published')}
                style={{ textDecoration: 'none' }}
              >
                <Icon icon="ri:book-marked-fill" className="me-2" /> {isSidebarVisible ? "Published Stories" : ""}
              </Link>
            </li>
            <li>
              <Link
                to="/unpublished"
                className={`d-flex align-items-center text-dark side-links ${activeTab === 'unpublished' ? 'bg-primary text-white' : ''}`}
                onClick={() => handleTabClick('unpublished')}
                style={{ textDecoration: 'none' }}
              >
                <Icon icon="ri:book-marked-line" className="me-2" />{isSidebarVisible ? "Unpublished Stories" : ""}
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link
            to="/categories"
            className={`d-flex align-items-center text-dark side-links ${activeTab === 'categories' ? 'bg-primary text-white' : ''}`}
            onClick={() => handleTabClick('categories')}
            style={{ textDecoration: 'none', marginTop: '10px' }}
          >
            <Icon icon="ri:book-3-line" className="me-2" />
            <span>Categories</span>
          </Link>
        </li>
        <li>
          <Link
            to="/add-category"
            className={`d-flex align-items-center text-dark side-links ${activeTab === 'add-category' ? 'bg-primary text-white' : ''}`}
            onClick={() => handleTabClick('add-category')}
            style={{ textDecoration: 'none', marginTop: '10px' }}
          >
            <Icon icon="ri:file-add-line" className="me-2" />
            <span>Add Category</span>
          </Link>
        </li>
        <li>
          <Link
            to="/reports"
            className={`d-flex align-items-center text-dark side-links ${activeTab === 'reports' ? 'bg-primary text-white' : ''}`}
            onClick={() => handleTabClick('reports')}
            style={{ textDecoration: 'none', marginTop: '10px' }}
          >
            <Icon icon="ri:file-list-3-line" className="me-2" />
            <span>Reports</span>
          </Link>
        </li>
        <li className="sidebar-menu-group-title mt-4 fw-bold text-uppercase text-secondary">Users</li>
        <li>
          <Link
            to="/saved"
            className={`d-flex align-items-center text-dark side-links ${activeTab === 'saved' ? 'bg-primary text-white' : ''}`}
            onClick={() => handleTabClick('saved')}
            style={{ textDecoration: 'none', marginTop: '10px' }}
          >
            <Icon icon="ri:price-tag-2-line" className="me-2" />
            <span>Saved</span>
          </Link>
        </li>
        <li>
          <Link
            to="/shared"
            className={`d-flex align-items-center text-dark side-links ${activeTab === 'shared' ? 'bg-primary text-white' : ''}`}
            onClick={() => handleTabClick('shared')}
            style={{ textDecoration: 'none', marginTop: '10px' }}
          >
            <Icon icon="ri:share-forward-line" className="me-2" />
            <span>Shared</span>
          </Link>
        </li>
        <li>
          <Link
            to="/views"
            className={`d-flex align-items-center text-dark side-links ${activeTab === 'views' ? 'bg-primary text-white' : ''}`}
            onClick={() => handleTabClick('views')}
            style={{ textDecoration: 'none', marginTop: '10px' }}
          >
            <Icon icon="ri:eye-line" className="me-2" />
            <span>Views</span>
          </Link>
        </li>
        <li>
          <Link
            to="/liked"
            className={`d-flex align-items-center text-dark side-links ${activeTab === 'liked' ? 'bg-primary text-white' : ''}`}
            onClick={() => handleTabClick('liked')}
            style={{ textDecoration: 'none', marginTop: '10px' }}
          >
            <Icon icon="ri:thumb-up-line" className="me-2" />
            <span>Liked</span>
          </Link>
        </li>
        <li className="sidebar-menu-group-title mt-4 fw-bold text-uppercase text-secondary">Admin</li>
        <li>
          <Link
            to="/settings"
            className={`d-flex align-items-center text-dark side-links ${activeTab === 'settings' ? 'bg-primary text-white' : ''}`}
            onClick={() => handleTabClick('settings')}
            style={{ textDecoration: 'none', marginTop: '10px' }}
          >
            <Icon icon="ri:settings-fill" className="me-2" />
            <span>Settings</span>
          </Link>
        </li>
        <li>
          <Link
            to="/logout"
            className={`d-flex align-items-center text-dark side-links ${activeTab === 'logout' ? 'bg-primary text-white' : ''}`}
            onClick={() => handleTabClick('logout')}
            style={{ textDecoration: 'none', marginTop: '10px' }}
          >
            <Icon icon="ri:logout-circle-line" className="me-2" />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
