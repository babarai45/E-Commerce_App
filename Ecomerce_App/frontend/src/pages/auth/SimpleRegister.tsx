import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { RegisterData } from '../../services/auth';

const SimpleRegister: React.FC = () => {
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData & { confirmPassword: string }>();

  const password = watch('password');

  const onSubmit = async (data: RegisterData & { confirmPassword: string }) => {
    setIsLoading(true);
    setError('');

    try {
      const { confirmPassword, ...registerData } = data;
      await authRegister(registerData);
      navigate('/');
    } catch (err: any) {
      if (err.response?.data) {
        const errorData = err.response.data;
        if (typeof errorData === 'object') {
          // Handle validation errors from backend
          const errorMessages = [];
          if (errorData.username) errorMessages.push(`Username: ${errorData.username.join(' ')}`);
          if (errorData.email) errorMessages.push(`Email: ${errorData.email.join(' ')}`);
          if (errorData.password) errorMessages.push(`Password: ${errorData.password.join(' ')}`);
          if (errorData.non_field_errors) errorMessages.push(errorData.non_field_errors.join(' '));
          if (errorData.detail) errorMessages.push(errorData.detail);
          
          setError(errorMessages.length > 0 ? errorMessages.join('. ') : 'Registration failed. Please try again.');
        } else {
          setError(errorData);
        }
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#f9fafb',
      padding: '2rem 1rem'
    }}>
      <div className="form-container">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            Create your account
          </h2>
          <p style={{ color: '#6b7280' }}>
            Or{' '}
            <Link to="/login" style={{ color: '#3b82f6', textDecoration: 'none' }}>
              sign in to your existing account
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div style={{ 
              background: '#fef2f2', 
              border: '1px solid #fecaca', 
              color: '#dc2626', 
              padding: '0.75rem', 
              borderRadius: '0.375rem',
              marginBottom: '1rem'
            }}>
              {error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              {...register('username', { 
                required: 'Username is required',
                minLength: { value: 3, message: 'Username must be at least 3 characters' }
              })}
              placeholder="Choose a username"
            />
            {errors.username && (
              <div className="error">{errors.username.message}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Please enter a valid email address'
                }
              })}
              placeholder="Enter your email"
            />
            {errors.email && (
              <div className="error">{errors.email.message}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              type="text"
              {...register('first_name', { required: 'First name is required' })}
              placeholder="Enter your first name"
            />
            {errors.first_name && (
              <div className="error">{errors.first_name.message}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              {...register('last_name', { required: 'Last name is required' })}
              placeholder="Enter your last name"
            />
            {errors.last_name && (
              <div className="error">{errors.last_name.message}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' }
              })}
              placeholder="Choose a password"
            />
            {errors.password && (
              <div className="error">{errors.password.message}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <div className="error">{errors.confirmPassword.message}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.75rem' }}
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SimpleRegister;
