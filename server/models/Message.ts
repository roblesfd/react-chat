import mongoose, { Schema } from "mongoose";

interface IMessage {
  id: string;
  content: string;
  author: Schema.Types.ObjectId;
  createdAt: string;
  conversation: Schema.Types.ObjectId;
  replyOfMessage: string;
  reactions: unknown[];
  isReply: boolean;
  isEdited: boolean;
}

const MessageSchema: Schema<IMessage> = new mongoose.Schema(
  {
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref:"User", required: true },
    conversation: {type: Schema.Types.ObjectId, ref:"Conversation", required: true },
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
