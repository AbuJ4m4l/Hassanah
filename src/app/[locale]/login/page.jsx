"use client";

import UserForm from "../../../components/authentication/form/index.jsx";

const Login = ({ params: { locale } }) => {

  return (
    <UserForm locale={locale} tab="login" />
  )
}

export default Login;
