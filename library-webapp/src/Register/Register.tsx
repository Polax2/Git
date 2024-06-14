import { Button, TextField, MenuItem } from '@mui/material';
import './register.css';
import { Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { UserRole } from '../api/dto/UserRole';

function Register() {
  const navigate = useNavigate();
  const apiClient = useApi();

  const onSubmit = useCallback(
    (
      values: {
        username: string;
        password: string;
        email: string;
        role: UserRole;
      },
      formik: any,
    ) => {
      apiClient.register(values).then((response) => {
        if (response.success) {
          navigate('/staffsection');
        } else {
          formik.setFieldError('username', 'Registration failed');
        }
      });
    },
    [apiClient, navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Required'),
        password: yup
          .string()
          .required('Required')
          .min(5, 'Password too short'),
        email: yup.string().email('Invalid email').required('Required'),
        role: yup.string().required('Required'),
      }),
    [],
  );

  return (
    <div className="register-container">
      <div className="register-rectangle"></div>
      <Formik
        initialValues={{
          username: '',
          password: '',
          email: '',
          role: UserRole.READER,
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
        validationBlur
      >
        {(formik: any) => (
          <form
            className="register-form"
            id="registerForm"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <div className="register-input-wrapper">
              <div className="register-input-field">
                <TextField
                  id="username"
                  label="Username"
                  variant="outlined"
                  name="username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.username && !!formik.errors.username}
                  helperText={formik.touched.username && formik.errors.username}
                />
              </div>
              <div className="register-input-field">
                <TextField
                  id="outlined-password-input"
                  label="Password"
                  variant="outlined"
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && !!formik.errors.password}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </div>
              <div className="register-input-field">
                <TextField
                  id="email"
                  label="Email"
                  variant="outlined"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && !!formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </div>
              <div className="register-input-field">
                <TextField
                  id="role"
                  label="Role"
                  variant="outlined"
                  name="role"
                  select
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.role && !!formik.errors.role}
                  helperText={formik.touched.role && formik.errors.role}
                  value={formik.values.role}
                >
                  <MenuItem value={UserRole.READER}>ROLE_READER</MenuItem>
                  <MenuItem value={UserRole.ADMIN}>ROLE_ADMIN</MenuItem>
                </TextField>
              </div>
            </div>
            <div className="register-button-container">
              <Button
                style={{ backgroundColor: 'rgb(184, 146, 252)' }}
                variant="contained"
                type="submit"
                form="registerForm"
                disabled={!(formik.isValid || formik.dirty)}
              >
                Register
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Register;
