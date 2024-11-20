import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  userId: Schema.Types.ObjectId; 
  type: "new_message"; 
  content: string; 
  isRead: boolean; 
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema: Schema<INotification> = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["new_message"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<INotification>("Notification", NotificationSchema);
