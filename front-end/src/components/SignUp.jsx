import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

export default class SignUp extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    errors: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  };

  validateForm = () => {
    const { email, password, confirmPassword } = this.state;
    const errors = {};

    // Email validation
    if (!email.includes('@')) {
      errors.email = 'Invalid email address';
    }

    // Password validation
    if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    // Confirm Password validation
    if (confirmPassword !== password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const errors = this.validateForm();
    if (Object.keys(errors).length === 0) {
      // Form submission logic goes here
      console.log('Form submitted!');
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { email, password, confirmPassword, errors } = this.state;

    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <form className="bg-white shadow-md rounded px-8 pt-6  pb-8 mb-4" onSubmit={this.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <FontAwesomeIcon icon={faEnvelope} className="text-gray-500" />
              </span>
              <input
                className={`appearance-none border rounded w-full py-2 pl-8 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.email && 'border-red-500'
                }`}
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={this.handleInputChange}
              />
              {errors.email && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500" />
                </span>
              )}
            </div>
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <FontAwesomeIcon icon={faLock} className="text-gray-500" />
              </span>
              <input
                className={`appearance-none border rounded w-full py-2 pl-8 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.password && 'border-red-500'
                }`}
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={this.handleInputChange}
              />
              {errors.password && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500" />
                </span>
              )}
            </div>
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <FontAwesomeIcon icon={faLock} className="text-gray-500" />
              </span>
              <input
                className={`appearance-none border rounded w-full py-2 pl-8 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.confirmPassword && 'border-red-500'
                }`}
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={this.handleInputChange}
              />
              {errors.confirmPassword && (
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <FontAwesomeIcon icon={faExclamationCircle} className="text-red-500" />
                </span>
              )}
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs italic">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }
}
