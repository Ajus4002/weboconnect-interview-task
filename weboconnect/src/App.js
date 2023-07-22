import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Register from './components/Register';
import Login from './components/Login';
import UserProfile from './components/UserProfile';
import UpdateProfile from './components/UpdateProfile';
import ChangePassword from './components/ChangePassword';
import DeleteAccount from './components/DeleteAccount';
import UploadProfilePic from './components/UploadProfilePic';
import { getToken, isAuthenticated, removeToken } from "./services/auth";
import {openUserList, setAuthToken} from "./services/api";
import AuthGuard from "./components/AuthGuard";

function App() {
  const isAuthenticatedUser = isAuthenticated();

  if (isAuthenticatedUser) {
    setAuthToken(getToken())
  }

  const handleLogout = () => {
    removeToken();
    window.location.reload();
  };

  const handleUserListClick = (event) => {
    event.preventDefault();
    openUserList();
  };

  return (
    <div>
      <Router>
        {isAuthenticatedUser ? (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/update-profile" className="nav-link">
                    Update Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/change-password" className="nav-link">
                    Change Password
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/delete-account" className="nav-link">
                    Delete Account
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/upload-profile-pic" className="nav-link">
                    Upload Profile Picture
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" onClick={handleUserListClick} to="/">
                    User List
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-link nav-link">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        ) : (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        )}

        <div className="container mt-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<AuthGuard element={UserProfile} />} />
            <Route path="/profile" element={<AuthGuard element={UserProfile} />} />
            <Route path="/update-profile" element={<AuthGuard element={UpdateProfile} />} />
            <Route path="/change-password" element={<AuthGuard element={ChangePassword} />} />
            <Route path="/delete-account" element={<AuthGuard element={DeleteAccount} />} />
            <Route path="/upload-profile-pic" element={<AuthGuard element={UploadProfilePic} />} />
            <Route path="*" element={<div>404 - Not Found</div>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
