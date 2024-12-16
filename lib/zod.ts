import * as z from "zod";

export const requestSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    age: z.number().min(1, "Age must be greater than 0."),
    address: z.string().min(5, "Address must be at least 5 characters."),
    phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits."),
    story: z.string().min(10, "Story must be at least 10 words."),
    amount: z.number().min(1, "Amount must be greater than 0."),
    category: z.string().nonempty("Category is required."),
});
