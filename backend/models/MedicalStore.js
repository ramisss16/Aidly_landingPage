const mongoose = require("mongoose");

const medicalStoreSchema = new mongoose.Schema({
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
