import React, { useEffect, useState } from 'react';
import {getUserProfile, SERVER_BASE_URL} from '../services/api';

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        setUser(response);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {user && (
        <div>
          {user.profile_pic ? (
            <img
              src={SERVER_BASE_URL + '/' + user.profile_pic}
              alt="Profile Picture"
              style={{ width: '200px', height: '200px', borderRadius: '50%' }}
            />
          ) : (
            <img
              src={SERVER_BASE_URL + "/default_avatar.jpg"}
              alt="Default Avatar"
              style={{ width: '200px', height: '200px', borderRadius: '50%' }}
            />
          )}
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Gender: {user.gender}</p>
          <p>Phone: {user.phone}</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
