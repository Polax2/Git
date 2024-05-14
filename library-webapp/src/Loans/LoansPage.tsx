import React, { useState } from 'react';
import { mockLoans, Loan } from './loansList';
import './loanspage.css';

interface LoanItemProps {
  loan: Loan;
}

const LoanItem: React.FC<LoanItemProps> = ({ loan }) => (
  <div key={loan.BookID} className="LoanItem">
    <div className="BookCover"></div> {/* Keep the BookCover div */}
    <div className="LoanDetails">
      <h2>{loan.Title}</h2>
      <p>
        <strong>Author:</strong> {loan.Author}
      </p>
      <p>
        <strong>Due Date:</strong> {loan.Due_date.toDateString()}
      </p>
    </div>
  </div>
);

const LoansPage: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);

  return (
    <div className="LoansPage">
      <h1>Loan List</h1>
      {mockLoans.slice(startIndex, startIndex + 10).map((loan) => (
        <LoanItem key={loan.BookID} loan={loan} />
      ))}
    </div>
  );
};

export default LoansPage;
