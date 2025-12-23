
function toDateTimeLocal(value: string) {
  const date = new Date(value);
  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

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
    startDate: toDateTimeLocal(event.startDate),
    endDate: toDateTimeLocal(event.endDate),
    location: event.location ?? '',
    imageUrl: event.imageUrl ?? '',
    capacity: event.capacity?.toString() ?? '',
    price: event.price.toString(),
  };
}

