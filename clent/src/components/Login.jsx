import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    contactemail: '',
    password: '',
  });

  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend for login
      const response = await axios.post('http://localhost:5000/login', formData);
      const { token } = response.data;

      // Store the token in localStorage or your preferred state management
      // For simplicity, storing in localStorage in this example
      localStorage.setItem('token', token);

      console.log('Login successful!');
      
      // Redirect to the dashboard or any other route after successful login
      navigate('/orgs/Dashboard');
    } catch (error) {
      console.error('Login failed:', error.message);
      setFormError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div>
      <div>
        <h1>DevOnDeck</h1>
        <h5>Dev registration</h5>
        <h5>Org registration</h5>
      </div>
      <h2>Welcome Back </h2>
      <h4>Let's find you some condidates!</h4>

      <form onSubmit={handleSubmit}>
        <label>
          Contact Email:
          <input type="text" name="contactemail" value={formData.contactemail} onChange={handleChange} />
        </label>

        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>

        {formError && <p style={{ color: 'red' }}>{formError}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
