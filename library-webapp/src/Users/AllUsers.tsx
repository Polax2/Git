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
          <div className="UserIcon">
            {/* User icon */}
            <img
              src="C:/Users/polan/OneDrive - Politechnika Wroclawska/Desktop/ICONS/users3.png"
              alt="User Icon"
            />
          </div>
          <div className="UserDetails">
            <p>"id": {user.id},</p>
            <p>"name": "{user.name}",</p>
            <p>"lastName": "{user.lastName}",</p>
            <p>"email": "{user.email}"</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllUsers;
