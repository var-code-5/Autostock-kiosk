// src/services/bookService.ts
import { api } from './authServices';

export interface Book {
  book_name: string;
  author: string;
  actual_price: number;
  discounted_price: number;
  discount_percentage: number;
  rating: number;
  description: string;
  image: string;
  publisher_name: string;
  isbn: string;
}

export interface PaginationParams {
  offset: number;
  limit: number;
}

export interface PaginationResponse {
  offset: number;
  limit: number;
  total: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  pagination: PaginationResponse;
}

const DEFAULT_PAGINATION: PaginationParams = {
  offset: 0,
  limit: 10,
};

const bookService = {
  // Search books by query
  async searchBooks(query: string, pagination = DEFAULT_PAGINATION): Promise<ApiResponse<Book[]>> {
    const response = await api.get<ApiResponse<Book[]>>('/stores/search', {
      params: {
        book: query,
        offset: pagination.offset,
        limit: pagination.limit,
      },
    });
    return response.data;
  },
  
  // Browse books by publisher
  async browseByPublisher(publisher: string, pagination = DEFAULT_PAGINATION): Promise<ApiResponse<Book[]>> {
    const response = await api.get<ApiResponse<Book[]>>('/stores/browse', {
      params: {
        publisher,
        offset: pagination.offset,
        limit: pagination.limit,
      },
    });
    return response.data;
  },
  
  // Browse books by category
  async browseByCategory(category: string, pagination = DEFAULT_PAGINATION): Promise<ApiResponse<Book[]>> {
    const response = await api.get<ApiResponse<Book[]>>('/stores/browse', {
      params: {
        category,
        offset: pagination.offset,
        limit: pagination.limit,
      },
    });
    return response.data;
  },
  
  // Get new arrivals
  async getNewArrivals(pagination = DEFAULT_PAGINATION): Promise<ApiResponse<Book[]>> {
    const response = await api.get<ApiResponse<Book[]>>('/stores/browse', {
      params: {
        type: 'new_arrivals',
        offset: pagination.offset,
        limit: pagination.limit,
      },
    });
    return response.data;
  },
  
  // Get top sellers
  async getTopSellers(pagination = DEFAULT_PAGINATION): Promise<ApiResponse<Book[]>> {
    const response = await api.get<ApiResponse<Book[]>>('/stores/browse', {
      params: {
        type: 'top_sellers',
        offset: pagination.offset,
        limit: pagination.limit,
      },
    });
    return response.data;
  },
  
  // Get books on sale
  async getOnSale(pagination = DEFAULT_PAGINATION): Promise<ApiResponse<Book[]>> {
    const response = await api.get<ApiResponse<Book[]>>('/stores/browse', {
      params: {
        type: 'on_sale',
        offset: pagination.offset,
        limit: pagination.limit,
      },
    });
    return response.data;
  },
  
  // Combined browse function that accepts multiple parameters
  async browseBooks(params: {
    publisher?: string;
    category?: string;
    type?: 'new_arrivals' | 'top_sellers' | 'on_sale';
    offset?: number;
    limit?: number;
  }): Promise<ApiResponse<Book[]>> {
    const response = await api.get<ApiResponse<Book[]>>('/stores/browse', {
      params,
    });
    return response.data;
  },
};

export default bookService;