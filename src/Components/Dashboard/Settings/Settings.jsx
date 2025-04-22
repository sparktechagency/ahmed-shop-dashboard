import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  const navigateToAbout = () => {
    navigate("/about-us");
  };

  const navigateToChangePass = () => {
    navigate("/change-password");
  };

  const navigateToTerms = () => {
    navigate("/terms-and-conditions");
  };
  const navigateToPrivacyPolicy = () => {
    navigate("/privacy-policy");
  };
  const navigateToFAQ = () => {
    navigate("/frequently-asked-questions");
  };

  return (
    <div className="h-screen flex flex-col gap-3 p-10 w-1/2">
      <div
        onClick={navigateToChangePass}
        className="flex items-center justify-between hover:cursor-pointer p-6 bg-[#5396c2] hover:bg-[#0080FF] rounded-lg text-white"
      >
        <p className="font-medium">Change Password</p>
        <IoIosArrowForward className="font-medium text-lg" />
      </div>
      <div
        onClick={navigateToAbout}
        className="flex items-center justify-between hover:cursor-pointer p-6 bg-[#5396c2] hover:bg-[#0080FF] rounded-lg text-white"
      >
        <p className="font-medium">About Us</p>
        <IoIosArrowForward className="font-medium text-lg" />
      </div>

      <div
        onClick={navigateToTerms}
        className="flex items-center justify-between hover:cursor-pointer p-6 bg-[#5396c2] hover:bg-[#0080FF] rounded-lg text-white"
      >
        <p className="font-medium">Terms & Conditions</p>
        <IoIosArrowForward className="font-medium text-lg" />
      </div>
      <div
        onClick={navigateToPrivacyPolicy}
        className="flex items-center justify-between hover:cursor-pointer p-6 bg-[#5396c2] hover:bg-[#0080FF] rounded-lg text-white"
      >
        <p className="font-medium">Privacy Policy</p>
        <IoIosArrowForward className="font-medium text-lg" />
      </div>
      <div
        onClick={navigateToFAQ}
        className="flex items-center justify-between hover:cursor-pointer p-6 bg-[#5396c2] hover:bg-[#0080FF] rounded-lg text-white"
      >
        <p className="font-medium">FAQ</p>
        <IoIosArrowForward className="font-medium text-lg" />
      </div>
    </div>
  );
};

export default Settings;
