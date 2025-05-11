/* eslint-disable no-unused-vars */
import { Form, Input, Typography } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getImageUrl } from "../../utils/baseUrl";
import { AllImages } from "../../../public/images/AllImages";
import { useUserProfileQuery } from "../../Redux/api/userApi";

const Profile = () => {
  const { data: userProfile, refetch } = useUserProfileQuery();
  const profile = userProfile?.data;
  console.log("userProfile", profile);
  const imageUrl = getImageUrl();

  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
  });

  const handleEditClick = () => {
    navigate("edit-profile", { state: { profileData } });
  };

  return (
    <div className="bg-[#cde5fd] min-h-[90vh] flex justify-center py-20">
      <div className="py-10 text-base-color rounded-lg h-full w-full lg:w-[70%]">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-8">
            {profile?.image ? (
              <img
                className="size-32 rounded-3xl  relative"
                src={`${imageUrl}/${profile.image}?t=${new Date().getTime()}`}
                alt="Profile"
              />
            ) : (
              <img
                className="h-40 w-40 relative"
                src={AllImages.userImage}
                alt="Profile"
              />
            )}

            <p className="text-5xl font-semibold">{profile?.fullName}</p>
          </div>
          <button
            onClick={handleEditClick}
            className="bg-[#0080FF] text-white font-semibold px-5 py-3 rounded-lg hover:bg-[#2774C2]"
          >
            <div className="flex gap-2">
              <EditOutlined style={{ color: "#FAFAFA" }} />
              <p className="">Edit Profile</p>
            </div>
          </button>
        </div>
        <div className="flex flex-col items-center text-white mt-5">
          <Form layout="vertical" className="bg-transparent p-4 w-full">
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Email
            </Typography.Title>
            <Form.Item className="text-white ">
              <Input
                value={profile?.email}
                placeholder="Enter your email"
                readOnly
                className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-[#222021] text-base-color hover:bg-transparent hover:border-[#222021] focus:bg-transparent focus:border-[#222021]"
              />
            </Form.Item>
            <Typography.Title level={5} style={{ color: "#222222" }}>
              Full Name
            </Typography.Title>
            <Form.Item className="text-white">
              <Input
                readOnly
                value={profile?.fullName}
                placeholder="Enter your full name"
                className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-[#222021] text-base-color hover:bg-transparent hover:border-[#222021] focus:bg-transparent focus:border-[#222021]"
              />
            </Form.Item>
            {profileData?.address && (
              <>
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  Address
                </Typography.Title>
                <Form.Item className="text-white">
                  <Input
                    readOnly
                    value={profile.address}
                    placeholder="Enter your contact number"
                    className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                  />
                </Form.Item>
              </>
            )}
            {profile?.phone && (
              <>
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  Contact Number
                </Typography.Title>
                <Form.Item className="text-white">
                  <Input
                    readOnly
                    value={profile?.phone}
                    placeholder="Enter your contact number"
                    className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                  />
                </Form.Item>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
export default Profile;
