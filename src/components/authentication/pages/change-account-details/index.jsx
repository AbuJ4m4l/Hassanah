"use client";
import ChangeAccountDetailsForm from "../../form/ChangeAccountDetails";

const ChangeAccountDetailsClientPage = ({ locale }) => {
  return (
    <ChangeAccountDetailsForm
      locale={locale}
      className="flex flex-col mt-10 mx-auto items-center w-[340px]"
    />
  );
};

export default ChangeAccountDetailsClientPage;
