import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';
import { CurrentUser } from './current_user';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
};

export class LibraryClient {
  private client: AxiosInstance;
  private currentUser: CurrentUser | null = null;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8081/api',
    });

    const token = localStorage.getItem('token');
    if (token) {
      this.client.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
        }
        return Promise.reject(error);
      },
    );
  }

  public async login(
    data: LoginDto,
  ): Promise<ClientResponse<LoginResponseDto | null>> {
    try {
      const response: AxiosResponse<LoginResponseDto> = await this.client.post(
        '/auth/login',
        data,
      );

      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        this.client.defaults.headers.common['Authorization'] =
          'Bearer ' + token;
      }

      await this.fetchCurrentUser();

      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async fetchCurrentUser(): Promise<void> {
    try {
      const response = await this.client.get('/users/me');
      const userData = response.data;
      this.currentUser = new CurrentUser(
        userData.userId,
        userData.name,
        userData.lastName,
        userData.email,
        userData.username,
        userData.userRole,
      );
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      console.error('Failed to fetch current user', axiosError);
      this.currentUser = null;
    }
  }

  public getCurrentUser(): CurrentUser | null {
    return this.currentUser;
  }

  public async getUsers(currentPage: number) {
    try {
      const response = await this.client.get(`/users?page=${currentPage}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getBooks(page: number) {
    try {
      const response = await this.client.get(`/books?page=${page}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async postLoan(bookId: number, userId: number, dueDate: string) {
    try {
      const response = await this.client.post(`/loans`, {
        bookId,
        userId,
        dueDate,
      });
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async getLoans(page: number) {
    try {
      const response = await this.client.get(`/loans?page=${page}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async addCopies(isbn: string, additionalCopies: number) {
    try {
      const response = await this.client.patch(`/books/${isbn}/addCopies`, {
        additionalCopies,
      });
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async createBook(
    isbn: string,
    title: string,
    author: string,
    publisher: string,
    yearPublished: number,
    availableCopies: number,
  ): Promise<ClientResponse<any>> {
    try {
      const response = await this.client.post(`/books`, {
        isbn,
        title,
        author,
        publisher,
        yearPublished,
        availableCopies,
      });
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async register(
    data: RegisterDto,
  ): Promise<ClientResponse<RegisterResponseDto | null>> {
    try {
      const response: AxiosResponse<RegisterResponseDto> =
        await this.client.post('/auth/register', data);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteLoan(loanId: number) {
    try {
      const response = await this.client.delete(`/loans/${loanId}`);
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;

      return {
        success: false,
        data: null,
        statusCode: axiosError.response?.status || 0,
      };
    }
  }
}
