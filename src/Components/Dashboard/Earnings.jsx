import { useState, useEffect } from "react";
import { ConfigProvider, Input, Table, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

const Earnings = () => {
  const [earningsData, setEarningsData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  // const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  // const [currentEarning, setCurrentEarning] = useState(null);
  const [searchText, setSearchText] = useState("");

  // Fetch data from JSON (you can change this to an API endpoint if needed)
  useEffect(() => {
    const fetchEarnings = async () => {
      setLoading(true);
      try {
        const response = await axios.get("data/earningsData.json"); // Replace with your API endpoint
        setEarningsData(response.data);
      } catch (error) {
        console.error("Error fetching earnings data", error);
        message.error("Failed to load earnings data");
      } finally {
        setLoading(false);
      }
    };
    fetchEarnings();
  }, []);

  // Filter earnings data based on search text
  const filteredEarningsData = earningsData.filter((earning) =>
    earning.transaction_id.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  // const showAddModal = () => {
  //   setCurrentEarning(null); // Reset current earning for adding new
  //   setIsAddModalVisible(true);
  // };

  // const showEditModal = (earning) => {
  //   setCurrentEarning(earning);
  //   setIsEditModalVisible(true);
  // };

  // const handleAddOk = () => {
  //   if (currentEarning?.total_earnings && currentEarning?.transaction_id) {
  //     const newEarning = { ...currentEarning, id: Date.now() };
  //     setEarningsData([...earningsData, newEarning]);
  //     setIsAddModalVisible(false);
  //     message.success("New earning added successfully");
  //   } else {
  //     message.error("Please provide total earnings and transaction ID");
  //   }
  // };

  // const handleEditOk = () => {
  //   if (currentEarning?.total_earnings && currentEarning?.transaction_id) {
  //     setEarningsData((prev) =>
  //       prev.map((item) =>
  //         item.id === currentEarning.id ? currentEarning : item
  //       )
  //     );
  //     setIsEditModalVisible(false);
  //     message.success("Earning updated successfully");
  //   } else {
  //     message.error("Please provide total earnings and transaction ID");
  //   }
  // };

  // const handleCancel = () => {
  //   setIsAddModalVisible(false);
  //   setIsEditModalVisible(false);
  // };

  // const handleDelete = (earning) => {
  //   Modal.confirm({
  //     title: "Are you sure you want to delete this earning?",
  //     onOk: () => {
  //       setEarningsData((prev) =>
  //         prev.filter((item) => item.id !== earning.id)
  //       );
  //       message.success("Earning deleted successfully");
  //     },
  //   });
  // };

  const columns = [
    {
      title: "User ID",
      dataIndex: "customer_id",
      key: "customer_id",
      render: (text) => <span>{text}</span>,
      align: "center",
    },
    {
      title: "User Type",
      dataIndex: "user_type",
      key: "user_type",
      render: (text) => (
        <span>{text.charAt(0).toUpperCase() + text.slice(1)}</span>
      ),
      align: "center",
    },
    {
      title: "Transaction ID",
      dataIndex: "transaction_id",
      key: "transaction_id",
      render: (text) => <span>{text}</span>,
      align: "center",
    },
    {
      title: "Total Earnings",
      dataIndex: "total_earnings",
      key: "total_earnings",
      render: (text) => <span>${text.toFixed(2)}</span>,
      align: "center",
    },
    {
      title: "Earnings Date",
      dataIndex: "earnings_date",
      key: "earnings_date",
      render: (text) => <span>{text}</span>,
      align: "center",
    },
    {
      title: "Transaction Media",
      dataIndex: "transaction_media",
      key: "transaction_media",
      render: (text) => <span>{text}</span>,
      align: "center",
    },
    // {
    //   title: "Actions",
    //   key: "actions",
    //   render: (text, record) => (
    //     <span>
    //       {/* <Button
    //         icon={<EditOutlined />}
    //         onClick={() => showEditModal(record)}
    //         style={{ marginRight: 8 }}
    //       /> */}
    //       <Button
    //         icon={<DeleteOutlined />}
    //         onClick={() => handleDelete(record)}
    //       />
    //     </span>
    //   ),
    // },
  ];

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
          <h1 className="text-3xl font-bold text-[#333]">Earnings</h1>
          <div className="flex items-center gap-2">
            {/* <Button
              type="primary"
              style={{ float: "right", height: 40 }}
              onClick={showAddModal}
            >
              Add New Earning
            </Button>{" "} */}
            <Input
              placeholder="Search Transaction Id"
              value={searchText}
              onChange={handleSearch}
              style={{ width: "100%", height: 40 }}
              prefix={<SearchOutlined />}
            />
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredEarningsData}
          loading={loading}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />

        {/* Add Modal */}
        {/* <Modal
          title="Add New Earning"
          visible={isAddModalVisible}
          onOk={handleAddOk}
          onCancel={handleCancel}
          width={600}
        >
          <div>
            <h3>Transaction ID:</h3>
            <Input
              value={currentEarning?.transaction_id || ""}
              onChange={(e) =>
                setCurrentEarning({
                  ...currentEarning,
                  transaction_id: e.target.value,
                })
              }
              placeholder="Enter transaction ID"
              style={{ marginBottom: 10, height: 40 }}
            />
            <h3>Total Earnings:</h3>
            <Input
              value={currentEarning?.total_earnings || ""}
              onChange={(e) =>
                setCurrentEarning({
                  ...currentEarning,
                  total_earnings: e.target.value,
                })
              }
              placeholder="Enter total earnings"
              style={{ marginBottom: 10, height: 40 }}
            />
            <h3>Transaction Media:</h3>
            <Select
              value={currentEarning?.transaction_media || "Credit Card"}
              onChange={(value) =>
                setCurrentEarning({
                  ...currentEarning,
                  transaction_media: value,
                })
              }
              style={{ width: "100%", marginBottom: 10, height: 40 }}
            >
              <Select.Option value="Credit Card">Credit Card</Select.Option>
              <Select.Option value="PayPal">PayPal</Select.Option>
              <Select.Option value="Bank Transfer">Bank Transfer</Select.Option>
            </Select>
          </div>
        </Modal> */}

        {/* Edit Modal */}
        {/* <Modal
          title="Edit Earning"
          visible={isEditModalVisible}
          onOk={handleEditOk}
          onCancel={handleCancel}
          width={600}
        >
          <div>
            <h3>Transaction ID:</h3>
            <Input
              value={currentEarning?.transaction_id || ""}
              onChange={(e) =>
                setCurrentEarning({
                  ...currentEarning,
                  transaction_id: e.target.value,
                })
              }
              placeholder="Enter transaction ID"
              style={{ marginBottom: 10 }}
            />
            <h3>Total Earnings:</h3>
            <Input
              value={currentEarning?.total_earnings || ""}
              onChange={(e) =>
                setCurrentEarning({
                  ...currentEarning,
                  total_earnings: e.target.value,
                })
              }
              placeholder="Enter total earnings"
              style={{ marginBottom: 10 }}
            />
            <h3>Transaction Media:</h3>
            <Select
              value={currentEarning?.transaction_media || "Credit Card"}
              onChange={(value) =>
                setCurrentEarning({
                  ...currentEarning,
                  transaction_media: value,
                })
              }
              style={{ width: "100%", marginBottom: 10, height: 40 }}
            >
              <Select.Option value="Credit Card">Credit Card</Select.Option>
              <Select.Option value="PayPal">PayPal</Select.Option>
              <Select.Option value="Bank Transfer">Bank Transfer</Select.Option>
            </Select>
          </div>
        </Modal> */}
      </div>
    </ConfigProvider>
  );
};

export default Earnings;
