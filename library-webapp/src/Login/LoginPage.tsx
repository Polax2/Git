import { Button, TextField } from '@mui/material';
import './loginpage.css';
import LoginIcon from '@mui/icons-material/Login';
import { Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';

function LoginPage() {
  const navigate = useNavigate();
  const apiClient = useApi();

  const onSubmit = useCallback(
    (values: { username: string; password: string }, formik: any) => {
      apiClient.login(values).then((response) => {
        if (response.success) {
          navigate('/collections');
        } else {
          formik.setFieldError('username', 'Invalid user or password');
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
      }),
    [],
  );

  return (
    <div className="container">
      <div className="rectangle"></div>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
        validationBlur
      >
        {(formik: any) => (
          <form
            className="form"
            id="signForm"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <div className="input-wrapper">
              <div className="input-field">
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
              <div className="input-field">
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
            </div>
            <div className="button-container">
              <Button
                style={{ backgroundColor: 'rgb(184, 146, 252)' }}
                variant="contained"
                startIcon={<LoginIcon />}
                type="submit"
                form="signForm"
                disabled={!(formik.isValid || formik.dirty)}
              >
                Sign in
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
export default LoginPage;
