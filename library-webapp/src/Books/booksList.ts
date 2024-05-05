export interface BookType {
  BookID: string;
  ISBN: string;
  Title: string;
  Author: string;
  Publisher: string;
  YearPublished: number;
  AvailableCopies: number;
}

export const agathaChristieBooks: BookType[] = [
  {
    BookID: '1',
    ISBN: '978-0062073471',
    Title: 'Murder on the Orient Express',
    Author: 'Agatha Christie',
    Publisher: 'William Morrow Paperbacks',
    YearPublished: 1934,
    AvailableCopies: 20,
  },
  {
    BookID: '2',
    ISBN: '978-0062073570',
    Title: 'And Then There Were None',
    Author: 'Agatha Christie',
    Publisher: 'William Morrow Paperbacks',
    YearPublished: 1939,
    AvailableCopies: 10,
  },
  {
    BookID: '3',
    ISBN: '978-0312981667',
    Title: 'The Murder of Roger Ackroyd',
    Author: 'Agatha Christie',
    Publisher: "St. Martin's Press",
    YearPublished: 1926,
    AvailableCopies: 8,
  },
  {
    BookID: '4',
    ISBN: '978-0312981438',
    Title: 'Death on the Nile',
    Author: 'Agatha Christie',
    Publisher: "St. Martin's Press",
    YearPublished: 1937,
    AvailableCopies: 7,
  },
  {
    BookID: '5',
    ISBN: '978-0312981643',
    Title: 'The ABC Murders',
    Author: 'Agatha Christie',
    Publisher: "St. Martin's Press",
    YearPublished: 1936,
    AvailableCopies: 6,
  },
  {
    BookID: '6',
    ISBN: '978-0312981544',
    Title: 'Murder in Mesopotamia',
    Author: 'Agatha Christie',
    Publisher: "St. Martin's Press",
    YearPublished: 1936,
    AvailableCopies: 4,
  },
  {
    BookID: '7',
    ISBN: '978-0312981650',
    Title: 'The Murder at the Vicarage',
    Author: 'Agatha Christie',
    Publisher: "St. Martin's Press",
    YearPublished: 1930,
    AvailableCopies: 9,
  },
  {
    BookID: '8',
    ISBN: '978-0312981674',
    Title: 'Peril at End House',
    Author: 'Agatha Christie',
    Publisher: "St. Martin's Press",
    YearPublished: 1932,
    AvailableCopies: 3,
  },
  {
    BookID: '9',
    ISBN: '978-0312981476',
    Title: 'A Pocket Full of Rye',
    Author: 'Agatha Christie',
    Publisher: "St. Martin's Press",
    YearPublished: 1953,
    AvailableCopies: 8,
  },
  {
    BookID: '10',
    ISBN: '978-0312981483',
    Title: 'The Moving Finger',
    Author: 'Agatha Christie',
    Publisher: "St. Martin's Press",
    YearPublished: 1943,
    AvailableCopies: 5,
  },
  {
    BookID: '11',
    ISBN: '978-0312981452',
    Title: 'Nemesis',
    Author: 'Agatha Christie',
    Publisher: "St. Martin's Press",
    YearPublished: 1971,
    AvailableCopies: 6,
  },
  {
    BookID: '12',
    ISBN: '978-0312981636',
    Title: 'Appointment with Death',
    Author: 'Agatha Christie',
    Publisher: "St. Martin's Press",
    YearPublished: 1938,
    AvailableCopies: 2,
  },
  {
    BookID: '13',
    ISBN: '978-0312981698',
    Title: 'Five Little Pigs',
    Author: 'Agatha Christie',
    Publisher: "St. Martin's Press",
    YearPublished: 1942,
    AvailableCopies: 4,
  },
  {
    BookID: '14',
    ISBN: '978-0312981575',
    Title: 'Sad Cypress',
    Author: 'Agatha Christie',
    Publisher: "St. Martin's Press",
    YearPublished: 1940,
    AvailableCopies: 3,
  },
  {
    BookID: '15',
    ISBN: '978-0312981469',
    Title: 'Sleeping Murder',
    Author: 'Agatha Christie',
    Publisher: "St. Martin's Press",
    YearPublished: 1976,
    AvailableCopies: 7,
  },
];
function createBookElement(book: BookType): string {
  return `
      <div class="book">
          <h2>${book.Title}</h2>
          <p><strong>Author:</strong> ${book.Author}</p>
          <p><strong>Publisher:</strong> ${book.Publisher}</p>
          <p><strong>Year Published:</strong> ${book.YearPublished}</p>
          <p><strong>ISBN:</strong> <span class="isbn">${book.ISBN}</span></p>
          <p class="availability ${book.AvailableCopies > 0 ? 'available' : 'unavailable'}">
              <strong>Availability:</strong> ${book.AvailableCopies > 0 ? 'Available' : 'Out of stock'}
          </p>
      </div>
  `;
}

function displayBooks(): void {
  const bookListContainer: HTMLElement | null =
    document.querySelector('.book-list');
  if (!bookListContainer) return;
  agathaChristieBooks.forEach((book) => {
    const bookElement = createBookElement(book);
    if (bookListContainer) bookListContainer.innerHTML += bookElement;
  });
}

displayBooks();
