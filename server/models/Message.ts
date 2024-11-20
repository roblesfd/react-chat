import mongoose, { Schema } from "mongoose";

interface IMessage {
  id: string;
  type: "recipient" | "sender";
  content: string;
  author: Schema.Types.ObjectId;
  createdAt: string;
  conversation: Schema.Types.ObjectId;
  replyOfMessage: string;
  reactions: unknown[];
  isReply: boolean;
  messageToReply: string;
  isEdited: boolean;
}


const MessageSchema: Schema<IMessage> = new mongoose.Schema(
  {
    type: { type: String, required: true, default: "sender" },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref:"User", required: true },
    conversation: {type: Schema.Types.ObjectId, ref:"Conversation"},
    reactions: [{type: String}],
    isReply: {type: Boolean, default:false},
    replyOfMessage:{type:String},
    isEdited: {type: Boolean, default:false},
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

MessageSchema.virtual('id').get(function() {
  return this._id.toString();
})

export default mongoose.model<IMessage>("Message", MessageSchema);
