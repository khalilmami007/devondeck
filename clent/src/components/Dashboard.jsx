import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout actions (clear token, etc.) on the client side

    // Redirect to the login page
    navigate('/orgs/login');

    
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
