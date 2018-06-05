const mongoose = require('mongoose');

const { Schema } = mongoose;

const volunteerSchema = new Schema(
  {
    name: { first: String, last: String },
    contact: { email: String, mobile: Number },
    location: { county: String, postcode: String },
    availability: [{ day: String, morning: Boolean, afternoon: Boolean }],
    notifications: { email: Boolean, mobile: Boolean },
    password: String,
    admin: Boolean,
  },
  { timestamps: true },
);

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = { Volunteer };