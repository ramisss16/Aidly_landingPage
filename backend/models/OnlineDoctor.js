const mongoose = require("mongoose");

const onlineDoctorSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    unique: true
  },

  name: String,

  email: {
    type: String,
    unique: true
  },

  phone: String,
  password: String,

  resetPasswordToken: {
    type: String,
    select: false,
  },
  resetPasswordExpires: {
    type: Date,
    select: false,
  },
  passwordResetCodeHash: {
    type: String,
    select: false,
  },
  passwordResetCodeExpires: {
    type: Date,
    select: false,
  },
  passwordResetCodeAttempts: {
    type: Number,
    default: 0,
    select: false,
  },

  specialization: String,
  consultationFee: Number,

  availableSlots: [String],

  // CLOUDINARY FILE URLS
  photo: String,
  aadhaarDocument: String,
  panDocument: String,
  experienceCertificate: String,
  licenseCertificate: String

}, { timestamps: true });

module.exports = mongoose.model("OnlineDoctor", onlineDoctorSchema);