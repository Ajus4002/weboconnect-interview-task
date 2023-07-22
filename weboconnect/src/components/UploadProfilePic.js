import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadProfilePicture } from '../services/api';

const UploadProfilePic = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('profile_pic', file);

      await uploadProfilePicture(formData);
      navigate('/profile');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Upload Profile Picture</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Select a Profile Picture</label>
          <input
            type="file"
            className="form-control"
            name="profile_pic"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Upload Picture</button>
      </form>
    </div>
  );
};

export default UploadProfilePic;
