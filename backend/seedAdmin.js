const mongoose = require("mongoose");
const Admin = require("./models/Admin");
require("dotenv").config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL_LOCAL);
    console.log("Connected to MongoDB");

    const recoveryEmail = process.env.AIDLY_ADMIN_EMAIL?.trim().toLowerCase();
    const adminExists = await Admin.findOne({
      adminId: "AIDLY001"
    });

    if (adminExists) {
      if (recoveryEmail && adminExists.email !== recoveryEmail) {
        adminExists.email = recoveryEmail;
        await adminExists.save();
        console.log("Admin recovery email updated");
      } else {
        console.log("Admin already exists");
      }
      process.exit();
    }

    const admin = new Admin({
      name: "System Admin",
      adminId: "AIDLY001",
      email: recoveryEmail,
      password: "adminpassword123",
      role: "aidlyAdmin"
    });

    await admin.save();

    console.log("Aidly Admin created");
    console.log("Admin ID: AIDLY001");
    console.log("Password: adminpassword123");

    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedAdmin();