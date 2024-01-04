import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";
import AccountSideNav from "../components/AccountSideNav/AccountSideNav";
import Header from "../components/Header/Header";
import RegisterForm from "../components/RegisterForm/RegisterForm";
function Login() {
  return (
    <>
      <Header />
      <AccountSideNav index={1}>
        <LoginForm />
        <div className="d-lg-none d-md-none d-sm-block">
          <RegisterForm />
        </div>
      </AccountSideNav>
    </>
  );
}

export default Login;
