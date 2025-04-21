import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const navigatePersonalInfo = () => {
    navigate("/profile");
  };

  const navigateToChangePass = () => {
    navigate("/settings/change-password");
  };

  const navigateToTerms = () => {
    navigate("/terms-and-conditions");
  };

  return (
    <div className="h-screen flex flex-col gap-3 p-10 w-1/2">
      <div
        onClick={navigatePersonalInfo}
        className="flex items-center justify-between hover:cursor-pointer p-6 bg-[#c6ddd9] rounded-lg"
      >
        <p className="font-medium">Personal Information</p>
        <IoIosArrowForward className="font-medium text-lg" />
      </div>

      <div
        onClick={navigateToChangePass}
        className="flex items-center justify-between hover:cursor-pointer p-6 bg-[#c6ddd9] rounded-lg"
      >
        <p className="font-medium">Change Password</p>
        <IoIosArrowForward className="font-medium text-lg" />
      </div>

      <div
        onClick={navigateToTerms}
        className="flex items-center justify-between hover:cursor-pointer p-6 bg-[#c6ddd9] rounded-lg"
      >
        <p className="font-medium">Terms & Conditions</p>
        <IoIosArrowForward className="font-medium text-lg" />
      </div>
    </div>
  );
};

export default Settings;