const express = require("express");
const router = express.Router();

const adminController = require("../Controllers/AidlyAdminController");
const forgetPasswordController = require("../Controllers/ForgetPasswordController");
const adminAuth = require("../middleware/adminAuth");

// Public route
router.post("/login", adminController.adminLogin);
router.post("/forgot-password", forgetPasswordController.requestPasswordReset);
router.post(
  "/verify-reset-code",
  forgetPasswordController.verifyPasswordResetCode
);
router.post("/reset-password", forgetPasswordController.resetPassword);

// Protected routes
router.get("/dashboard", adminAuth, adminController.getDashboardStats);
router.get("/:entity", adminAuth, adminController.getEntities);
router.get("/:entity/:id", adminAuth, adminController.getEntityById);
router.delete("/:entity/:id", adminAuth, adminController.deleteEntity);

module.exports = router;
