import React, { useState, useEffect } from 'react';
import './allloans.css';
import { useApi } from '../api/ApiProvider';
import { LoanDto, BookDto, UserDto } from '../api/dto/objects.dto';

const AllLoans: React.FC = () => {
  const [loans, setLoans] = useState<LoanDto[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const apiClient = useApi();

  useEffect(() => {
    const fetchLoans = async () => {
      const response = await apiClient.getAllLoans();
      if (response.success) {
        setLoans(response.data.loans);
      }
    };

    fetchLoans();
  }, [apiClient]);

  const handleDelete = async (loanId: number) => {
    const response = await apiClient.deleteLoan(loanId);
    if (response.success) {
      setLoans(loans.filter((loan) => loan.loanId !== loanId));
    }
  };

  const filteredLoans = loans.filter((loan) =>
    `${loan.user?.name} ${loan.user?.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="LoansPage">
      <div className="SearchBar">
        <input
          type="text"
          placeholder="Search by user name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredLoans.map((loan) => (
        <div className="LoanItem" key={loan.loanId}>
          <div className="LoanDetails">
            <h2>
              {loan.user?.name} {loan.user?.lastName}
            </h2>
            <p>ID: {loan.loanId}</p>
            <p>Book Title: {loan.book?.title}</p>
            <p>Loan Date: {loan.loanDate}</p>
            <p>Due Date: {loan.dueDate}</p>
          </div>
          <button
            className="DeleteButton"
            onClick={() => handleDelete(loan.loanId!)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllLoans;
