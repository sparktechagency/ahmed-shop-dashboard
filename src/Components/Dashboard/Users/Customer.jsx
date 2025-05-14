import { useState, useMemo } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Spin } from "antd";
import CustomerTable from "../../Tables/CustomerTable";
import ViewCustomerModal from "../../UI/ViewCustomerModal";
import { useAllUsersQuery } from "../../../Redux/api/userApi";

export default function Customer() {
  const { data: allUsers, loadingUser } = useAllUsersQuery();
  const userData = allUsers?.data;
  console.log(userData);

  const [searchText, setSearchText] = useState("");
  const [isViewCustomer, setIsViewCustomer] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const customer = useMemo(() => {
    return (
      userData?.filter((user) => user.role?.toLowerCase() === "customer") || []
    );
  }, [userData]);

  console.log("customer", customer);

  const filteredData = useMemo(() => {
    if (!searchText) return customer;
    return customer.filter(
      (item) =>
        item.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
        item._id.includes(searchText)
    );
  }, [customer, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const showCustomerViewModal = (record) => {
    console.log(record);
    setCurrentRecord(record);
    setIsViewCustomer(true);
  };

  const handleCancel = () => {
    setIsViewCustomer(false);
  };

  if (loadingUser) {
    return (
      <div>
        <Spin size="large" />
      </div>
    );
  }
  return (
    <div className="min-h-[90vh]">
      <div className="bg-[#FFFFFF] rounded">
        <div className="flex justify-between p-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-secondary-color">
              Customer List
            </h1>
          </div>
          <div className="flex gap-4 items-center">
            <Input
              placeholder="Search Customer..."
              value={searchText}
              onChange={(e) => onSearch(e.target.value)}
              className="text-base font-semibold !border-gray-500 py-2"
              prefix={
                <SearchOutlined className="text-[#222222] font-bold text-lg mr-2" />
              }
            />
          </div>
        </div>
        <div className="px-2 lg:px-6">
          <CustomerTable
            data={filteredData}
            loading={loadingUser}
            showCustomerViewModal={showCustomerViewModal}
            pageSize={8}
          />
        </div>

        <ViewCustomerModal
          isViewCustomer={isViewCustomer}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
}
