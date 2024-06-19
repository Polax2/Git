export class CurrentUser {
  success?: boolean;
  data?: {
    userId: number;
    name: string;
    lastName: string;
    email: string;
    username: string;
    userRole: string;
  };

  constructor(
    userId: number,
    name: string,
    lastName: string,
    email: string,
    username: string,
    userRole: string,
  ) {
    this.data = { userId, name, lastName, email, username, userRole };
  }
}
