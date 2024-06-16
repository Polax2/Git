import React from 'react';
import './staffsection.css';
import { useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const navigate = useNavigate();

  const registerUser = () => {
    console.log('Register new user');
    navigate('/register');
  };

  const viewMembers = () => {
    console.log('See all library members');
    navigate('/allusers');
  };

  const searchUser = () => {
    console.log('Search for user');
    navigate('/searchuser');
  };

  const addBook = () => {
    console.log('Add new book');
  };

  const addCopies = () => {
    console.log('Add copies to already existing book');
  };

  const searchBook = () => {
    console.log('Search for book');
  };

  const viewLoans = () => {
    console.log('See all current loans');
  };

  return (
    <div className="container2">
      <div className="shelf"></div>
      <div className="box">
        <h3>USER</h3>
        <ul>
          <li>
            <button onClick={registerUser}>Register new user</button>
          </li>
          <li>
            <button onClick={viewMembers}>See all library members</button>
          </li>
          <li>
            <button onClick={searchUser}>Search for user</button>
          </li>
        </ul>
      </div>
      <div className="box">
        <h3>BOOKS</h3>
        <ul>
          <li>
            <button onClick={addBook}>Add new book</button>
          </li>
          <li>
            <button onClick={addCopies}>
              Add copies to already existing book
            </button>
          </li>
          <li>
            <button onClick={searchBook}>Search for book</button>
          </li>
        </ul>
      </div>
      <div className="box">
        <h3>LOANS</h3>
        <ul>
          <li>
            <button onClick={viewLoans}>See all current loans</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;
