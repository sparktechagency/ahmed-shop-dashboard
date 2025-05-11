import { Button, Spin } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";

import { toast } from "sonner";
import {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
} from "../../../Redux/api/settingsApi";

const TermsAndConditions = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const {
    data: getSettingsData,
    isLoading: isFetching,
    error: fetchError,
    refetch,
  } = useGetSettingsQuery();
  console.log(getSettingsData?.data?.termsOfService);

  // const [addSettings, { isLoading: isAdding }] = useAddSettingsMutation();
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateSettingsMutation();

  useEffect(() => {
    if (getSettingsData?.data.termsOfService) {
      setContent(getSettingsData.data.termsOfService);
    }
  }, [getSettingsData]);

  const handleOnSave = async () => {
    try {
      await updateSettings({ termsOfService: content }).unwrap();
      toast.success("Terms and Conditions updated successfully!");
      // if
      // (getSettingsData?.data.termsOfService) { }
      //  else {
      //   // Add a new Terms and Conditions if not existing
      //   await addSettings({ termsOfService: content }).unwrap();
      //   toast.success("Terms and Conditions added successfully!");
      // }
      refetch(); // Refresh the data after save
    } catch (error) {
      toast.error("Failed to save Terms and Conditions. Please try again.");
      console.error("Save error:", error);
    }
  };

  if (isFetching || isUpdating) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading Terms and Conditions..." />
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-white">
        Error loading Terms and Conditions. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-[#cde5fd] rounded-lg py-1 px-4">
      <div className="p-2 rounded">
        <h1 className="text-4xl font-bold py-4  text-[#222021]">
          Terms and Condition
        </h1>

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
          // loading={isUpdating}
          className="w-full py-6 border !border-[#0080FF] hover:border-[#0080FF] text-xl !text-primary-color bg-[#0080FF] hover:!bg-[#0080FF] font-semibold rounded-2xl mt-8"
        >
          Save
        </Button>
      </div>
    </div>
  );
};
export default TermsAndConditions;
