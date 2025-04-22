import { Button } from "antd";
import JoditEditor from "jodit-react";
import { useRef, useState } from "react";
// import {
//   useGetSettingsQuery,
//   useUpdateSettingsMutation,
// } from "../../../Redux/api/settingsApi";
// import { toast } from "sonner";

const Faq = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  //   const {
  //     data: getSettingsData,
  //     isLoading: isFetching,
  //     error: fetchError,
  //     refetch,
  //   } = useGetSettingsQuery();
  //   console.log(getSettingsData?.data?.faq);

  //   const [updateSettings, { isLoading: isUpdating }] =
  //     useUpdateSettingsMutation();

  //   useEffect(() => {
  //     if (getSettingsData?.data.faq) {
  //       setContent(getSettingsData.data.faq);
  //     }
  //   }, [getSettingsData]);

  const handleOnSave = async () => {
    // try {
    //   await updateSettings({ faq: content }).unwrap();
    //   toast.success("faq updated successfully!");
    //   // if
    //   // (getSettingsData?.data.faq) { }
    //   //  else {
    //   //   // Add a new faq if not existing
    //   //   await addSettings({ faq: content }).unwrap();
    //   //   toast.success("faq added successfully!");
    //   // }
    //   refetch(); // Refresh the data after save
    // } catch (error) {
    //   toast.error("Failed to save faq. Please try again.");
    //   console.error("Save error:", error);
    // }
  };

  //   if (isFetching) {
  //     return (
  //       <div className="flex justify-center items-center h-screen">
  //         <Spin size="large" tip="Loading faq..." />
  //       </div>
  //     );
  //   }

  // Show error message if fetch fails
  //   if (fetchError) {
  //     return (
  //       <div className="text-white">
  //         Error loading faq. Please try again later.
  //       </div>
  //     );
  //   }

  return (
    <div className="min-h-[90vh] bg-[#cde5fd] rounded-lg py-1 px-4">
      <div className="p-2 rounded">
        <h1 className="text-4xl font-bold py-4  text-[#222021]">
          Frequently Asked Questions
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
          //   loading={isUpdating}
          className="w-full py-6 border !border-[#0080FF] hover:border-[#0080FF] text-xl !text-primary-color bg-[#0080FF] hover:!bg-[#0080FF] font-semibold rounded-2xl mt-8"
        >
          Save
        </Button>
      </div>
    </div>
  );
};
export default Faq;
