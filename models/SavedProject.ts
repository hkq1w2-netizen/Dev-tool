import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISavedProject extends Document {
  userId: mongoose.Types.ObjectId;
  toolSlug: string;
  name: string;
  input: string;
  output: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const SavedProjectSchema = new Schema<ISavedProject>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
    toolSlug: { type: String, required: true, index: true },
    name: { type: String, required: true },
    input: { type: String, default: "" },
    output: { type: String, default: "" },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const SavedProject: Model<ISavedProject> =
  mongoose.models.SavedProject || mongoose.model<ISavedProject>("SavedProject", SavedProjectSchema);
