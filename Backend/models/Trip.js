 import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({

  userEmail: {
    type: String,
    required: true
  },

  fromCity: {
    type: String,
    required: true
  },

  toCity: {
    type: String,
    required: true
  },

  startDate: {
    type: String,
    required: true
  },

  endDate: {
    type: String,
    required: true
  },

  tripType: {
    type: String
  },

  tripOption: {     // THIS WAS MISSING
    type: String
  },
  status: {
    type: String,
    default: " "
  },

  image: {
    type: String
  }

}, { timestamps: true });

export default mongoose.model("Trip", tripSchema);