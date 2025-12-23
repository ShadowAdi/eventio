import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),

  isOnline: z.boolean(),

  location: z
    .string()
    .optional()
    .nullable(),

  imageUrl: z.string().optional().nullable(),

  startDate: z.string(),
  endDate: z.string(),

  capacity: z
    .number()
    .optional()
    .refine(
      (val) => val === null || (Number.isInteger(val) && val! > 0),
      { message: 'Capacity must be a positive integer' }
    ),

  price: z
    .number()
    .refine((val) => val >= 0, { message: 'Price must be >= 0' }),
})
  .refine(
    (data) => new Date(data.endDate) > new Date(data.startDate),
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  )
  .refine(
    (data) => data.isOnline || !!data.location,
    {
      message: "Location is required for offline events",
      path: ["location"],
    }
  );


export const updateEventSchema = createEventSchema.partial();


export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = Partial<CreateEventInput>;
