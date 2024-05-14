export interface Loan {
  BookID: string;
  Title: string;
  Author: string;
  Due_date: Date;
}

export const mockLoans: Loan[] = [
  {
    BookID: '1',
    Title: 'Murder on the Orient Express',
    Author: 'Agatha Christie',
    Due_date: new Date(2024, 5, 10),
  },
  {
    BookID: '3',
    Title: 'The Murder of Roger Ackroyd',
    Author: 'Agatha Christie',
    Due_date: new Date(2024, 6, 10),
  },
  {
    BookID: '9',
    Title: 'The Mysterious Affair at Styles',
    Author: 'Agatha Christie',
    Due_date: new Date(2024, 6, 23),
  },
  {
    BookID: '8',
    Title: 'Peril at End House',
    Author: 'Agatha Christie',
    Due_date: new Date(2024, 5, 9),
  },
];
