import { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppIcon from "@/assets/images/AppIcon.svg";
import ShowSvg from "@/components/shared/ShowSvg";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgetPasswordPage"));
const VerifyCodePage = lazy(() => import("./pages/VerifyCodePage"));
const SetNewPasswordPage = lazy(() => import("./pages/SetNetPassword"));
const Layout = lazy(() => import("./pages/Layout"));
const OverViewPage = lazy(() => import("./pages/OverViewPage"));
const EditProfilePage = lazy(() => import("./pages/EditProfilePage"));
const AboutUsPage = lazy(() => import("./pages/AboutUsPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsAndConditionsPage = lazy(
  () => import("./pages/TermsAndConditionsPage"),
);
const PremiumUsersPage = lazy(() => import("./pages/PremiumUsersPage"));
const UsersManagementPage = lazy(() => import("./pages/UserManagementPage"));
const RecipeManagementPage = lazy(() => import("./pages/RecipeManagementPage"));
const InboxPage = lazy(() => import("./pages/InboxPage")); // ← new

const TOKEN_KEY = "access_token_recall_pro_dashboard";
const getToken = () => localStorage.getItem(TOKEN_KEY);

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  return getToken() ? (
    <>{children}</>
  ) : (
    <Navigate to="/dashboard/login" replace />
  );
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  return getToken() ? (
    <Navigate to="/dashboard/overview" replace />
  ) : (
    <>{children}</>
  );
};

const PageLoader = () => {
  const [status, setStatus] = useState("Initializing");

  useEffect(() => {
    const messages = [
      "Booting System",
      "Verifying Session",
      "Loading Assets",
      "Securing Connection",
    ];
    let i = 0;
    const interval = setInterval(() => {
      setStatus(messages[i % messages.length]);
      i++;
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "#ffffff" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(137,149,127,0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "400px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(137,149,127,0.12) 0%, transparent 70%)",
          animation: "pulse-glow 3s ease-in-out infinite",
        }}
      />
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "200px",
          height: "200px",
          background:
            "radial-gradient(circle, rgba(137,149,127,0.07) 0%, transparent 70%)",
          animation: "pulse-glow 2s ease-in-out infinite reverse",
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-10">
          <div
            className="absolute rounded-full animate-ping"
            style={{
              inset: "-16px",
              border: "1px solid rgba(137,149,127,0.2)",
              animationDuration: "2s",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              inset: "-8px",
              border: "1px solid rgba(137,149,127,0.25)",
            }}
          />
          <div
            className="relative p-4 rounded-2xl"
            style={{
              background: "rgba(137,149,127,0.08)",
              border: "1.5px solid rgba(137,149,127,0.25)",
              boxShadow:
                "0 0 32px rgba(137,149,127,0.15), 0 4px 16px rgba(0,0,0,0.06)",
              animation: "float 3s ease-in-out infinite",
            }}
          >
            <ShowSvg icon={AppIcon} width={48} height={48} alt="RobbyWork" />
          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] uppercase tracking-[0.4em] font-bold"
              style={{
                color: "#89957F",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            >
              {status}
            </span>
            <span className="text-[10px]" style={{ color: "#d1d5db" }}>
              ...
            </span>
          </div>
          <div
            className="w-48 h-0.5 rounded-full overflow-hidden"
            style={{ background: "#f3f4f6" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, #89957F, #a8b49e, transparent)",
                backgroundSize: "200% 100%",
                animation: "loading-sweep 1.8s linear infinite",
              }}
            />
          </div>
          <div className="flex gap-1.5 mt-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full"
                style={{
                  background: "#89957F",
                  animation: "dot-bounce 1.2s ease-in-out infinite",
                  animationDelay: `${i * 0.2}s`,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.05); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        @keyframes loading-sweep {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes dot-bounce {
          0%, 80%, 100% { transform: translateY(0);    opacity: 0.4; }
          40%            { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            color: "#000",
            padding: "12px 20px",
            fontSize: "14px",
            borderRadius: "12px",
            fontWeight: "500",
          },
        }}
      />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/dashboard/login" replace />}
          />

          <Route
            path="/dashboard/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard/forgot-password"
            element={
              <PublicRoute>
                <ForgotPasswordPage />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard/verify-otp"
            element={
              <PublicRoute>
                <VerifyCodePage />
              </PublicRoute>
            }
          />
          <Route
            path="/dashboard/set-newpassword"
            element={
              <PublicRoute>
                <SetNewPasswordPage />
              </PublicRoute>
            }
          />

          <Route
            path="/dashboard/overview"
            element={
              <PrivateRoute>
                <Layout>
                  <OverViewPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/edit-profile"
            element={
              <PrivateRoute>
                <Layout>
                  <EditProfilePage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/about-us"
            element={
              <PrivateRoute>
                <Layout>
                  <AboutUsPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/privacy-policy"
            element={
              <PrivateRoute>
                <Layout>
                  <PrivacyPolicyPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/terms-conditions"
            element={
              <PrivateRoute>
                <Layout>
                  <TermsAndConditionsPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/premium-users"
            element={
              <PrivateRoute>
                <Layout>
                  <PremiumUsersPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/user-management"
            element={
              <PrivateRoute>
                <Layout>
                  <UsersManagementPage />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard/recipe-management"
            element={
              <PrivateRoute>
                <Layout>
                  <RecipeManagementPage />
                </Layout>
              </PrivateRoute>
            }
          />

          {/* ← new inbox route */}
          <Route
            path="/dashboard/inbox"
            element={
              <PrivateRoute>
                <Layout>
                  <InboxPage />
                </Layout>
              </PrivateRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to="/dashboard/login" replace />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
}
