import { useState, useMemo, useEffect } from "react";

import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import DeleteUserModal from "../../UI/DeleteUserModal";
import axios from "axios";
import SellerTable from "../../Tables/SellerTable";
import ViewSellerModal from "../../UI/ViewSellerModal";

export default function Seller() {
  // eslint-disable-next-line no-unused-vars
  // const { data: allUsers, loadingUser, refetch } = useAllUsersQuery();
  // const userData = allUsers?.data;
  // console.log(userData);

  const [searchText, setSearchText] = useState("");
  const [isViewSeller, setIsViewSeller] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);

  const [sellerData, setSellerData] = useState([]);
  const [loadingSeller, setLoadingSeller] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoadingSeller(true);
      try {
        const response = await axios.get("data/sellerData.json");
        console.log(response.data);
        setSellerData(response.data);
      } catch (error) {
        console.error("Error fetching landlord data", error);
      } finally {
        setLoadingSeller(false);
      }
    };

    fetchUserData();
  }, []);

  const filteredData = useMemo(() => {
    if (!searchText) return sellerData;
    return sellerData.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [sellerData, searchText]);

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

  // const handleBlock = (data) => {
  //   console.log("Blocked User:", { id: data?.id, data: data });
  //   setIsViewCustomer(false);
  //   setIsViewBusiness(false);
  // };

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
            loading={loadingSeller}
            showViewSellerModal={showViewSellerModal}
            showDeleteModal={showDeleteModal}
            pageSize={8}
          />
        </div>

        <ViewSellerModal
          isViewSeller={isViewSeller}
          handleCancel={handleCancel}
          currentRecord={currentRecord}
          // handleBlock={handleBlock}
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
