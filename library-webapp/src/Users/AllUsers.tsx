import React from 'react';
import './allusers.css';

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

const AllUsers: React.FC = () => {
  return (
    <div className="UsersPage">
      {users.map((user) => (
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

export default AllUsers;
