import mongoose from "mongoose";

const conservationSchema = mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timeStamps: true }
);

const Conservation = mongoose.model("Conservation", conservationSchema);
export default Conservation