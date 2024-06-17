import React, { useState } from 'react';
import './searchbook.css';

interface Book {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  yearPublished: number;
  availableCopies: number;
}

const books: Book[] = [
  {
    id: 1,
    isbn: '1234567890',
    title: 'Book One',
    author: 'Author One',
    publisher: 'Publisher One',
    yearPublished: 2020,
    availableCopies: 5,
  },
  {
    id: 2,
    isbn: '0987654321',
    title: 'Book Two',
    author: 'Author Two',
    publisher: 'Publisher Two',
    yearPublished: 2021,
    availableCopies: 2,
  },
];

const SearchBook: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBooks = books.filter((book) =>
    `${book.title} ${book.author}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const handleDelete = (id: number) => {
    console.log(`Delete book with id: ${id}`);
  };

  return (
    <div className="BooksPage">
      <div className="SearchBar">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredBooks.map((book) => (
        <div className="BookItem" key={book.id}>
          <div className="BookIcon" />
          <div className="BookDetails">
            <h2>{book.title}</h2>
            <p>ISBN: {book.isbn}</p>
            <p>Author: {book.author}</p>
            <p>Publisher: {book.publisher}</p>
            <p>Year Published: {book.yearPublished}</p>
            <p>Available Copies: {book.availableCopies}</p>
          </div>
          <button
            className="DeleteButton"
            onClick={() => handleDelete(book.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default SearchBook;
