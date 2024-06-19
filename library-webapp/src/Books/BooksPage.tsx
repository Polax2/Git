import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, TextField } from '@mui/material';
import { agathaChristieBooks, Book } from './booksList';
import { useApi } from '../api/ApiProvider';
import { CurrentUser } from '../api/current_user';
import './bookspage.css';

const BooksPage: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const apiClient = useApi();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const response = await apiClient.getCurrentUser();
      if (response && response.data) {
        setCurrentUser(response as CurrentUser);
      }
    };

    fetchCurrentUser();
  }, [apiClient]);

  const handleNextClick = () => {
    const nextIndex = startIndex + 3;
    if (nextIndex < filteredBooks.length) {
      setStartIndex(nextIndex);
    }
  };

  const handlePrevClick = () => {
    const prevIndex = startIndex - 3;
    if (prevIndex >= 0) {
      setStartIndex(prevIndex);
    }
  };

  const handleLoanClick = async () => {
    if (!currentUser || !currentUser.data) {
      alert('User not logged in');
      return;
    }

    const middleBook = filteredBooks[startIndex + 1];
    if (middleBook) {
      const userId = currentUser.data.userId;
      const bookId = middleBook.BookID;
      const dueDate = new Date(
        new Date().setDate(new Date().getDate() + 14),
      ).toISOString(); // 2 weeks from now, let's say

      const response = await apiClient.postLoan(userId, bookId, dueDate);
      if (response.success) {
        alert('Loan created successfully');
      } else {
        alert('Failed to create loan');
      }
    }
  };

  const filteredBooks = agathaChristieBooks.filter((book: Book) =>
    book.Title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="container">
      <div className="search-bar-container">
        <TextField
          label="Search Books"
          variant="outlined"
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />
      </div>
      <div className="books-container">
        <Grid container spacing={7} justifyContent="center">
          {filteredBooks.slice(startIndex, startIndex + 3).map((book: Book) => (
            <Grid item key={book.BookID} xs={12} sm={6} md={4}>
              <div className="book-card">
                <Typography variant="h6" className="book-title">
                  {book.Title}
                </Typography>
                <Typography variant="subtitle1">
                  Author: {book.Author}
                </Typography>
                <Typography variant="subtitle1">
                  Publisher: {book.Publisher}
                </Typography>
                <Typography variant="subtitle1">
                  Year Published: {book.YearPublished}
                </Typography>
                <Typography variant="subtitle1">
                  Available Copies: {book.AvailableCopies}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
      <div className="button-container2">
        <Button disabled={startIndex === 0} onClick={handlePrevClick}>
          Previous
        </Button>
        <Button onClick={handleLoanClick}>Loan</Button>
        <Button
          disabled={startIndex + 3 >= filteredBooks.length}
          onClick={handleNextClick}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default BooksPage;
