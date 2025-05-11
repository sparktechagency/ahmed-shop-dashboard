import { useState, useMemo } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Spin } from "antd";
import DeleteUserModal from "../../UI/DeleteUserModal";
import SellerTable from "../../Tables/SellerTable";
import ViewSellerModal from "../../UI/ViewSellerModal";
import { useAllUsersQuery } from "../../../Redux/api/userApi";

export default function Seller() {
  // eslint-disable-next-line no-unused-vars
  const { data: allUsers, loadingUser, refetch } = useAllUsersQuery();
  const userData = allUsers?.data;
  console.log("userData", userData);

  const [searchText, setSearchText] = useState("");
  const [isViewSeller, setIsViewSeller] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  // Filter sellers by role
  const seller = useMemo(() => {
    return (
      userData?.filter((user) => user.role?.toLowerCase() === "seller") || []
    );
  }, [userData]);

  console.log("seller", seller);

  const filteredData = useMemo(() => {
    if (!searchText) return seller;
    return seller.filter((item) =>
      item.fullName.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [seller, searchText]);

  const onSearch = (value) => {
    setSearchText(value);
  };

  const showViewSellerModal = (record) => {
    console.log(record);
    setCurrentRecord(record);
    setIsViewSeller(true);
  };

  const showDeleteModal = (record) => {
    setCurrentRecord(record);
    setIsDeleteModalVisible(true);
  };

  const handleDelete = (data) => {
    // Handle delete action here
    console.log({ id: data?.id, data });
    setIsDeleteModalVisible(false);
  };

  const handleCancel = () => {
    setIsViewSeller(false);
    setIsDeleteModalVisible(false);
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
              Seller List
            </h1>
          </div>
          <div className="flex gap-4 items-center">
            <Input
              placeholder="Search Seller..."
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
          <SellerTable
            data={filteredData}
            loading={loadingUser}
            showViewSellerModal={showViewSellerModal}
            showDeleteModal={showDeleteModal}
            pageSize={8}
          />
        </div>

        <ViewSellerModal
          isViewSeller={isViewSeller}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
        <DeleteUserModal
          isDeleteModalVisible={isDeleteModalVisible}
          handleDelete={handleDelete}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
        />
      </div>
    </div>
  );
}
