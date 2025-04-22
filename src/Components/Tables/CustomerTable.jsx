/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, ConfigProvider, Space, Table, Tooltip } from "antd";
import dayjs from "dayjs";
import { GoEye } from "react-icons/go";

const CustomerTable = ({
  data,
  loading,
  showCustomerViewModal,
  pageSize = 0,
}) => {
  const columns = [
    {
      title: "#SI",
      dataIndex: "id",
      key: "id",
      align: "center",
      responsive: ["md"],
      render: (_, __, index) => index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      render: (text, record) => (
        <div className="flex items-center justify-center">
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "contact",
      key: "email",
      align: "center",
      render: (contact) => (
        <div className="flex items-center justify-center">
          <span>{contact.email}</span>
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "contact",
      key: "phone",
      align: "center",
      render: (contact) => (
        <div className="flex items-center justify-center">
          <span>{contact.phone}</span>
        </div>
      ),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      align: "center",
      render: (address) =>
        `${address.street}, ${address.city}, ${address.state}, ${address.zip}`,
    },
    {
      title: "Total Orders Value",
      dataIndex: "totalOrderValue",
      key: "totalOrderValue",
      align: "center",
      render: (_, record) => {
        const totalValue = record.purchase_history.reduce(
          (acc, order) => acc + order.total_order_value,
          0
        );
        return `$${totalValue.toFixed(2)}`;
      },
    },
    {
      title: "Details",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Space size="middle">
          <Tooltip placement="right" title="View Details">
            <Button
              className="!p-0"
              style={{
                background: "#FFFFFF",
                border: "none",
                color: "#222222",
              }}
              onClick={() => showCustomerViewModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const formattedData = data.map((customer) => ({
    id: customer.customer_id,
    name: customer.name,
    contact: customer.contact,
    address: customer.address,
    purchase_history: customer.purchase_history,
    totalOrderValue: customer.purchase_history.reduce(
      (acc, order) => acc + order.total_order_value,
      0
    ),
  }));

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              headerBg: "#2774c2",
              headerColor: "rgba(255,255,255,0.88)",
              padding: 12,
            },
          },
        }}
      >
        <Table
          columns={columns}
          dataSource={formattedData}
          loading={loading}
          pagination={pageSize > 0 ? { pageSize } : false}
          rowKey="id"
          scroll={{ x: true }}
        />
      </ConfigProvider>
    </div>
  );
};

export default CustomerTable;
