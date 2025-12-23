export type EventResponse = {
  id: number;
  title: string;
  description: string;
  location: string | null;
  isOnline: boolean;
  startDate: string;
  endDate: string;
  imageUrl?:string;
  capacity: number | null;
  price: number;
  createdAt: string;
  updatedAt: string;
};


export type ApiResponse<T> = {
  data: T;
  success:boolean;
  message:string;
  error: unknown;
};
