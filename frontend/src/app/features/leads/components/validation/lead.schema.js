import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(1, "Name is required"),

  phone: z
    .string()
    .regex(/^[0-9]{10}$/, "Phone must be 10 digits"),

  email: z
    .string()
    .email("Invalid email address"),

  // ✅ BEST WAY (auto converts string → number)
  budget: z.coerce.number().min(1, "Budget is required"),

  location: z.string().min(1, "Location is required"),

  propertyType: z.string().min(1, "Property type is required"),

  source: z.string().min(1, "Source is required"),
});