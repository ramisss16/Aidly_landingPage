import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import api from "../../service/api";

const AdminPasswordRecovery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isResetPage = location.pathname.endsWith("/reset-password");
  const token = searchParams.get("token") || "";

  const [step, setStep] = useState(isResetPage ? 3 : 1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");

    if (step === 1) {
      if (!email.trim()) {
        setError("Please enter your email address.");
        return;
      }

      setLoading(true);
      try {
        const response = await api.post("/aidly-admin/forgot-password", {
          email: email.trim(),
        });
        setMessage(response.data.message);
        setStep(2);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Password recovery is temporarily unavailable. Please try again later."
        );
      } finally {
        setLoading(false);
      }
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/aidly-admin/reset-password", {
        token,
        password,
      });
      setMessage(response.data.message);
      setStep(4);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "Unable to reset the password right now. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const titles = {
    1: "Forgot Password?",
    2: "Check Your Email",
    3: "Create New Password",
    4: "Password Changed!",
  };

  const description = {
    1: "Enter your registered email address and we’ll send you a password reset link.",
    2: "If an active admin account matches that email, a password reset link has been sent. Follow the link in your email to continue.",
    3: "Choose a strong new password for your Aidly admin account.",
    4: "Your password has been changed successfully.",
  };

  const currentStep = isResetPage && !token ? 3 : step;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white via-[#C6EBE8] to-[#1A5F48] px-4 py-10">
      <section className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl sm:p-10">
        <header className="mb-8 text-center">
          {currentStep === 4 ? (
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600">
              ✓
            </div>
          ) : (
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#E0F5F3] text-3xl text-[#19674F]">
              {currentStep === 1 || currentStep === 2 ? "✉" : "🔒"}
            </div>
          )}

          <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
            {titles[currentStep]}
          </h1>
          <p className="mt-3 text-sm leading-6 text-gray-500">
            {description[currentStep]}
          </p>
        </header>

        {message && currentStep !== 2 && (
          <p
            role="status"
            className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-800"
          >
            {message}
          </p>
        )}

        {error && (
          <p
            role="alert"
            className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600"
          >
            {error}
          </p>
        )}

        {currentStep === 2 && (
          <p
            role="status"
            className="mb-4 rounded-lg bg-green-50 p-3 text-sm text-green-800"
          >
            {message}
          </p>
        )}

        {currentStep === 3 && !token ? (
          <p role="alert" className="mb-5 text-sm text-red-700">
            This reset link is missing its token. Request a new link to continue.
          </p>
        ) : (
          <form onSubmit={handleContinue}>
            {currentStep === 1 && (
              <div>
                <label
                  htmlFor="recovery-email"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="recovery-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your registered email"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#19674F]"
                  required
                />
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="new-password"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter new password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#19674F]"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Confirm new password"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#19674F]"
                    required
                  />
                </div>
              </div>
            )}

            {currentStep !== 2 && currentStep !== 4 && (
              <button
                type="submit"
                disabled={loading}
                className="mt-7 w-full rounded-lg bg-[#19674F] py-3 font-semibold text-white transition hover:bg-[#124B3A] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Please wait..."
                  : currentStep === 1
                    ? "Send Reset Link"
                    : "Reset Password"}
              </button>
            )}
          </form>
        )}

        {currentStep === 2 && (
          <button
            type="button"
            onClick={() => {
              setStep(1);
              setMessage("");
              setError("");
            }}
            className="mt-3 w-full text-sm text-[#19674F] hover:underline"
          >
            Use a different email address
          </button>
        )}

        {currentStep === 4 ? (
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-7 w-full rounded-lg bg-[#19674F] py-3 font-semibold text-white transition hover:bg-[#124B3A]"
          >
            Continue to Login
          </button>
        ) : (
          <button
            type="button"
            onClick={() =>
              currentStep === 3 && !token
                ? navigate("/admin/forgot-password")
                : navigate("/login")
            }
            className="mt-4 w-full text-sm text-gray-500 hover:underline"
          >
            {currentStep === 3 && !token ? "Request a New Link" : "Back to Login"}
          </button>
        )}
      </section>
    </main>
  );
};

export default AdminPasswordRecovery;
