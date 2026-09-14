import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHistory extends Document {
  userId: mongoose.Types.ObjectId;
  toolSlug: string;
  action: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

const HistorySchema = new Schema<IHistory>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    toolSlug: { type: String, required: true, index: true },
    action: { type: String, required: true },
    metadata: { type: Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now, expires: "30d" },
  },
  { timestamps: true }
);

export const History: Model<IHistory> =
  mongoose.models.History || mongoose.model<IHistory>("History", HistorySchema);
