/* eslint-disable react/prop-types */
import {
  Button,
  ConfigProvider,
  Space,
  Table,
  Tooltip,
  Modal,
  Col,
  Row,
  Divider,
  List,
  Tag,
} from "antd";
import { GoEye } from "react-icons/go";
import { useState } from "react";
// import { getImageUrl } from "../../utils/baseUrl";

const SellerTable = ({ data, loading, pageSize = 0 }) => {
  // const imageUrl = getImageUrl();
  const [selectedSeller, setSelectedSeller] = useState(null);

  const columns = [
    {
      title: "#SI",
      dataIndex: "seller_id",
      key: "seller_id",
      align: "center",
      render: (_, __, index) => index + 1, // Display row index starting from 1
    },
    {
      title: "Seller Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Email",
      key: "contact",
      align: "center",
      render: (text, record) => (
        <div>
          <p>{record.contact.email}</p>
        </div>
      ),
    },
    {
      title: "Phone",
      key: "contact",
      align: "center",
      render: (text, record) => (
        <div>
          <p>{record.contact.phone}</p>
        </div>
      ),
    },
    {
      title: "Address",
      key: "address",
      align: "center",
      render: (text, record) => (
        <div>
          <p>
            {record.address.street}, {record.address.city},{" "}
            {record.address.state}, {record.address.zip}
          </p>
        </div>
      ),
    },
    {
      title: "Products Offered",
      key: "products",
      align: "center",
      render: (text, record) => record.products.length, // Display number of products sold by seller
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

  const handleCloseModal = () => setSelectedSeller(null); // Close modal

  const showCustomerViewModal = (record) => {
    setSelectedSeller(record);
  };

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
          dataSource={data} // Display seller data passed to the component
          loading={loading}
          pagination={pageSize > 0 ? { pageSize } : false}
          rowKey="seller_id" // Unique identifier for each row
          scroll={{ x: true }} // Allows horizontal scrolling
        />
      </ConfigProvider>

      {/* Seller Details Modal */}
      <Modal
        title={
          <div>
            <h2 className="text-secondary-color text-2xl">Seller Details</h2>
          </div>
        }
        visible={selectedSeller !== null}
        onCancel={handleCloseModal}
        footer={null}
        style={{ textAlign: "center" }}
        className="lg:min-w-[800px]"
        centered
      >
        {selectedSeller && (
          <div className="p-10">
            <p className="text-xl font-medium">{selectedSeller.name}</p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {selectedSeller.contact.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {selectedSeller.contact.phone}
            </p>
            <div className="flex gap-1 items-center">
              <p className="font-semibold">Address:</p>
              <div className="flex gap-1 items-center">
                <p>{selectedSeller.address.street}</p>
                <p>
                  {selectedSeller.address.city}, {selectedSeller.address.state},{" "}
                  {selectedSeller.address.zip}
                </p>
              </div>
            </div>

            <Divider />

            {/* Products Offered Section */}
            <h4 className="text-center text-lg font-semibold">
              Products Offered
            </h4>
            <List
              dataSource={selectedSeller.products}
              renderItem={(product) => (
                <List.Item key={product.product_id}>
                  <Row gutter={12}>
                    <Col span={12}>
                      <strong>{product.name}</strong>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Tag color="green">
                        ${product.price} / {product.unit}
                      </Tag>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <p>Category: {product.category}</p>
                      <p>Stock: {product.stock}</p>
                    </Col>
                  </Row>
                </List.Item>
              )}
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SellerTable;
