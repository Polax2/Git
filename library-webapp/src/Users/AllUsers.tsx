import React, { useEffect, useState } from 'react';
import { useApi } from '../api/ApiProvider';
import './allusers.css';

interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
}

const AllUsers: React.FC = () => {
  const apiClient = useApi();
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.getUsers(currentPage);
        console.log('getAllUsers response:', response);
        if (response.success && response.data) {
          setUsers(response.data);
        } else {
          console.error('Failed to fetch users:', response.statusCode);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [apiClient, currentPage]);

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
