import { useState, useEffect } from "react"; // Added useEffect
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Text from "@/components/shared/Text";
import Inputbox from "@/components/shared/Inputbox";
import Button from "@/components/shared/Button";
import AppIcon from "@/assets/images/AppIcon.svg";
import ShowSvg from "@/components/shared/ShowSvg";
import useLogin from "@/services/hooks/useLogin";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate(); // Initialize navigate
  const { handleLogin, isLoading, isSuccess } = useLogin(); // Assuming useLogin provides isSuccess

  // Redirect to dashboard if login is successful
  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard/overview");
    }
  }, [isSuccess, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin({ email, password, remember });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4 overflow-hidden"
      style={{ background: "#fff" }}
    >
      {/* Ambient gold glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "60vw",
          height: "60vw",
          maxWidth: "500px",
          maxHeight: "500px",
          background:
            "radial-gradient(circle, rgba(201,163,103,0.08) 0%, transparent 70%)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div className="relative w-full max-w-100">
        <div
          className="rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
          style={{
            background: "#fff",
            border: "1px solid rgba(201,163,103,0.15)",
            boxShadow:
              "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,163,103,0.08)",
          }}
        >
          {/* Top gold glow inside card */}
          <div
            className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%, rgba(201,163,103,0.1) 0%, transparent 70%)",
            }}
          />
          {/* Top accent line */}
          <div
            className="absolute top-0 left-8 right-8 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(201,163,103,0.5), transparent)",
            }}
          />

          <div className="flex justify-center mb-6 relative z-10">
            <div
              className="p-2 rounded-xl"
              style={{
                background: "rgba(201,163,103,0.1)",
                border: "1px solid rgba(201,163,103,0.2)",
                boxShadow: "0 4px 16px rgba(201,163,103,0.15)",
              }}
            >
              <ShowSvg icon={AppIcon} height={36} width={36} alt="App Logo" />
            </div>
          </div>

          <div className="text-center mb-8 relative z-10">
            <Text text="Welcome Back" color="text-black" />
            <p className="text-sm mt-3 text-black">
              Enter your details to manage ReCallPro
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            <Inputbox
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Inputbox
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex flex-row items-center justify-between gap-2 pt-1">
              <label className="flex items-center gap-2 cursor-pointer group select-none">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={() => setRemember(!remember)}
                    className="sr-only peer"
                  />
                  <div
                    className="w-4 h-4 rounded transition-all duration-200 flex items-center justify-center"
                    style={{
                      background: remember ? "#fff" : "#fff",
                      border: remember ? "1px solid #000" : "1px solid #000",
                      boxShadow: remember
                        ? "0 2px 8px rgba(201,163,103,0.35)"
                        : "none",
                    }}
                  >
                    {remember && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#1a0f00"
                        strokeWidth="4"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>
                <span
                  className="text-[11px] sm:text-xs font-medium whitespace-nowrap transition-colors"
                  style={{ color: "#000" }}
                >
                  Remember me
                </span>
              </label>

              {/* Use button or div for Forgot Password to handle navigate */}
              <button
                type="button"
                onClick={() => navigate("/dashboard/forgot-password")}
                className="text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-colors outline-none"
                style={{ color: "#89957F" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#89957F")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#89957F")}
              >
                Forgot Password?
              </button>
            </div>

            <div className="pt-2">
              <Button
                buttonText="Sign In"
                loading={isLoading}
                disabled={isLoading}
                bgColor="bg-[#89957F]"
              />
            </div>
          </form>
        </div>

        <p
          className="text-center text-[10px] sm:text-xs mt-10"
          style={{ color: "#000" }}
        >
          Protected by RobbyWork &mdash; All rights reserved
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
