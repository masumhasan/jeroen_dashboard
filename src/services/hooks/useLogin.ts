import { useState } from "react";
import toast from "react-hot-toast";
import { API_BASE_URL } from "@/config/apiConfig";

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

const TOKEN_KEY = "access_token_recall_pro_dashboard";
const DASHBOARD_USER_KEY = "dashboard_user";

const useLogin = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (form: LoginForm) => {
    setIsSuccess(false);
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/auth/dashboard-signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg =
          json?.message ||
          json?.error ||
          (res.status === 403
            ? "This account cannot access the dashboard."
            : "Sign-in failed.");
        toast.error(typeof msg === "string" ? msg : "Sign-in failed.");
        return;
      }
      const data = json?.data;
      const token = data?.token;
      const user = data?.user;
      if (!token || !user) {
        toast.error("Invalid response from server.");
        return;
      }
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(DASHBOARD_USER_KEY, JSON.stringify(user));
      toast.success("Signed in successfully!");
      setIsSuccess(true);
    } catch {
      toast.error("Network error. Is the API running?");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, isLoading, isSuccess };
};

export default useLogin;
export { DASHBOARD_USER_KEY, TOKEN_KEY };
