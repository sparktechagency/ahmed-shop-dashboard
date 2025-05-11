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
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      align: "center",
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
          dataSource={data}
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
