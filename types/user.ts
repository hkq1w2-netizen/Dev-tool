export type UserRole = "user" | "admin";
export type SubscriptionPlan = "free" | "pro" | "developer";
export type SubscriptionStatus = "active" | "canceled" | "past_due" | "trialing" | "none";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  plan: SubscriptionPlan;
  subscriptionStatus: SubscriptionStatus;
  emailVerified: boolean;
}

export interface UserProfile extends UserSession {
  avatar?: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt?: string;
}
