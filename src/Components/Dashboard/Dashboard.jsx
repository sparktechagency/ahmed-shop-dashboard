import { ConfigProvider, Select } from "antd";
// import Area_Chart from "../Chart/AreaChart";
// import { Link } from "react-router-dom";

import { AllIcons } from "../../../public/images/AllImages";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { FaLandmark } from "react-icons/fa";

import { useState } from "react";

// import ViewUserModal from "../UI/ViewUserModal";
import IncomeBarChart from "../Chart/IncomeBarChart";
// import { useAllCustomerQuery } from "../../Redux/api/dashboardApi";
// import { useAllUsersQuery } from "../../Redux/api/userApi";

const Dashboard = () => {
  // const { data: allCustomer } = useAllCustomerQuery();
  // eslint-disable-next-line no-unused-vars
  // const { data: allUsers, loadingUser, refetch } = useAllUsersQuery();
  const [selectedYear, setSelectedYear] = useState("2025");
  // const [selectedHour, setSelectedHour] = useState("24hour");
  // const [selectedDays, setSelectedDays] = useState("7day");

  // const userData = allUsers?.data;
  // console.log(userData);

  // console.log(allCustomer?.data);

  //* It's Use to Show Modal
  // const [isViewModalVisible, setIsViewModalVisible] = useState(false);

  //* It's Use to Show Delete Modal
  // const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  //* It's Use to Set Seclected User to delete and view
  // const [currentRecord, setCurrentRecord] = useState(null);

  // const showViewModal = (record) => {
  //   setCurrentRecord(record);
  //   // setIsViewModalVisible(true);
  // };

  // const showDeleteModal = (record) => {
  //   setCurrentRecord(record);
  //   setIsDeleteModalVisible(true);
  // };

  // const handleDelete = (data) => {
  //   // Handle delete action here
  //   console.log({ id: data?.id, userName: data?.userName });
  //   setIsDeleteModalVisible(false);
  // };

  // const handleCancel = () => {
  //   // setIsViewModalVisible(false);
  //   setIsDeleteModalVisible(false);
  // };

  // const handleBlock = (data) => {
  //   console.log("Blocked User:", { id: data?.id, userName: data?.userName });
  //   setIsViewModalVisible(false);
  // };

  return (
    <div className="w-full min-h-[90vh] px-1 sm:px-2 lg:px-2">
      <div>
        <div>
          {/* Card Items */}
          <div className="flex items-center gap-5 mt-8 w-full">
            <div className="flex gap-5 flex-wrap rounded-lg bg-[#2774c2] border border-[#808080] py-2 px-1 lg:p-5 items-center flex-1">
              <div className="flex gap-2 xl:gap-4 items-center">
                <div className="p-3 w-fit">
                  <img
                    src={AllIcons.groupsPerson}
                    className="h-10 w-10"
                    alt=""
                  />
                </div>
                <div className="text-start">
                  <p className="text-xs lg:text-base xl:text-2xl text-primary-color mb-1">
                    Total Users
                  </p>
                  <p className="text-sm lg:text-base xl:text-3xl font-medium text-primary-color">
                    {/* {allCustomer?.data?.allCustomerCount} */} 10
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-5 flex-wrap rounded-lg bg-[#2774c2] border border-[#808080] py-2 px-1 xl:p-5 items-center  flex-1">
              <div className="flex gap-2 xl:gap-4 items-center">
                <div className="p-3  w-fit">
                  {/* <img src={AllIcons.person} className="h-10 w-10" alt="" /> */}
                  <FaHouseChimneyUser className="h-8 w-8 text-primary-color" />
                </div>
                <div className="text-start">
                  <p className="text-xs lg:text-sm xl:text-2xl text-primary-color mb-1">
                    Total Landlord
                  </p>
                  <p className="text-sm lg:text-base xl:text-3xl font-medium text-primary-color">
                    {/* {allCustomer?.data?.allBusinessCount} */} 50
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-5 flex-wrap rounded-lg bg-[#2774c2] border border-[#808080] py-2 px-1 xl:p-5 items-center  flex-1">
              <div className="flex gap-2 xl:gap-4 items-center">
                <div className="p-3  w-fit">
                  {/* <img src={AllIcons.person} className="h-10 w-10" alt="" /> */}
                  <LiaHandHoldingUsdSolid className="h-10 w-10 text-primary-color font-extrabold" />
                </div>
                <div className="text-start">
                  <p className="text-xs lg:text-sm xl:text-2xl text-primary-color mb-1">
                    Total Revenue
                  </p>
                  <p className="text-sm lg:text-base xl:text-3xl font-medium text-primary-color">
                    {/* {allCustomer?.data?.allBusinessCount} */} $ 5000
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-5 flex-wrap rounded-lg bg-[#2774c2] border border-[#808080] py-2 px-1 xl:p-5 items-center  flex-1">
              <div className="flex gap-2 xl:gap-4 items-center">
                <div className="p-3  w-fit">
                  {/* <img src={AllIcons.person} className="h-10 w-10" alt="" /> */}
                  <FaLandmark className="h-8 w-8 text-primary-color" />
                </div>
                <div className="text-start">
                  <p className="text-xs lg:text-sm xl:text-2xl text-primary-color mb-1">
                    Total Properties
                  </p>
                  <p className="text-sm lg:text-base xl:text-3xl font-medium text-primary-color">
                    {/* {allCustomer?.data?.allBusinessCount} */} 20
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* graphs */}
          <div className="mt-8 w-full">
            <div
              className="w-full p-3 bg-[#FFFFFF] rounded-lg border border-[#222021]"
              //
            >
              <div className="flex justify-between text-base-color mt-4">
                <p className="text-2xl sm:text-3xl mb-5">Revenue</p>
                <div>
                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          fontSize: 16,
                          colorBorder: "#222222",
                        },
                      },
                    }}
                  >
                    <Select
                      onChange={(value) => setSelectedYear(value)}
                      defaultValue="2025"
                      options={[
                        { value: "2025", label: "2025" },
                        { value: "2024", label: "2024" },
                        { value: "2023", label: "2023" },
                        { value: "2022", label: "2022" },
                      ]}
                    />
                  </ConfigProvider>
                </div>
              </div>
              <div>
                <IncomeBarChart selectedYear={selectedYear} />
              </div>
            </div>
          </div>

          {/* <div className="grid grid-cols-1 items-start lg:grid-cols-2 gap-5 mt-8 w-full">
            <div
              className="w-full p-3 bg-[#FFFFFF] rounded-lg border border-input-color"
              //
            >
              <div className="flex justify-between text-base-color mt-4">
                <p className="text-2xl sm:text-3xl mb-5">Income</p>
                <div>
                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          fontSize: 16,
                          colorBorder: "#222222",
                        },
                      },
                    }}
                  >
                    <Select
                      onChange={(value) => setSelectedDays(value)}
                      defaultValue="Last 7 days"
                      options={[{ value: "7day", label: "Last 7 days" }]}
                    />
                  </ConfigProvider>
                </div>
              </div>
              <div>
                <Area_Chart selectedDays={selectedDays} />
              </div>
            </div>

            <div
              className="w-full p-3 bg-[#FFFFFF] rounded-lg border border-input-color"
              //
            >
              <div className="flex justify-between text-base-color mt-4">
                <p className="text-2xl sm:text-3xl mb-5">Income</p>
                <div>
                  <ConfigProvider
                    theme={{
                      components: {
                        Select: {
                          fontSize: 16,
                          colorBorder: "#222222",
                        },
                      },
                    }}
                  >
                    <Select
                      defaultValue="Last 24 Hours"
                      onChange={(value) => setSelectedHour(value)}
                      options={[
                        { value: "24hour", label: "Last 24 Hours" },
                        // { value: "12hour", label: "Last 12 Hours" },
                        // { value: "6hour", label: "Last 6 Hours" },
                      ]}
                    />
                  </ConfigProvider>
                </div>
              </div>
              <div>
                <HourArea_Chart selectedHour={selectedHour} />
              </div>
            </div>
          </div> */}
        </div>
        {/* <ViewUserModal
          isViewModalVisible={isViewModalVisible}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          handleBlock={handleBlock}
        /> */}
        {/* <DeleteUserModal
          isDeleteModalVisible={isDeleteModalVisible}
          handleDelete={handleDelete}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        /> */}
      </div>
    </div>
  );
};

export default Dashboard;
