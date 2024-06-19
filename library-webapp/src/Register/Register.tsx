import React from 'react';
import { useFormik } from 'formik';
import { useApi } from '../api/ApiProvider';
import { RegisterDto } from '../api/dto/register.dto';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../api/dto/UserRole';
import { ClientResponse } from '../api/library_client';
import './register.css';

const Register: React.FC = () => {
  const apiClient = useApi();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      role: UserRole.READER,
    },
    onSubmit: async (values: RegisterDto) => {
      apiClient.register(values).then((response: ClientResponse<any>) => {
        if (response.success) {
          navigate('/staffsection');
        } else {
          formik.setErrors({ username: 'Registration failed' });
        }
      });
    },
  });

  return (
    <div className="register-container">
      <div className="register-rectangle">
        <form onSubmit={formik.handleSubmit} className="register-input-wrapper">
          <TextField
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="register-input-field"
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="register-input-field"
          />
          <TextField
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="register-input-field"
          />
          <div className="register-button-container">
            <Button type="submit">Register</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
