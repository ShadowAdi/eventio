export type EventResponse = {
  id: number;
  title: string;
  description: string;
  location: string | null;
  isOnline: boolean;
  startDate: string;
  endDate: string;
  capacity: number | null;
  price: string;
  createdAt: string;
  updatedAt: string;
};


export type CreateEventInput = {
  title: string;
  description: string;
  location: string | null;
  isOnline: boolean;
  startDate: string;
  endDate: string;
  capacity: number | null;
  price: string;
};

export type UpdateEventInput = {
  title?: string;
  description?: string;
  location?: string;
  isOnline?: boolean;
  startDate?: string;
  endDate?: string;
  capacity?: number;
  price?: string;
};


export type ApiResponse<T> = {
  data: T;
  success:boolean;
  message:string;
  error: unknown;
};
