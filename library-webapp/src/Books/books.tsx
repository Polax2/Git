import React from 'react';
import { BookType } from './booksList';
import './books.css';

interface BooksProps {
  books: BookType[];
}

const Books: React.FC<BooksProps> = ({ books }) => {
  const displayBooks = () => {
    return books.map((book) => (
      <div key={book.BookID} className="book">
        <h2>{book.Title}</h2>
        <p>
          <strong>Author:</strong> {book.Author}
        </p>
        <p>
          <strong>Publisher:</strong> {book.Publisher}
        </p>
        <p>
          <strong>Year Published:</strong> {book.YearPublished}
        </p>
        <p>
          <strong>ISBN:</strong> <span className="isbn">{book.ISBN}</span>
        </p>
        <p
          className={`availability ${book.AvailableCopies > 0 ? 'available' : 'unavailable'}`}
        >
          <strong>Availability:</strong>{' '}
          {book.AvailableCopies > 0 ? 'Available' : 'Out of stock'}
        </p>
      </div>
    ));
  };

  return <div className="book-list">{displayBooks()}</div>;
};

export default Books;
