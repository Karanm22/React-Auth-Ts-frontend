import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./auth/RequireAuth";
import EmailVerification from "./pages/EmailVerification";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Login from "./pages/Login";
import PasswordReset from "./pages/PasswordReset";
import PleaseVerifyEmailPage from "./pages/PleaseVerifyEmailPage";

import SignUp from "./pages/SignUp";
import UserInfo from "./pages/UserInfo";

const RootRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route
        path="/"
        element={
          <RequireAuth redirectTo="/login">
            <UserInfo />
          </RequireAuth>
        }
      />
      <Route path="/verify-email/:verificationString" element={<EmailVerification />} />
      <Route path="/please-verify" element={<PleaseVerifyEmailPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:passwordResetCode" element={<PasswordReset />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RootRoutes;
