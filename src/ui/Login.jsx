import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

const initialFormState = {
  email: '',
  password: '',
};

const initialErrorState = {};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialFormState;
    default:
      return state;
  }
};

const errorReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ERRORS':
      return action.errors;
    case 'CLEAR_ERROR':
      const updated = { ...state };
      delete updated[action.field];
      return updated;
    case 'RESET':
      return {};
    default:
      return state;
  }
};

function Login() {
  const navigate = useNavigate();
  const [formData, dispatchForm] = useReducer(formReducer, initialFormState);
  const [errors, dispatchErrors] = useReducer(errorReducer, initialErrorState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatchForm({ type: 'UPDATE_FIELD', field: name, value });

    if (errors[name]) {
      dispatchErrors({ type: 'CLEAR_ERROR', field: name });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    dispatchErrors({ type: 'SET_ERRORS', errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log('Login successful with:', formData);
    navigate('/home');
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Faculty Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`input-field ${errors.email ? 'input-error' : ''}`}
              placeholder="faculty@mitm.edu"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`input-field ${errors.password ? 'input-error' : ''}`}
              placeholder="Enter your password"
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <button type="submit" className="btn-primary">Login</button>

          <div className="signup-link">
            <span>New user? </span>
            <a href="/signup">Create an account</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;