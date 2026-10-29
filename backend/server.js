require('dotenv').config({ path: require('node:path').join(__dirname, '.env') });

const express = require('express');
const app = express();
const connectDB = require('./db');

const bodyParser = require('body-parser'); 
const cors = require('cors');



const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "https://statuesque-praline-44625f.netlify.app",
  "https://grand-frangollo-d9383c.netlify.app"
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// ROUTES
const hospitalRoutes = require('./Routes/HospitalRoutes');
const ambulanceRoutes = require('./Routes/AmbulanceRoutes');
const hospitalAmbulanceRoutes = require("./Routes/HospitalAmbulanceRoutes");
const privateAmbulanceRoutes = require("./Routes/PrivateAmbulanceRoutes");
const patientRoutes = require('./Routes/patientRoutes');
const clinicRoutes = require("./Routes/ClinicRoutes");
const appointmentRoutes = require("./Routes/appointmentRoutes");
const prescriptionRoutes = require("./Routes/prescriptionRoutes");
const attendanceRoutes = require("./Routes/attendanceRoutes");
const onlineDoctorRoutes = require("./Routes/onlineDoctorRoutes");
const authRoutes = require("./Routes/authRoutes");
const aidlyAdminRoutes = require("./Routes/AidlyAdminRoutes");
const forgetPasswordController = require("./Controllers/ForgetPasswordController");


//  CLEAN PREFIXES
app.use("/api/hospital", hospitalRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/ambulance", ambulanceRoutes);

app.use("/api/attendance", attendanceRoutes);
app.use("/api/hospital-ambulance", hospitalAmbulanceRoutes);
app.use("/api/private-ambulance", privateAmbulanceRoutes);

const otpRoutes = require("./Routes/otpRoutes");
// MAIN MODULE (IMPORTANT)
app.use("/api/clinic", clinicRoutes);


// OPTIONAL (later phase)
app.use("/api/appointments", appointmentRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/online-doctor", onlineDoctorRoutes);

app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/aidly-admin", aidlyAdminRoutes);
app.post("/api/forgot-password", forgetPasswordController.requestPasswordReset);
app.post(
  "/api/verify-reset-code",
  forgetPasswordController.verifyPasswordResetCode
);
app.post("/api/reset-password", forgetPasswordController.resetPassword);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error('Failed to start server:', error.message);
  process.exitCode = 1;
});