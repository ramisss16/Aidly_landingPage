const client = require("../config/twilio");
const DEMO_OTP = process.env.BYPASS_OTP || "942506";

const isTwilioVerifyConfigured = () =>
  /^AC[0-9a-fA-F]{32}$/.test(process.env.TWILIO_ACCOUNT_SID || "") &&
  Boolean(process.env.TWILIO_AUTH_TOKEN) &&
  /^VA[0-9a-fA-F]{32}$/.test(
    process.env.TWILIO_VERIFY_SERVICE_SID || ""
  );

const sendOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: "Phone number required",
      });
    }

    if (process.env.OTP_BYPASS === "true") {
      return res.status(200).json({
        success: true,
        message: `Demo mode enabled. Use OTP ${DEMO_OTP}.`,
        mode: "bypass",
      });
    }

    if (!isTwilioVerifyConfigured()) {
      return res.status(503).json({
        success: false,
        message:
          "OTP service is not configured. Set valid Twilio Account, Auth Token, and Verify Service credentials in the backend environment.",
      });
    }

    try {
      // Try sending OTP through Twilio
      await client.verify.v2
        .services(process.env.TWILIO_VERIFY_SERVICE_SID)
        .verifications.create({
          to: phone,
          channel: "sms",
        });

      return res.status(200).json({
        success: true,
        message: "OTP sent successfully",
        mode: "twilio",
      });

    } catch (twilioError) {

      console.log("Twilio Send OTP Error:", twilioError.message);

      return res.status(500).json({
        success: false,
        message: `Twilio could not send the OTP: ${twilioError.message}`,
      });
    }

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====================== VERIFY OTP ======================
const verifyOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body || {};

    if (!phone || !otp) {
      return res.status(400).json({
        success: false,
        message: "Phone number and OTP are required.",
      });
    }

    // Demo OTP
    if (process.env.OTP_BYPASS === "true") {
      if (otp === DEMO_OTP) {
        return res.status(200).json({
          success: true,
          message: "OTP verified successfully",
        });
      }

      return res.status(400).json({
        success: false,
        message: "Invalid OTP for demo mode.",
      });
    }

    if (!isTwilioVerifyConfigured()) {
      return res.status(503).json({
        success: false,
        message:
          "OTP service is not configured. Set valid Twilio Account, Auth Token, and Verify Service credentials in the backend environment.",
      });
    }

    try {

      const verificationCheck = await client.verify.v2
        .services(process.env.TWILIO_VERIFY_SERVICE_SID)
        .verificationChecks.create({
          to: phone,
          code: otp,
        });

      if (verificationCheck.status === "approved") {
        return res.status(200).json({
          success: true,
          message: "OTP verified successfully",
        });
      }

      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });

    } catch (twilioError) {

      console.log("Twilio Verify Error:", twilioError.message);

      return res.status(500).json({
        success: false,
        message: `Twilio could not verify the OTP: ${twilioError.message}`,
      });
    }

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
};