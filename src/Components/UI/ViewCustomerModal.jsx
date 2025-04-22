/* eslint-disable react/prop-types */
import { ConfigProvider, Modal, Table } from "antd";
import dayjs from "dayjs";

const ViewCustomerModal = ({ isViewCustomer, handleCancel, currentRecord }) => {
  return (
    <Modal
      title={
        <div>
          <h2 className="text-secondary-color text-2xl">Customer Details</h2>
        </div>
      }
      open={isViewCustomer}
      onCancel={handleCancel}
      footer={null}
      centered
      style={{ textAlign: "center" }}
      className="lg:min-w-[800px]"
    >
      <div className="p-10">
        <div>
          <div className="flex justify-center items-center p-4 border-b">
            {/* Avatar */}
            <div className="text-xl sm:text-2xl font-bold">
              {currentRecord?.name}
            </div>
          </div>

          <div className="mt-5">
            <div className="grid lg:grid-cols-2 text-start gap-4 text-lg">
              {currentRecord?.contact?.email && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Email:</div>
                  <div>{currentRecord?.contact?.email}</div>
                </div>
              )}
              {currentRecord?.contact?.phone && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Phone:</div>
                  <div>{currentRecord?.contact?.phone}</div>
                </div>
              )}
              {currentRecord?.address && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Address:</div>
                  <div>{`${currentRecord?.address?.street}, ${currentRecord?.address?.city}, ${currentRecord?.address?.state}, ${currentRecord?.address?.zip}`}</div>
                </div>
              )}
            </div>
          </div>

          {/* Purchase History */}
          <div className="mt-5">
            <h3 className="text-lg font-bold mb-2">Purchase History:</h3>
            <ConfigProvider
              theme={{
                components: {
                  Table: {
                    padding: 5,
                    fontSize: 14,
                    headerBg: "#2774c2",
                    headerColor: "rgba(255,255,255,0.88)",
                  },
                },
              }}
            >
              <Table
                bordered
                dataSource={currentRecord?.purchase_history}
                columns={[
                  {
                    title: "Order ID",
                    dataIndex: "order_id",
                    key: "order_id",
                    align: "center",
                  },
                  {
                    title: "Order Date",
                    dataIndex: "order_date",
                    key: "order_date",
                    align: "center",
                    render: (date) => dayjs(date).format("DD-MM-YYYY"),
                  },
                  {
                    title: "Total Order Value",
                    dataIndex: "total_order_value",
                    key: "total_order_value",
                    align: "center",
                    render: (value) => `$${value.toFixed(2)}`,
                  },
                  {
                    title: "Order Status",
                    dataIndex: "order_status",
                    key: "order_status",
                    align: "center",
                  },
                ]}
                rowKey="order_id"
              />
            </ConfigProvider>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewCustomerModal;
