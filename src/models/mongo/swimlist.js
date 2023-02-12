import Mongoose from "mongoose";

const { Schema } = Mongoose;

const swimlistSchema = new Schema({
  title: String,
  userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Swimlist = Mongoose.model("Swimlist", swimlistSchema);