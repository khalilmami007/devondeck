import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Newposition = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
    Skills: [],
  });

  const [formErrors, setFormErrors] = useState({
    Name: '',
    Description: '',
    Skills: '',
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === 'Skills') {
      const updatedSkills = checked
        ? [...formData.Skills, value]
        : formData.Skills.filter((skill) => skill !== value);

      setFormData({ ...formData, [name]: updatedSkills });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate the form before submitting
      const validationErrors = validateForm(formData);
      if (Object.values(validationErrors).some((error) => error !== '')) {
        setFormErrors(validationErrors);
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>ADD A POSITION</h2>
        <label>
          Name:
          <input type="text" name="Name" value={formData.Name} onChange={handleChange} />
          <p style={{ color: 'red' }}>{formErrors.Name}</p>
        </label>
        <label>
          Description:
          <input type="text" name="Description" value={formData.Description} onChange={handleChange} />
          <p style={{ color: 'red' }}>{formErrors.Description}</p>
        </label>
        <label>
          Skills:
          {['Skill1', 'Skill2', 'Skill3', 'Skill4', 'Skill5', 'Skill6', 'Skill7'].map((skill) => (
            <label key={skill}>
              <input
                type="checkbox"
                name="Skills"
                value={skill}
                checked={formData.Skills.includes(skill)}
                onChange={handleChange}
              />
              {skill}
            </label>
          ))}
          <p style={{ color: 'red' }}>{formErrors.Skills}</p>
        </label>

        <button type="submit">Add Position</button>
      </form>
    </div>
  );
};

export default Newposition;
