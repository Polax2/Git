import React from 'react';
import { Button, TextField } from '@mui/material';
import './loginpage.css';
import LoginIcon from '@mui/icons-material/Login';
import { Formik } from 'formik';
import { useCallback, useMemo } from 'react';
import * as yup from 'yup';

function LoginPage() {
  const onSubmit = useCallback(
    (values: { email: string; password: string }, formik: any) => {
      console.log(values);
    },
    [],
  );
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        email: yup.string().required('Required'),
        password: yup
          .string()
          .required('Required')
          .min(7, 'Password too short'),
      }),
    [],
  );

  return (
    <div className="container">
      <div className="rectangle"></div>
      <Formik
        initialValues={{ email: '', password: '' }}
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
