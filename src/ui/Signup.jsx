import React, { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

// Initial form state
const initialFormState = {
  name: '',
  email: '',
  department: '',
  password: '',
  repeatPassword: '',
};

// Form reducer
function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialFormState;
    default:
      return state;
  }
}

// Error reducer
const initialErrorState = {};

function errorReducer(state, action) {
  switch (action.type) {
    case 'SET_ERRORS':
      return action.errors;
    case 'CLEAR_ERROR':
      const newState = { ...state };
      delete newState[action.field];
      return newState;
    case 'RESET':
      return {};
    default:
      return state;
  }
}

function Signup() {
  const [formData, dispatchForm] = useReducer(formReducer, initialFormState);
  const [errors, dispatchErrors] = useReducer(errorReducer, initialErrorState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatchForm({ type: 'UPDATE_FIELD', field: name, value });

    if (errors[name]) {
      dispatchErrors({ type: 'CLEAR_ERROR', field: name });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.department) newErrors.department = 'Department is required';

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.repeatPassword) {
      newErrors.repeatPassword = 'Passwords do not match';
    }

    dispatchErrors({ type: 'SET_ERRORS', errors: newErrors });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form data:', formData);

      // Reset and navigate to login
      dispatchForm({ type: 'RESET' });
      dispatchErrors({ type: 'RESET' });

      // Redirect to login
      navigate('/login');
    }
  };

  const handleCancel = () => {
    dispatchForm({ type: 'RESET' });
    dispatchErrors({ type: 'RESET' });
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Faculty Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block mb-1 font-medium">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Department *</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${errors.department ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select Department</option>
              <option value="CSE">Computer Science & Engineering</option>
              <option value="ECE">Electronics & Communication</option>
              <option value="ME">Mechanical Engineering</option>
              <option value="CE">Civil Engineering</option>
              <option value="EEE">Electrical & Electronics</option>
              <option value="ISE">Information Science & Engineering</option>
            </select>
            {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Password *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              className={`w-full border rounded px-3 py-2 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Repeat Password *</label>
            <input
              type="password"
              name="repeatPassword"
              value={formData.repeatPassword}
              onChange={handleChange}
              className={`w-full border rounded px-3 py-2 ${errors.repeatPassword ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.repeatPassword && <p className="text-red-500 text-sm">{errors.repeatPassword}</p>}
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create New User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;