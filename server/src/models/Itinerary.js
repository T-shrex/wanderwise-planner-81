const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    time: String,
    title: { type: String, required: true },
    location: String,
    notes: String,
  },
  { _id: false }
);

const daySchema = new mongoose.Schema(
  {
    day: Number,
    date: String,
    activities: [activitySchema],
  },
  { _id: false }
);

const itinerarySchema = new mongoose.Schema(
  {
    user: { type: String, required: true }, // Clerk userId
    destination: { type: String, required: true },
    startDate: String,
    endDate: String,
    budget: Number,
    travelStyle: String,
    travelers: Number,
    notes: String,
    days: [daySchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Itinerary", itinerarySchema);

