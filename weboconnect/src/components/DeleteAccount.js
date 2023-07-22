import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUserAccount } from '../services/api';

const DeleteAccount = () => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteUserAccount();
      navigate('/login');
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Delete Account</h2>
      <button onClick={handleDelete} className="btn btn-danger">Delete Account</button>
    </div>
  );
};

export default DeleteAccount;
