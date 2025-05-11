import { ConfigProvider, Select, Spin } from "antd";
import { AllIcons } from "../../../public/images/AllImages";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { FaLandmark } from "react-icons/fa";
import { useMemo, useState } from "react";
import IncomeBarChart from "../Chart/IncomeBarChart";
import { useDashboardOverviewQuery } from "../../Redux/api/dashboardApi";
import { useAllUsersQuery } from "../../Redux/api/userApi";

const Dashboard = () => {
  const { data: dashboardOverview } = useDashboardOverviewQuery();
  const dashboardData = dashboardOverview?.data;
  console.log("dashboardData", dashboardData);
  const { data: allUsers, loadingUser } = useAllUsersQuery();
  const [selectedYear, setSelectedYear] = useState("2025");
  // const [selectedHour, setSelectedHour] = useState("24hour");
  // const [selectedDays, setSelectedDays] = useState("7day");

  const userData = allUsers?.data;
  console.log(userData);

  const customer = useMemo(() => {
    return (
      userData?.filter((user) => user.role?.toLowerCase() === "customer") || []
    );
  }, [userData]);

  console.log("customer", customer);

  if (loadingUser) {
    return (
      <div>
        <Spin size="large" />
      </div>
    );
  }

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
                    {dashboardData?.allUserCount}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-5 flex-wrap rounded-lg bg-[#2774c2] border border-[#808080] py-2 px-1 xl:p-5 items-center  flex-1">
              <div className="flex gap-2 xl:gap-4 items-center">
                <div className="p-3  w-fit">
                  <FaHouseChimneyUser className="size-8 text-primary-color" />
                </div>
                <div className="text-start">
                  <p className="text-xs lg:text-sm xl:text-2xl text-primary-color mb-1">
                    Total Seller
                  </p>
                  <p className="text-sm lg:text-base xl:text-3xl font-medium text-primary-color">
                    {dashboardData?.totalSellerCount}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-5 flex-wrap rounded-lg bg-[#2774c2] border border-[#808080] py-2 px-1 xl:p-5 items-center  flex-1">
              <div className="flex gap-2 xl:gap-4 items-center">
                <div className="p-3  w-fit">
                  <FaHouseChimneyUser className="size-8 text-primary-color font-extrabold" />
                </div>
                <div className="text-start">
                  <p className="text-xs lg:text-sm xl:text-2xl text-primary-color mb-1">
                    Total Customer
                  </p>
                  <p className="text-sm lg:text-base xl:text-3xl font-medium text-primary-color">
                    {customer.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-5 flex-wrap rounded-lg bg-[#2774c2] border border-[#808080] py-2 px-1 xl:p-5 items-center  flex-1">
              <div className="flex gap-2 xl:gap-4 items-center">
                <div className="p-3  w-fit">
                  <FaLandmark className="h-8 w-8 text-primary-color" />
                </div>
                <div className="text-start">
                  <p className="text-xs lg:text-sm xl:text-2xl text-primary-color mb-1">
                    Total Revenue
                  </p>
                  <p className="text-sm lg:text-base xl:text-3xl font-medium text-primary-color">
                    ${dashboardData?.totalRevinewCount}
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
                <p className="text-2xl sm:text-3xl mb-5">Earnings</p>
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
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
