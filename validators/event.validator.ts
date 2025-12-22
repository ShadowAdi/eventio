import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  location: z.string().optional().nullable(),
  isOnline: z.boolean().optional(),
  imageUrl: z.string().url().optional().nullable(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
  capacity: z.number().int().positive().optional().nullable(),
  price: z.number().nonnegative().optional(),
}).refine(
  (data) => new Date(data.endDate) > new Date(data.startDate),
  {
    message: "End date must be after start date",
    path: ["endDate"],
  }
);

export const updateEventSchema = createEventSchema.partial();

