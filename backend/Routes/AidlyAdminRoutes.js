const express = require("express");
const router = express.Router();

const adminController = require("../controllers/AidlyAdminController");
const adminAuth = require("../middleware/adminAuth");

// Public route
router.post("/login", adminController.adminLogin);

// Protected routes
router.use(adminAuth);

router.get("/dashboard", adminController.getDashboardStats);
router.get("/:entity", adminController.getEntities);
router.get("/:entity/:id", adminController.getEntityById);
router.delete("/:entity/:id", adminController.deleteEntity);

module.exports = router;