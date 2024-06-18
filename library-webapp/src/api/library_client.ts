import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { LoginDto, LoginResponseDto } from './dto/login.dto';
import { RegisterDto, RegisterResponseDto } from './dto/register.dto';
import { LoanDto } from '../api/dto/objects.dto';

export type ClientResponse<T> = {
  success: boolean;
  data: T;
  statusCode: number;
};

export class LibraryClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: 'http://localhost:8080/api',
    });
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
        this.client.defaults.headers.common['Authorization'] =
          `Bearer ${token}`;
        localStorage.setItem('token', token);
      }

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

  public async getBooks(): Promise<ClientResponse<any | null>> {
    try {
      const response = await this.client.get('/books');
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
  public async addCopies(
    isbn: string,
    additionalCopies: number,
  ): Promise<ClientResponse<any>> {
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
  public async getAllLoans(): Promise<ClientResponse<{ loans: LoanDto[] }>> {
    try {
      const response: AxiosResponse<{ loans: LoanDto[] }> =
        await this.client.get('/loans');
      return {
        success: true,
        data: response.data,
        statusCode: response.status,
      };
    } catch (error) {
      const axiosError = error as AxiosError<Error>;
      return {
        success: false,
        data: { loans: [] },
        statusCode: axiosError.response?.status || 0,
      };
    }
  }

  public async deleteLoan(loanId: number): Promise<ClientResponse<null>> {
    try {
      const response: AxiosResponse<null> = await this.client.delete(
        `/loans/${loanId}`,
      );
      return {
        success: true,
        data: null,
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

  public async createLoan(
    userId: number,
    bookId: number,
    loanDate: string,
    dueDate: string,
  ): Promise<ClientResponse<LoanDto | null>> {
    try {
      const response: AxiosResponse<LoanDto> = await this.client.post(
        '/loans',
        {
          userId,
          bookId,
          loanDate,
          dueDate,
        },
      );
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
