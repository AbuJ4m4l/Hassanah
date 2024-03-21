import React from "react";
import ChangeAccountDetailsClientPage from "../../../../components/authentication/pages/change-account-details";

const ChangeAccountDetails = ({ params: { locale } }) => {
  return <ChangeAccountDetailsClientPage locale={locale} />;
};

export default ChangeAccountDetails;
