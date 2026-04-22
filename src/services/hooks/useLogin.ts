import { useState } from "react";
import toast from "react-hot-toast";

interface LoginForm {
  email: string;
  password: string;
  remember: boolean;
}

const TOKEN_KEY = "access_token_recall_pro_dashboard";


const DUMMY_CREDENTIALS = {
  email: "admin@robbywork.com",
  password: "password123",
  token: "dummy_token_robbywork_admin",
};

const useLogin = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

const handleLogin = async (_: LoginForm) => {
  setIsSuccess(false);
  setIsLoading(true);

  await new Promise((res) => setTimeout(res, 800));

  localStorage.setItem(TOKEN_KEY, DUMMY_CREDENTIALS.token);
  toast.success("Signed in successfully!");
  setIsSuccess(true);

  setIsLoading(false);
};

  return { handleLogin, isLoading, isSuccess };
};

export default useLogin;
