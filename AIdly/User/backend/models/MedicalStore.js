const mongoose = require("mongoose");

const medicalStoreSchema = new mongoose.Schema({
  medicalStoreId: {
    type: String,
    required: true,
    unique: true
  },
  storeName: {
    type: String,
    required: true
  },
  ownerName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String,
    required: true
  },
  phoneVerified: {
    type: Boolean,
    default: false
  },
  gstnumber: {
    type: String,
    trim: true,
    uppercase: true,
    unique: true,
    sparse: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  emailVerificationCodeHash: {
    type: String,
    select: false
  },
  emailVerificationCodeExpires: {
    type: Date,
    select: false
  },
  emailVerificationCodeAttempts: {
    type: Number,
    default: 0,
    select: false
  },
  address: String,
  city: String,
  licenseNumber: String,
  
  // CLOUDINARY FILE URLS
  licenseDocument: String,
  storeLogo: String,

  isVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model("MedicalStore", medicalStoreSchema);
