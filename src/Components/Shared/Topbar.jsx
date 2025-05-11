/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BarsOutlined, BellFilled } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useUserProfileQuery } from "../../Redux/api/userApi";
import { getImageUrl } from "../../utils/baseUrl";
import { AllImages } from "../../../public/images/AllImages";

const Topbar = ({ collapsed, setCollapsed }) => {
  const { data: userProfile } = useUserProfileQuery();

  const user = userProfile?.data;

  const imageUrl = getImageUrl();

  return (
    <div className="py-2 mx-[-45px] flex justify-between items-center bg-[#0080FF] pt-4">
      <div className="flex items-center gap-2 text-base-color ml-4 ">
        <BarsOutlined
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl text-white"
        />
      </div>
      <div className="flex items-center justify-center px-10">
        <Link
          to="profile"
          className="flex items-center gap-2 justify-center bg-transparent text-base-color border-0 rounded-lg h-8 py-1"
        >
          <img
            src={`${imageUrl}/${user?.image}`}
            alt="profile_pic"
            style={{ width: "35px", height: "35px" }}
            className="rounded-full"
          />
          <p className="text-white text-lg ">{user?.fullName}</p>
        </Link>
      </div>
    </div>
  );
};
export default Topbar;
