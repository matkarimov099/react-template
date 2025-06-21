import {z} from "zod";

export const userCreateSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 characters"),
    age: z.coerce
        .number()
        .min(16, "Age must be at least 16")
        .max(120, "Age must be less than 120"),
});
