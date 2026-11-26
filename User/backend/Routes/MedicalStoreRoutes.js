const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploads");
const {
  registerMedicalStore,
  resendMedicalStoreVerification,
  verifyMedicalStoreEmail,
  loginMedicalStore,
} = require("../Controllers/MedicalStoreController");

// Registration body (multipart/form-data):
// storeName, ownerName, email, phone, phoneVerificationToken, gstnumber, password,
// address, city, licenseNumber,
// licenseDocument (file, optional), storeLogo (file, optional)
router.post(
  "/register",
  upload.fields([
    { name: "licenseDocument", maxCount: 1 },
    { name: "storeLogo", maxCount: 1 },
  ]),
  registerMedicalStore,
);

router.post("/resend-verification", resendMedicalStoreVerification);
router.post("/verify-email", verifyMedicalStoreEmail);
router.post("/login", loginMedicalStore);

module.exports = router;
