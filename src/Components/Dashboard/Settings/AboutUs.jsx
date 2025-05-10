/* eslint-disable no-unused-vars */
import { Button, Spin } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import {
  useAddSettingsMutation,
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../../Redux/api/settingsApi";
import { toast } from "sonner";

const AboutUs = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const {
    data: getSettingsData,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetSettingsQuery();
  // console.log("get about us", getSettingsData?.data?.aboutUs);
  // console.log("getSettingsData", getSettingsData);

  // const [addSettings, { isLoading: isAdding }] = useAddSettingsMutation();
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  useEffect(() => {
    if (getSettingsData?.data.aboutUs) {
      setContent(getSettingsData.data.aboutUs);
    }
  }, [getSettingsData]);

  const handleOnSave = async () => {
    try {
      await updateSettings({ aboutUs: content }).unwrap();
      toast.success("About Us updated successfully!");
      // if
      // (getSettingsData?.data.aboutUs) { }
      //  else {
      //   // Add a new aboutUs if not existing
      //   await addSettings({ aboutUs: content }).unwrap();
      //   toast.success("aboutUs added successfully!");
      // }
      refetch();
    } catch (error) {
      toast.error("Failed to save About Us. Please try again.");
      console.error("Save error:", error);
    }
  };

  if (isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading aboutUs..." />
      </div>
    );
  }

  // Show error message if fetch fails
  if (fetchError) {
    return (
      <div className="text-white">
        Error loading aboutUs. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-[#cde5fd] rounded-lg py-1 px-4">
      <div className="p-2 rounded">
        <h1 className="text-4xl font-bold py-4  text-[#222021]">About Us</h1>

        <div className="">
          <JoditEditor
            ref={editor}
            value={content}
            config={{ height: 500, theme: "light", readonly: false }}
            onBlur={(newContent) => setContent(newContent)}
          />
        </div>
        <Button
          onClick={handleOnSave}
          loading={isUpdating}
          className="w-full py-6 border !border-[#0080FF] hover:border-[#0080FF] text-xl !text-primary-color bg-[#0080FF] hover:!bg-[#0080FF] font-semibold rounded-2xl mt-8"
        >
          Save
        </Button>
      </div>
    </div>
  );
};
export default AboutUs;
