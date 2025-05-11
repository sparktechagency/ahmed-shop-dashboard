/* eslint-disable no-unused-vars */
import { Button, Form, Input, Typography, Upload } from "antd";
import { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { MdOutlineEdit } from "react-icons/md";
import { AllImages } from "../../../public/images/AllImages";
import { useNavigate } from "react-router-dom";

import {
  useEditProfileMutation,
  useUserProfileQuery,
} from "../../Redux/api/userApi";
import { toast } from "sonner";
import { getImageUrl } from "../../utils/baseUrl";

const EditProfile = () => {
  const navigate = useNavigate();
  const { data: userProfile, refetch } = useUserProfileQuery();
  const profile = userProfile?.data;
  console.log("userProfile", profile);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const imageUrl = getImageUrl();
  const [updateProfile, { isLoading }] = useEditProfileMutation();

  const handleImageChange = (file) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const onFinish = async (values) => {
    console.log("onfinish", values);
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("address", values.address);
    formData.append("phone", values.phone);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const response = await updateProfile(formData).unwrap();
      if (response.success) {
        toast.success("Profile updated successfully!");

        await refetch();
        navigate("/profile", { state: { updated: true } });
      } else {
        toast.error(response.message || "Failed to update profile.");
      }
    } catch (error) {
      console.log("Update error:", error);
      toast.error("An error occurred while updating the profile.");
    }
  };

  return (
    <div className="bg-[#cde5fd] min-h-[90vh] flex justify-center">
      <Form
        onFinish={onFinish}
        layout="vertical"
        className="bg-transparent w-full"
      >
        <div className="py-10 text-base-color rounded-lg h-full w-full lg:w-[70%] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-8">
              <div className="flex items-center gap-x-4">
                <div className="mt-12 relative ">
                  <div className="flex items-center justify-center gap-8">
                    {profile?.image ? (
                      <img
                        className="h-40 w-40 relative rounded-lg"
                        src={`${imageUrl}/${
                          profile.image
                        }?t=${new Date().getTime()}`}
                        alt="Profile"
                      />
                    ) : (
                      <img
                        className="h-40 w-40 relative"
                        src={AllImages.userImage}
                        alt="Profile"
                      />
                    )}

                    <p className="text-5xl font-semibold">
                      {profile?.fullName}
                    </p>
                  </div>
                  <Form.Item name="image" className="text-white ">
                    <Upload
                      maxCount={1}
                      listType="picture"
                      beforeUpload={handleImageChange}
                      accept="image/*"
                      multiple={false}
                    >
                      <Button
                        style={{
                          position: "absolute",
                          top: "-20px",
                          left: "130px",
                          transform: "translate(-50%, -50%)",
                          zIndex: 1,
                          opacity: 1,
                          height: "36px",
                          width: "36px",
                          borderRadius: "90px",
                          fontSize: "18px",
                        }}
                      >
                        <EditOutlined style={{ color: "#2774C2" }} />
                      </Button>
                    </Upload>
                  </Form.Item>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center text-white mt-2">
            <div className="p-4 w-full">
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Email
              </Typography.Title>
              <Form.Item
                initialValue={profile?.email}
                name="email"
                className="text-white "
              >
                <Input
                  suffix={<MdOutlineEdit />}
                  type="email"
                  placeholder="Enter your email"
                  className="py-2 px-3 text-xl bg-site-color border !border-[#222021] text-base-color hover:bg-transparent hover:border-[#222021] focus:bg-transparent focus:border-[#222021]"
                />
              </Form.Item>
              <Typography.Title level={5} style={{ color: "#222222" }}>
                Full Name
              </Typography.Title>
              <Form.Item
                initialValue={profile?.fullName}
                name="fullName"
                className="text-white"
              >
                <Input
                  suffix={<MdOutlineEdit />}
                  placeholder="Enter your Name"
                  className="py-2 px-3 text-xl bg-site-color border !border-[#222021] text-base-color hover:bg-transparent hover:border-[#222021] focus:bg-transparent focus:border-[#222021]"
                />
              </Form.Item>
              <div>
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  Address
                </Typography.Title>
                <Form.Item
                  initialValue={profile?.address}
                  name="address"
                  className="text-white"
                >
                  <Input
                    suffix={<MdOutlineEdit />}
                    placeholder="Enter your address"
                    className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                  />
                </Form.Item>
              </div>
              <div>
                <Typography.Title level={5} style={{ color: "#222222" }}>
                  Contact number
                </Typography.Title>
                <Form.Item
                  initialValue={profile?.phone}
                  name="phone"
                  className="text-white"
                >
                  <Input
                    suffix={<MdOutlineEdit />}
                    placeholder="Enter your Contact number"
                    className="cursor-not-allowed py-2 px-3 text-xl bg-site-color border !border-input-color text-base-color hover:bg-transparent hover:border-secoundary-color focus:bg-transparent focus:border-secoundary-color"
                  />
                </Form.Item>
              </div>
              <Form.Item>
                <Button
                  className="w-full py-6 border !border-[#2774C2] hover:border-[#0080FF] text-xl !text-primary-color bg-[#0080FF] hover:!bg-[#2774C2] font-semibold rounded-2xl mt-8"
                  htmlType="submit"
                >
                  Save & Change
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
export default EditProfile;
