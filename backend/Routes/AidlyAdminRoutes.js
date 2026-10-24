const express = require("express");
const router = express.Router();

const adminController = require("../Controllers/AidlyAdminController");
const forgetPasswordController = require("../Controllers/ForgetPasswordController");
const adminAuth = require("../middleware/adminAuth");

// Public route
router.post("/login", adminController.adminLogin);
router.post("/forgot-password", forgetPasswordController.requestPasswordReset);
router.post("/reset-password", forgetPasswordController.resetPassword);

// Protected routes
router.use(adminAuth);

router.get("/dashboard", adminController.getDashboardStats);
router.get("/:entity", adminController.getEntities);
router.get("/:entity/:id", adminController.getEntityById);
router.delete("/:entity/:id", adminController.deleteEntity);

module.exports = router;
