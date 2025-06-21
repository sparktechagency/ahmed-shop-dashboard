import { useState } from "react";
import {
  Button,
  ConfigProvider,
  Input,
  Spin,
  Table,
  Tooltip,
  Modal,
} from "antd";
import { SearchOutlined, EyeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useShopsQuery, useVerifyShopMutation } from "../../Redux/api/shopApi";
import { getImageUrl } from "../../utils/baseUrl";
import { toast } from "sonner";

const Shop = () => {
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedShop, setSelectedShop] = useState(null);

  const { data: shopData, loading: isLoading, refetch } = useShopsQuery();
  const shops = shopData?.data;

  const [verifyShop] = useVerifyShopMutation();

  const imageUrl = getImageUrl();

  // Filter shop data based on search text
  const filteredShopsData =
    shops &&
    shops.filter((shop) =>
      shop.name.toLowerCase().includes(searchText.toLowerCase())
    );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const handleViewDetails = (shop) => {
    console.log("Selected Shop:", shop);
    setSelectedShop(shop);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false); // Close modal
  };

  const handleVerifyShop = async (shopId) => {
    console.log(`Verifying shop with ID: ${shopId}`);
    try {
      const categoryToUpdate = shops.find((shop) => shop._id === shopId);
      console.log("update shop", categoryToUpdate);
      const response = await verifyShop(shopId).unwrap();

      if (response?.success) {
        console.log("response", response);
        toast.success("Shop Status Updated Successfully!");
        refetch();
      } else {
        toast.error("Failed to update Shop status.");
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("Error updating Shop status");
    }
  };

  const columns = [
    {
      title: "Shop Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
      align: "center",
    },
    {
      title: "Seller Name",
      dataIndex: "sellerId",
      key: "sellerId",
      render: (text) => <span>{text.fullName}</span>,
      align: "center",
    },
    {
      title: "Address",
      dataIndex: "sellerId",
      key: "sellerId",
      render: (text) => <span>{text.address}</span>,
      align: "center",
    },
    {
      title: "Phone Number",
      dataIndex: "sellerId",
      key: "sellerId",
      render: (text) => <span>{text.phone}</span>,
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <span>{text === "verify" ? "Verified" : "Pending"}</span>
      ),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="flex items-center justify-center gap-3">
          {/* View Details Button */}
          <Tooltip placement="left" title="View Details">
            <Button
              style={{
                color: "#000",
                outline: "none",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
              onClick={() => handleViewDetails(record)}
            >
              <EyeOutlined />
            </Button>
          </Tooltip>

          {/* Verify Button */}
          <Tooltip
            placement="top"
            title={
              record.status === "verify" ? "Shop is Verified" : "Verify Shop"
            }
          >
            <Button
              style={{
                color: "#fff",
                backgroundColor:
                  record.status === "verify" ? "#9E9E9E" : "#4CAF50",
                outline: "none",
                border: "none",
                cursor: record.status === "verify" ? "not-allowed" : "pointer",
              }}
              onClick={() => handleVerifyShop(record._id)}
              disabled={record.status === "verify"}
            >
              {record.status === "verify" ? "Verified" : "Verify"}
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading Shops..." />
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "#2774c2",
            headerColor: "rgba(255,255,255,0.88)",
          },
          Button: {
            colorPrimary: "rgb(91,91,91)",
            colorPrimaryHover: "rgb(118,118,118)",
            colorPrimaryActive: "rgb(62,62,62)",
          },
          Select: {
            colorBorder: "rgb(124,124,124)",
          },
        },
      }}
    >
      <div className="p-5 h-screen">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-3xl font-bold text-[#333]">Shop</h1>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search Shop Name"
              value={searchText}
              onChange={handleSearch}
              style={{ width: "100%", height: 40 }}
              prefix={<SearchOutlined />}
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredShopsData}
          loading={isLoading}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      </div>

      {/* Modal to show shop details */}
      {selectedShop && (
        <Modal
          //   title="Shop Details"
          visible={isModalVisible}
          onCancel={handleCloseModal}
          footer={[
            <Button
              key="close"
              onClick={handleCloseModal}
              style={{
                backgroundColor: "#FF5C5C",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "8px",
              }}
            >
              Close
            </Button>,
          ]}
          width={600}
          style={{
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <div
            style={{
              padding: "10px",
              fontFamily: "Arial, sans-serif",
              lineHeight: "1.5",
              fontSize: "16px",
            }}
          >
            <div className="flex items-center justify-center mb-4">
              {selectedShop?.image && (
                <img
                  src={`${imageUrl}/${selectedShop.image}`}
                  alt={selectedShop?.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg mr-4"
                />
              )}
              <h2 className="text-2xl font-bold text-secondary-color">
                {selectedShop.name}
              </h2>
            </div>
            <hr />
            <div className="flex flex-col gap-2 mt-5">
              <p>
                <strong>Shop Name:</strong> {selectedShop.name}
              </p>
              <p>
                <strong>Seller Name:</strong> {selectedShop.sellerId.fullName}
              </p>
              <p>
                <strong>Address:</strong> {selectedShop.sellerId.address}
              </p>
              <p>
                <strong>Email:</strong> {selectedShop.sellerId.email}
              </p>
              <p>
                <strong>Phone Number:</strong> {selectedShop.sellerId.phone}
              </p>
              <p>
                <strong>Description:</strong> {selectedShop.description}
              </p>
              <p>
                <strong>Status: </strong>
                {selectedShop.status === "verify" ? "Verified" : "Pending"}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {dayjs(selectedShop.createdAt).format("DD-MM-YY")}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </ConfigProvider>
  );
};

export default Shop;
