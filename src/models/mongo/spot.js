import Mongoose from "mongoose";

const { Schema } = Mongoose;

const spotSchema = new Schema({
  name: String,
  categorey: String,
  description: String,
  swimlistid: {
    type: Schema.Types.ObjectId,
    ref: "Swimlist",
  },
});

export const Spot = Mongoose.model("Spot", spotSchema);