import ResetPasswordClientComponent from "../../../../components/authentication/pages/reset-password";

const ResetPassword = ({ params: { locale } }) => {
  return <ResetPasswordClientComponent locale={locale} />;
};

export default ResetPassword;
