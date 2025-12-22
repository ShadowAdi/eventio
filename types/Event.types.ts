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


export type ApiResponse<T> = {
  data: T;
  success:boolean;
  error: null | {
    message: string;
  };
};
