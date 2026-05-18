const Admin = require("../models/Admin");
const Clinic = require("../models/Clinic");
const Hospital = require("../models/Hospital");
const Doctor = require("../models/Doctor");
const OnlineDoctor = require("../models/OnlineDoctor");
const Manager = require("../models/Manager");
const Receptionist = require("../models/Receptionist");
const PrivateAmbulance = require("../models/PrivateAmbulance");
const HospitalAmbulance = require("../models/HospitalAmbulance");
const MedicalStore = require("../models/MedicalStore");
const { generateToken } = require("../middleware/jwt");

const entityModelMap = {
  "admins": Admin,
  "managers": Manager,
  "doctors": Doctor,
  "receptionists": Receptionist,
  "clinics": Clinic,
  "hospitals": Hospital,
  "online-doctors": OnlineDoctor,
  "private-ambulances": PrivateAmbulance,
  "hospital-ambulances": HospitalAmbulance,
  "medical-stores": MedicalStore
};

// Admin Login
exports.adminLogin = async (req, res) => {
  try {
    const { adminId, password } = req.body;

    const admin = await Admin.findOne({ adminId });

    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({
        error: "Invalid Admin ID or Password"
      });
    }

    const token = generateToken({
      id: admin._id,
      adminId: admin.adminId,
      role: "aidlyAdmin"
    });

    res.json({
      token,
      admin: {
        name: admin.name,
        adminId: admin.adminId,
        role: "aidlyAdmin"
      }
    });

  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
};
// Dashboard Stats
exports.getDashboardStats = async (req, res) => {
  try {
    const stats = {};
    for (const [key, model] of Object.entries(entityModelMap)) {
      stats[key] = await model.countDocuments();
    }
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Generic List API
exports.getEntities = async (req, res) => {
  try {
    const { entity } = req.params;
    const { page = 1, limit = 10, search = "" } = req.query;
    const Model = entityModelMap[entity];

    if (!Model) return res.status(404).json({ error: "Entity not found" });

    let query = {
  isActive: { $ne: false }
};
    // Search logic
    if (search) {
      const searchFields = ["name", "clinicName", "hospitalname", "storeName", "ownerName", "email", "phone", "adminName"];
      query.$or = searchFields.map(field => ({ [field]: { $regex: search, $options: "i" } }));
    }

    const totalRecords = await Model.countDocuments(query);
    const data = await Model.find(query)
      .select("-password") // Security: Never return passwords
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json({
      data,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: parseInt(page),
      totalRecords
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Generic Detail API
exports.getEntityById = async (req, res) => {
  try {
    const { entity, id } = req.params;
    const Model = entityModelMap[entity];
    if (!Model) return res.status(404).json({ error: "Entity not found" });

    const data = await Model.findById(id).select("-password");
    if (!data) return res.status(404).json({ error: "Record not found" });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Generic Soft Delete API (Deactivate)
exports.deleteEntity = async (req, res) => {
  try {
    const { entity, id } = req.params;

    const Model = entityModelMap[entity];

    if (!Model) {
      return res.status(404).json({
        error: "Entity not found",
      });
    }

    const deleted = await Model.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        error: "Record not found",
      });
    }

    res.json({
      message: "Record deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
