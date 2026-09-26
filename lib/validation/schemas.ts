import { z } from "zod";

export const RegisterSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name is too long").trim(),
  email: z.string().email("Invalid email address").toLowerCase().trim(),
  password: z.string().min(8, "Password must be at least 8 characters").max(100, "Password is too long"),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address").toLowerCase().trim(),
  password: z.string().min(1, "Password is required"),
});

export const ProjectSchema = z.object({
  toolSlug: z.string().min(1, "Tool slug is required").max(100),
  name: z.string().min(1, "Project name is required").max(100).trim(),
  input: z.string().max(500000, "Input payload exceeds size limit (500KB)"),
  output: z.string().max(500000, "Output payload exceeds size limit (500KB)"),
});

export const SubscriptionSchema = z.object({
  plan: z.enum(["free", "pro", "developer"]),
  paymentToken: z.string().optional(),
});
