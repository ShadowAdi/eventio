import z from "zod";

export const eventSchema = z.object({
    title: z.string()
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must be less than 100 characters'),
    description: z.string()
        .min(10, 'Description must be at least 10 characters')
        .max(1000, 'Description must be less than 1000 characters'),
    location: z.string().optional(),
    isOnline: z.boolean().default(false),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().min(1, 'End date is required'),
    imageUrl: z.string()
        .url('Please enter a valid URL')
        .optional()
        .or(z.literal('')),
    capacity: z.string()
        .optional()
        .refine((val) => !val || (!isNaN(parseInt(val)) && parseInt(val) > 0), {
            message: 'Capacity must be a positive number'
        }),
    price: z.string()
        .optional()
        .refine((val) => !val || !isNaN(parseFloat(val)), {
            message: 'Price must be a valid number'
        })
}).refine((data) => {
    if (!data.isOnline && (!data.location || data.location.trim().length === 0)) {
        return false;
    }
    return true;
}, {
    message: 'Location is required for in-person events',
    path: ['location']
}).refine((data) => {
    if (data.startDate && data.endDate) {
        return new Date(data.endDate) >= new Date(data.startDate);
    }
    return true;
}, {
    message: 'End date must be after start date',
    path: ['endDate']
});