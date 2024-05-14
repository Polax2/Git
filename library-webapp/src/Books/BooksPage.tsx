import React, { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import { agathaChristieBooks, Book } from './booksList';
import './bookspage.css';

const BooksPage: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handleNextClick = () => {
    const nextIndex = startIndex + 1;
    if (nextIndex < agathaChristieBooks.length) {
      setStartIndex(nextIndex);
    }
  };

  const handlePrevClick = () => {
    const prevIndex = startIndex - 1;
    if (prevIndex >= 0) {
      setStartIndex(prevIndex);
    }
  };

  return (
    <div className="container">
      <div className="books-container2">
        <Grid container spacing={7} justifyContent="center">
          {agathaChristieBooks
            .slice(startIndex, startIndex + 3)
            .map((book: Book) => (
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
        <div className="button-container2">
          <Button disabled={startIndex === 0} onClick={handlePrevClick}>
            Previous
          </Button>

          <Button
            disabled={startIndex + 3 >= agathaChristieBooks.length}
            onClick={handleNextClick}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
