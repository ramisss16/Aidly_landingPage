const mongoose = require("mongoose");

const privateAmbulanceSchema = new mongoose.Schema(
  {
    privateAmbulanceId: {
      type: String,
      unique: true
    },

    ownerName: {
      type: String,
      required: true,
      trim: true
    },

    driverName: {
      type: String,
      required: true,
      trim: true
    },

    phoneNumber: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/
    },

    email: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
      sparse: true
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

    otpVerified: {
      type: Boolean,
      default: false
    },

    ownerAddress: {
      type: String,
      required: true
    },

    driverPhoto: {
      type: String
    },

     driverLicense: {
      type: String
    },
    
    driverIdProof: {
      type: String
    },

    ambulanceType: {
      type: String,
      enum: ["Basic", "ICU", "Oxygen"],
      required: true
    },

    vehicleNumber: {
      type: String,
      required: true,
      unique: true
    },

    vehicleRegistrationLicenseNumber: {
      type: String,
      required: true
    },

    vehicleRegistrationCertificate: {
      type: String
    },

    vehiclePhoto: {
      type: String
    },

    password: {
      type: String,
      required: true
    },

    availability: {
      type: String,
      enum: ["Available", "Busy", "Offline"],
      default: "Available"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "PrivateAmbulance",
  privateAmbulanceSchema
);