import React, { useState } from 'react';
import './addcopies.css';
import { TextField, Button } from '@mui/material';
import { useApi } from '../api/ApiProvider';
import { useNavigate } from 'react-router-dom';

const AddCopies: React.FC = () => {
  const [isbn, setIsbn] = useState('');
  const [newCopies, setNewCopies] = useState('');
  const apiClient = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiClient.addCopies(isbn, Number(newCopies));
      if (response.success) {
        navigate('/collections');
      } else {
        console.error('Failed to add copies');
      }
    } catch (error) {
      console.error('Error adding copies:', error);
    }
  };

  return (
    <div className="container">
      <div className="rectangle">
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <div className="input-field">
              <TextField
                id="isbn"
                label="ISBN"
                variant="outlined"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <TextField
                id="newCopies"
                label="New Copies"
                variant="outlined"
                type="number"
                value={newCopies}
                onChange={(e) => setNewCopies(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="button-container">
            <Button
              style={{ backgroundColor: 'rgb(184, 146, 252)' }}
              variant="contained"
              type="submit"
            >
              Add Copies
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCopies;
