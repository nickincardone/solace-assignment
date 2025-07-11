// API Response Types

export interface Advocate {
  id?: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt?: Date;
}

export interface PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface AdvocatesSuccessResponse {
  data: Advocate[];
  pagination: PaginationMetadata;
}

export interface ApiErrorResponse {
  error: string;
}

export type AdvocatesApiResponse = AdvocatesSuccessResponse | ApiErrorResponse;

// API Request Types

export interface AdvocatesRequestParams {
  page?: number;
  limit?: number;
} 