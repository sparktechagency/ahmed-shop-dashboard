import { useState } from "react";
import { ConfigProvider, Input, Spin, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEarningsQuery } from "../../Redux/api/earningApi";
import dayjs from "dayjs";

const Earnings = () => {
  const [searchText, setSearchText] = useState("");

  const { data: earningData, loading: isLoading } = useEarningsQuery();
  const earnings = earningData?.data?.result;
  console.log("earningData", earnings);

  // Filter earnings data based on search text
  const filteredEarningsData =
    earnings &&
    earnings.filter((earning) =>
      earning.transactionId.toLowerCase().includes(searchText.toLowerCase())
    );

  console.log("filteredEarningsData", filteredEarningsData);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const columns = [
    {
      title: "User ID",
      dataIndex: "customerId",
      key: "customerId",
      render: (text) => <span>{text}</span>,
      align: "center",
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
      // render: (text) => (
      //   <span>{text.charAt(0).toUpperCase() + text.slice(1)}</span>
      // ),
      align: "center",
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (text) => <span>{text}</span>,
      align: "center",
    },
    {
      title: "Earnings",
      dataIndex: "adminAmount",
      key: "adminAmount",
      render: (text) => <span>${text.toFixed(2)}</span>,
      align: "center",
    },
    {
      title: "Earnings Date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (text) => <span>{dayjs(text).format("DD-MM-YY")}</span>, // You can change the format as needed
      align: "center",
    },
    {
      title: "Method",
      dataIndex: "method",
      key: "method",
      render: (text) => <span>{text}</span>,
      align: "center",
    },
  ];
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Loading Privacy Policy..." />
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
          <h1 className="text-3xl font-bold text-[#333]">Earnings</h1>
          <div className="flex items-center gap-2">
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
          loading={isLoading}
          rowKey="id"
          pagination={{ pageSize: 5 }}
        />
      </div>
    </ConfigProvider>
  );
};

export default Earnings;
