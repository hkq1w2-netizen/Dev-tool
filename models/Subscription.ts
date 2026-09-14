import mongoose, { Schema, Document, Model } from "mongoose";
import { SubscriptionPlan, SubscriptionStatus } from "@/types/user";

export interface ISubscription extends Document {
  userId: mongoose.Types.ObjectId;
  provider: string;
  customerId: string;
  subscriptionId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const SubscriptionSchema = new Schema<ISubscription>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
    provider: { type: String, default: "generic" },
    customerId: { type: String, default: "" },
    subscriptionId: { type: String, default: "" },
    plan: { type: String, enum: ["free", "pro", "developer"], default: "free" },
    status: { type: String, enum: ["active", "canceled", "past_due", "trialing", "none"], default: "none" },
    currentPeriodStart: { type: Date },
    currentPeriodEnd: { type: Date },
  },
  { timestamps: true }
);

export const Subscription: Model<ISubscription> =
  mongoose.models.Subscription || mongoose.model<ISubscription>("Subscription", SubscriptionSchema);
