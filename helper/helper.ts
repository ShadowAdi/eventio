export function eventToFormValues(event: {
  title: string;
  description: string;
  location?: string | null;
  isOnline: boolean;
  startDate: string;
  endDate: string;
  imageUrl?: string | null;
  capacity: number | null;
  price: number;
}) {
  return {
    title: event.title,
    description: event.description,
    isOnline: event.isOnline,
    startDate: event.startDate,
    endDate: event.endDate,
    location: event.location ?? '',
    imageUrl: event.imageUrl ?? '',
    capacity: event.capacity?.toString() ?? '',
    price: event.price.toString(),
  };
}
