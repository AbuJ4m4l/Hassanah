import UserForm from "../../../../components/authentication/form/index.jsx";

const Signup = ({ params: { locale } }) => {
  return <UserForm locale={locale} tab="signup" />;
};

export default Signup;
