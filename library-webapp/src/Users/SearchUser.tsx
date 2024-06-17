import React, { useState } from 'react';
import './searchuser.css';

interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'John', lastName: 'Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com' },
];

const SearchUser: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter((user) =>
    `${user.name} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="UsersPage">
      <div className="SearchBar">
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredUsers.map((user) => (
        <div className="UserItem" key={user.id}>
          <div className="UserIcon" />
          <div className="UserDetails">
            <h2>
              {user.name} {user.lastName}
            </h2>
            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchUser;
