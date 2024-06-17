export class BookDto {
  id: number | undefined;
  isbn: string | undefined;
  title: string | undefined;
  author: string | undefined;
  publisher: string | undefined;
  yearPublished: number | undefined;
  available: boolean | undefined;
}

export class UserDto {
  id: number | undefined;
  name: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
}

export class LoanDto {
  loanId: number | undefined;
  book: BookDto | undefined;
  user: UserDto | undefined;
  loanDate: string | undefined;
  dueDate: string | undefined;
}
