
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import forgotPasswordImage from "../../../../assets/forgot-password.png";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleContinue = () => {
    setError("");

    if (step === 1) {
      if (!email.trim()) {
        setError("Please enter your email address.");
        return;
      }

      setStep(2);
    } else if (step === 2) {
      if (otp.length !== 4) {
        setError("Please enter the 4-digit verification code.");
        return;
      }

      setStep(3);
    } else if (step === 3) {
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      setStep(4);
    }
  };

  const titles = {
    1: "Forgot Password?",
    2: "Verification",
    3: "Create Password",
    4: "Password Changed!",
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-white via-[#C6EBE8] to-[#1A5F48]">
      <div className="w-full max-w-2xl rounded-sm bg-white p-7 shadow-md sm:p-8">
        <div className="mb-4 text-center">
          {step === 4 ? (
            <div className="mx-auto mb-6 flex h-36 w-36 items-center justify-center rounded-full border-[16px] border-green-500 bg-green-100 text-7xl font-bold text-green-600">
              ✓
            </div>
          ) : (
            <div className="mb-3 text-left">
              <button
                type="button"
                onClick={() => {
                  if (step === 1) {
                    navigate("/login");
                  } else {
                    setStep(step - 1);
                    setError("");
                  }
                }}
                className="text-3xl leading-none text-gray-800 hover:text-blue-600"
                aria-label="Go back"
              >
                ←
              </button>
            </div>
          )}

          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            {step === 4 ? (
              <>
                Password Changed!
                <span className="block">No Hassle Anymore</span>
              </>
            ) : (
              titles[step]
            )}
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            {step === 1 && "No worries, We got you."}
            {step === 2 && "Enter verification code to continue"}
            {step === 3 && "Create a unique and strong password."}
            {step === 4 && "Your Password Has Been Changed."}
          </p>

          {step === 3 && (
            <div className="mx-auto mt-5 flex h-16 w-20 items-center justify-center">
              <span className="text-6xl text-gray-800">🔒</span>
            </div>
          )}

          {step === 1 && (
            <img
              src={forgotPasswordImage}
              alt="Forgot password illustration"
              className="mx-auto mt-4 h-40 w-full object-contain"
            />
          )}
        </div>

        {error && (
          <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        {step === 1 && (
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              className="w-full border-0 border-b border-gray-400 bg-transparent px-0 py-3 outline-none focus:border-blue-500 focus:ring-0"
              required
            />
          </div>
        )}

        {step === 2 && (
          <div className="mt-6">
            <div className="mb-4 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl border-4 border-gray-800">
                <span className="text-4xl text-gray-800">✓</span>
              </div>

              <p className="text-sm text-gray-600">We sent a code to</p>
              <p className="font-semibold text-gray-800">{email}</p>
            </div>

            <div className="mt-5 flex justify-center gap-3">
              {[0, 1, 2, 3].map((index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={otp[index] || ""}
                  onChange={(e) => {
                    const digit = e.target.value.replace(/\D/g, "");
                    const updatedOtp = otp.split("");
                    updatedOtp[index] = digit;
                    setOtp(updatedOtp.join("").slice(0, 4));
                  }}
                  className="h-12 w-12 border-0 bg-[#89C9CA] text-center text-xl font-semibold text-gray-900 outline-none focus:ring-2 focus:ring-[#1A5F48]"
                  aria-label={`Verification digit ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setStep(1);
                setError("");
              }}
              className="mt-3 text-sm text-[#19674F] hover:underline"
            >
              Change email address
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {step !== 4 ? (
          <button
            type="button"
            onClick={handleContinue}
            className="mt-7 w-full rounded-lg bg-[#2586EA] py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            {step === 1
              ? "Send Code"
              : step === 2
                ? "Continue"
                : "Reset Password"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-7 w-full rounded-lg bg-[#2586EA] py-3 font-semibold text-white transition hover:bg-blue-600"
          >
            Continue
          </button>
        )}

        {step !== 4 && (
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-4 w-full text-sm text-gray-500 hover:underline"
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
