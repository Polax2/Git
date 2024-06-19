import React from 'react';
import { useFormik } from 'formik';
import { useApi } from '../api/ApiProvider';
import { RegisterDto } from '../api/dto/register.dto';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '../api/dto/UserRole';
import { ClientResponse } from '../api/library_client';

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
    <form onSubmit={formik.handleSubmit}>
      <TextField
        name="username"
        label="Username"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <TextField
        name="email"
        label="Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <Button type="submit">Register</Button>
    </form>
  );
};

export default Register;
