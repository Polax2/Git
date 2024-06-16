import { Button, TextField } from '@mui/material';
import './addnew.css';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';

function AddNew() {
  const navigate = useNavigate();
  const apiClient = useApi();

  const onSubmit = useCallback(
    async (
      values: {
        isbn: string;
        author: string;
        title: string;
        publisher: string;
        year: string;
        copies: number;
      },
      formik: any,
    ) => {
      const response = await apiClient.createBook(
        values.isbn,
        values.title,
        values.author,
        values.publisher,
        parseInt(values.year, 10),
        values.copies,
      );
      if (response.success) {
        navigate('/collections');
      } else {
        console.error('Failed to add book');
        formik.setSubmitting(false);
      }
    },
    [apiClient, navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        isbn: yup.string().required('ISBN is required'),
        author: yup.string().required('Author is required'),
        title: yup.string().required('Title is required'),
        publisher: yup.string().required('Publisher is required'),
        year: yup
          .string()
          .required('Year is required')
          .matches(/^\d{4}$/, 'Invalid year format (YYYY)'),
        copies: yup.number().required('Available copies is required'),
      }),
    [],
  );

  return (
    <div className="container">
      <div className="rectangle">
        <Formik
          initialValues={{
            isbn: '',
            author: '',
            title: '',
            publisher: '',
            year: '',
            copies: 0,
          }}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          validateOnChange
          validateOnBlur
        >
          {(formik: any) => (
            <form
              className="form"
              id="addBookForm"
              onSubmit={formik.handleSubmit}
              noValidate
            >
              <div className="input-wrapper">
                <div className="input-field">
                  <TextField
                    id="isbn"
                    label="ISBN"
                    variant="outlined"
                    name="isbn"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.isbn && !!formik.errors.isbn}
                    helperText={formik.touched.isbn && formik.errors.isbn}
                  />
                </div>
                <div className="input-field">
                  <TextField
                    id="author"
                    label="Author"
                    variant="outlined"
                    name="author"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.author && !!formik.errors.author}
                    helperText={formik.touched.author && formik.errors.author}
                  />
                </div>
                <div className="input-field">
                  <TextField
                    id="title"
                    label="Title"
                    variant="outlined"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.title && !!formik.errors.title}
                    helperText={formik.touched.title && formik.errors.title}
                  />
                </div>
                <div className="input-field">
                  <TextField
                    id="publisher"
                    label="Publisher"
                    variant="outlined"
                    name="publisher"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.publisher && !!formik.errors.publisher
                    }
                    helperText={
                      formik.touched.publisher && formik.errors.publisher
                    }
                  />
                </div>
                <div className="input-field">
                  <TextField
                    id="year"
                    label="Year Published"
                    variant="outlined"
                    name="year"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.year && !!formik.errors.year}
                    helperText={formik.touched.year && formik.errors.year}
                  />
                </div>
                <div className="input-field">
                  <TextField
                    id="copies"
                    label="Available Copies"
                    variant="outlined"
                    type="number"
                    name="copies"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.copies && !!formik.errors.copies}
                    helperText={formik.touched.copies && formik.errors.copies}
                  />
                </div>
              </div>
              <div className="button-container">
                <Button
                  style={{ backgroundColor: 'rgb(184, 146, 252)' }}
                  variant="contained"
                  type="submit"
                  form="addBookForm"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  Add Book
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default AddNew;
