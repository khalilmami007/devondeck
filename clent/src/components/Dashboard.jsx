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

  const handlePositionClick = (position) => {
    // Navigate to the dynamic route with position details as route state
    navigate(`/orgs/jobs/${position._id}`, { state: { positionName: position.Name } });
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
      <button className="btn btn-primary ml-2" onClick={handleListNewPosition}>
        List a new position
      </button>

      <h2 className="mt-3">Positions:</h2>
      <ul className="list-group">
        {positions.map((position) => (
          <li key={position._id} className="list-group-item">
            {/* Use onClick to handle position click */}
            <span className="text-primary" onClick={() => handlePositionClick(position)}>
              {position.Name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
