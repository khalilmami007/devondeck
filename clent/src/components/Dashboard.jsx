import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    // Fetch positions from the server when the component mounts
    const fetchPositions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/positions');
        setPositions(response.data);
      } catch (error) {
        console.error('Failed to fetch positions:', error.message);
      }
    };

    fetchPositions();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleLogout = () => {
    // Perform logout actions (clear token, etc.) on the client side

    // Redirect to the login page
    navigate('/orgs/login');
  };

  const handleListNewPosition = () => {
    navigate('/orgs/jobs/new');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleListNewPosition}>List a new position</button>

      <h2>Positions:</h2>
      <ul>
        {positions.map((position) => (
          <li key={position._id}>{position.Name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
