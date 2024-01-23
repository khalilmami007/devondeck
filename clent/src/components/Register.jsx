import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    orgname: '',
    firstname: '',
    lastname: '',
    contactemail: '',
    orgadress: '',
    orgcity: '',
    orgstate: '',
    password: '',
    confirmPassword: '',
  });

  const [formErrors, setFormErrors] = useState({
    orgname: '',
    firstname: '',
    lastname: '',
    contactemail: '',
    orgadress: '',
    orgcity: '',
    orgstate: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: '' });
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

      // Make a POST request to your backend for registration
      await axios.post('http://localhost:5000/register', formData);
      console.log('Registration successful!');
      
      // Redirect to /orgs/login after successful registration
      navigate('/orgs/Login');
    } catch (error) {
      console.error('Registration failed:', error.message);
    }
  };

  const validateForm = (data) => {
    const errors = {};

    // Example validation logic (you might need to adjust this based on your requirements)
    if (!data.orgname) errors.orgname = 'Organization Name is required';
    if (!data.firstname) errors.firstname = 'First Name is required';
    if (!data.lastname) errors.lastname = 'Last Name is required';
    if (!data.contactemail) errors.contactemail = 'Contact Email is required';
    if (!data.orgadress) errors.orgadress = 'Organization Address is required';
    if (!data.orgcity) errors.orgcity = 'Organization City is required';
    if (!data.orgstate) errors.orgstate = 'Organization State is required';
    if (!data.password) errors.password = 'Password is required';
    if (data.password.length < 8) errors.password = 'Password must be 8 characters or longer';
    if (data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords do not match';

    return errors;
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register as an Organization</h2>

      <label>
        Organization Name:
        <input type="text" name="orgname" value={formData.orgname} onChange={handleChange} />
        <p style={{ color: 'red' }}>{formErrors.orgname}</p>
      </label>

      <label>
        First Name:
        <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
        <p style={{ color: 'red' }}>{formErrors.firstname}</p>
      </label>

      <label>
        Last Name:
        <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
        <p style={{ color: 'red' }}>{formErrors.lastname}</p>
      </label>

      <label>
        Contact Email:
        <input type="text" name="contactemail" value={formData.contactemail} onChange={handleChange} />
        <p style={{ color: 'red' }}>{formErrors.contactemail}</p>
      </label>

      <label>
        Organization Address:
        <input type="text" name="orgadress" value={formData.orgadress} onChange={handleChange} />
        <p style={{ color: 'red' }}>{formErrors.orgadress}</p>
      </label>

      <label>
        Organization City:
        <input type="text" name="orgcity" value={formData.orgcity} onChange={handleChange} />
        <p style={{ color: 'red' }}>{formErrors.orgcity}</p>
      </label>

      <label>
        Organization State:
        <input type="text" name="orgstate" value={formData.orgstate} onChange={handleChange} />
        <p style={{ color: 'red' }}>{formErrors.orgstate}</p>
      </label>

      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
        <p style={{ color: 'red' }}>{formErrors.password}</p>
      </label>

      <label>
        Confirm Password:
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
        <p style={{ color: 'red' }}>{formErrors.confirmPassword}</p>
      </label>

      <button type="submit">Register</button>
      <p>Need to sign up as a developer??</p>
    </form>
  );
};

export default RegistrationForm;
