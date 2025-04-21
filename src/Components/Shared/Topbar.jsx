/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BarsOutlined, BellFilled } from "@ant-design/icons";
import { Dropdown, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
import { useState } from "react";
// import user from "/images/user.png";
import { useUserProfileQuery } from "../../Redux/api/userApi";
import { getImageUrl } from "../../utils/baseUrl";
import { AllImages } from "../../../public/images/AllImages";

const notifications = [
  {
    id: 1,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
  {
    id: 2,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
  {
    id: 3,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
  {
    id: 4,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
  {
    id: 5,
    message: "Emily sent you a message.",
    time: "16 minutes ago",
  },
];

const Topbar = ({ collapsed, setCollapsed }) => {
  const { data: userProfile } = useUserProfileQuery();

  const user = userProfile?.data;
  // const [notificationCount, setNotificationCount] = useState(
  //   notifications.length
  // );

  const imageUrl = getImageUrl();

  // const handleMenuClick = () => {
  //   setNotificationCount(0); // Reset notification count when the menu is clicked
  // };

  // const notificationMenu = (
  //   <div
  //     className="flex flex-col gap-4 w-full text-center bg-white p-4 rounded-lg"
  //     onClick={handleMenuClick}
  //     style={{ boxShadow: "0px 0px 5px 2px #00000040" }}
  //   >
  //     {notifications.map((notification) => (
  //       <div className="test-start" key={notification.id}>
  //         <div className="flex gap-2">
  //           <BellFilled style={{ color: "#FF9500" }} />
  //           <div className="flex flex-col items-start">
  //             <p>{notification.message}</p>
  //             <p className="text-gray-400">{notification.time}</p>
  //           </div>
  //         </div>
  //       </div>
  //     ))}
  //     <Link
  //       to={"/notifications"}
  //       className="w-2/3 mx-auto bg-secondary-color !text-primary-color rounded h-8 py-1"
  //     >
  //       See More
  //     </Link>
  //   </div>
  // );
  return (
    <div className="py-2 mx-[-45px] flex justify-between items-center bg-[#222021] pt-4">
      <div className="flex items-center gap-2 text-base-color ml-4 ">
        <BarsOutlined
          onClick={() => setCollapsed(!collapsed)}
          className="text-3xl text-white"
        />
      </div>
      <div className="flex items-center justify-center px-10">
        {/* <Dropdown
          overlay={notificationMenu}
          trigger={["click"]}
          placement="bottomRight"
        >
          <BellFilled
            shape="circle"
            size="small"
            className="bg-[#F7F5F5] py-4 px-2 rounded shadow h-6 text-base font-bold text-[#FF9500]"
          />
        </Dropdown> */}
        <Link
          to="profile"
          className="flex items-center justify-center bg-transparent text-base-color border-0 rounded-lg h-8py-1"
        >
          <img
            // src={`${imageUrl}/${user?.image}`}
            src={AllImages.userImage}
            alt="profile_pic"
            style={{ width: "35px", height: "35px" }}
            className="rounded"
          />
          <p className="text-white text-lg ">{user?.fullName}</p>
        </Link>
      </div>
    </div>
  );
};
export default Topbar;
