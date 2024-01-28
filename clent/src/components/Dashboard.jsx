import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);
  const [developers, setDevelopers] = useState([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/positions');
        setPositions(response.data);
      } catch (error) {
        console.error('Failed to fetch positions:', error.message);
      }
    };

    const fetchAllDevelopersWithSkills = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/devs');
        setDevelopers(response.data);
      } catch (error) {
        console.error('Failed to fetch developers with skills:', error.message);
      }
    };

    fetchPositions();
    fetchAllDevelopersWithSkills();
  }, []);

  const handleLogout = () => {
    navigate('/orgs/login');
  };

  const handleListNewPosition = () => {
    navigate('/orgs/jobs/new');
  };

  const handlePositionClick = (position) => {
    navigate(`/orgs/jobs/${position._id}`, { state: { positionName: position.Name } });
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div>
          <button className="btn btn-primary" onClick={handleListNewPosition}>
            List a new position
          </button>
        </div>
      </div>

      <h2 className="mt-3">Positions:</h2>
      <ul className="list-group">
        {positions.map((position) => (
          <li key={position._id} className="list-group-item">
            <span className="text-primary" onClick={() => handlePositionClick(position)}>
              {position.Name}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-3">
        <h2>All Developers with Skills:</h2>
        <ul>
          {developers.map((developer) => (
            <li key={developer._id}>
              <p>Name: {developer.firstName} {developer.lastName}</p>
              <p>Bio: {developer.bio}</p>
              <p>Languages: {developer.languages}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
