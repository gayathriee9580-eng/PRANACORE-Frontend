import React from "react";
import AuthLeftPanel from "./AuthLeftPanel";
import "./AuthLayout.css";

const AuthLayout = ({ children }) => {
  return (
    <section className="auth-layout">
      <div className="auth-layout-left">
        <AuthLeftPanel />
      </div>
      <div className="auth-layout-right">
        {children}
      </div>
    </section>
  );
};

export default AuthLayout;
