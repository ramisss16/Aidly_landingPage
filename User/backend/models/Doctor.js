const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    unique: true
  },

  clinicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Clinic",
    required: true
  },

 

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

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

  // CLOUDINARY FILE URLS
  photo: String,
  aadhaarDocument: String,
  panDocument: String,
  experienceCertificate: String,
  qualificationCertificate: String,

  consultationFee: Number,
  availableSlots: String,

  officialAddress: String,
  officialContact: String,
  officialEmail: String

}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);