const express = require("express");
const router = express.Router();

const {
  markAttendance,
  markBulkAttendance,
  getAttendance,
  getAttendanceByDate,
  getAllStaff,
} = require("../Controllers/attendanceController");
// 🔹 Single attendance
router.post("/mark", markAttendance);

// 🔥 Bulk attendance (main UI)
router.post("/bulk", markBulkAttendance);

// 🔹 Get attendance for a specific day
router.get("/day/:clinicId", getAttendanceByDate);

router.get("/staff/:clinicId", getAllStaff);
// 🔹 Monthly attendance
router.get("/:clinicId", getAttendance);

module.exports = router;
