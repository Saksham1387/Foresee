import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3),
});


export const createEventSchema = z.object({
  title: z.string(),
  description: z.string(),
  expiresAt: z.string(),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const createOrderSchema = z.object({
  eventId: z.string(),
  orderType: z.enum(["MARKET", "LIMIT"]),
  outcome: z.enum(["YES", "NO"]),
  side: z.enum(["BUY", "SELL"]),
  quantity: z.number().positive(),
  price: z.number().positive().optional(), // Required for LIMIT orders
});

export const cancelOrderSchema = z.object({
  orderId: z.string(),
});

export type SignupSchema = z.infer<typeof signupSchema>;
export type SigninSchema = z.infer<typeof signinSchema>;
export type CreateOrderSchema = z.infer<typeof createOrderSchema>;
export type CancelOrderSchema = z.infer<typeof cancelOrderSchema>;