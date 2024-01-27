import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// Import images
import csharpImage from './icons/csharp.jpg';
import cssImage from './icons/css.png';
import goImage from './icons/go.jpg';
import htmlImage from './icons/html.jpg';
import javaImage from './icons/java.png';
import jsImage from './icons/js.png';
import pythImage from './icons/pyth.jpg';
import rubyImage from './icons/ruby.jpg';
import sqlImage from './icons/sql.png';
import swiftImage from './icons/swift.png';
import phpImage from './icons/php.png';
import cppImage from './icons/c++.png';

const Newposition = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    Skills: [],
  });

  const handleSkillClick = (skill) => {
    const updatedSkills = formData.Skills.includes(skill)
      ? formData.Skills.filter((selectedSkill) => selectedSkill !== skill)
      : [...formData.Skills, skill];

    setFormData({ ...formData, Skills: updatedSkills });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate the form before submitting
      const validationErrors = validateForm(formData);
      if (Object.values(validationErrors).some((error) => error !== '')) {
        console.log('Validation Errors:', validationErrors);
        return;
      }

      // Make a POST request to your backend for creating a new position
      await axios.post('http://localhost:5000/positions', formData);
      console.log('New position created successfully!');

      // Redirect to the dashboard or any other route after successful creation
      navigate('/orgs/Dashboard');
    } catch (error) {
      console.error('Failed to create position:', error.message);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.Name) errors.Name = 'Name is required';
    if (!data.Description) errors.Description = 'Description is required';
    if (!data.Skills || data.Skills.length === 0) errors.Skills = 'Please choose at least one skill';

    return errors;
  };

  const skillIcons = [
    { skill: 'csharp', icon: csharpImage },
    { skill: 'css', icon: cssImage },
    { skill: 'go', icon: goImage },
    { skill: 'html', icon: htmlImage },
    { skill: 'java', icon: javaImage },
    { skill: 'js', icon: jsImage },
    { skill: 'pyth', icon: pythImage },
    { skill: 'ruby', icon: rubyImage },
    { skill: 'sql', icon: sqlImage },
    { skill: 'swift', icon: swiftImage },
    { skill: 'php', icon: phpImage },
    { skill: 'cpp', icon: cppImage },
    // Add more skills as needed
  ];

  return (
    <div>
      <Card style={{ width: '900px', height: '600px' }} border='secondary'>
        <Container>
          <Row>
            <Col>
              <h2>Add a Position</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <label htmlFor="positionName">Position Name</label>
                <input
                  type="text"
                  id="positionName"
                  value={formData.Name}
                  onChange={(e) => setFormData({ ...formData, Name: e.target.value })}
                  style={{ width: '100%', marginBottom: '10px', padding: '5px' }}
                />
              </div>
              <div>
                <label htmlFor="positionDescription">Position Description</label>
                <textarea
                  id="positionDescription"
                  rows="3"
                  value={formData.Description}
                  onChange={(e) => setFormData({ ...formData, Description: e.target.value })}
                  style={{ width: '100%', marginBottom: '20px', padding: '5px' }}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div style={{ height: '350px', overflowY: 'auto', display: 'flex', flexWrap: 'wrap' }}>
                {skillIcons.map((item) => (
                  <div key={item.skill} style={{ margin: '5px' }}>
                    <img
                      src={item.icon}
                      id={item.skill}
                      alt={item.skill}
                      className={`iconStyle2 ${formData.Skills.includes(item.skill) ? 'selected' : ''}`}
                      onClick={() => handleSkillClick(item.skill)}
                      style={{ width: '50px', height: '50px' }}
                    />
                  </div>
                ))}
              </div>
            </Col>
            <Col>
              <div style={{ marginTop: '20px' }}>
                <h5 style={{ marginBottom: '10px' }}>Selected Skills</h5>
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {formData.Skills.map((selectedSkill) => (
                    <img
                      key={selectedSkill}
                      src={skillIcons.find((item) => item.skill === selectedSkill)?.icon}
                      alt={selectedSkill}
                      className="selectedIcon"
                      style={{ margin: '5px', width: '30px', height: '30px' }}
                    />
                  ))}
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <button onClick={handleSubmit} style={{ padding: '10px', background: 'blue', color: 'white', cursor: 'pointer' }}>
                Create Position
              </button>
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
  );
};

export default Newposition;
