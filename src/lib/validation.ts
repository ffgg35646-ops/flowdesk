import { z } from "zod";



export const registerSchema = z.object({

  name: z
    .string()
    .min(2, "Name is required"),


  email: z
    .string()
    .email("Invalid email"),


  password: z
    .string()
    .min(8, "Password must be at least 8 characters"),


  companyName: z
    .string()
    .min(2, "Company name is required"),

});



export const loginSchema = z.object({

  email: z
    .string()
    .email("Invalid email"),


  password: z
    .string()
    .min(1, "Password is required"),

});



export const employeeSchema = z.object({

  name: z
    .string()
    .min(2),


  email: z
    .string()
    .email(),


  role: z.enum([
    "manager",
    "employee",
  ]),


  jobTitle: z
    .string()
    .optional(),

});



export const projectSchema = z.object({

  name: z
    .string()
    .min(2),


  description: z
    .string()
    .optional(),


  priority: z.enum([
    "low",
    "medium",
    "high",
    "urgent",
  ]).optional(),

});



export const taskSchema = z.object({

  title: z
    .string()
    .min(2),


  description: z
    .string()
    .optional(),


  priority: z.enum([
    "low",
    "medium",
    "high",
    "urgent",
  ]).optional(),

});
