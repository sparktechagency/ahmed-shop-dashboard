/* eslint-disable react/prop-types */
import { ConfigProvider, Modal, Table } from "antd";
// import { getImageUrl } from "../../utils/baseUrl";

const ViewSellerModal = ({ isViewSeller, handleCancel, currentRecord }) => {
  // const imageUrl = getImageUrl();

  return (
    <Modal
      title={
        <div className="">
          <h2 className="text-secondary-color text-2xl">Seller Details</h2>
        </div>
      }
      open={isViewSeller}
      onCancel={handleCancel}
      footer={null}
      centered
      style={{ textAlign: "center" }}
      className="lg:min-w-[800px]"
    >
      <div className="p-10">
        <div className="">
          <div className="flex justify-center items-center p-4 border-b">
            {/* Avatar */}
            {currentRecord?.image && (
              <img
                // src={`${imageUrl}/${currentRecord.image}`}
                src={currentRecord?.image}
                alt={currentRecord?.name}
                className="w-14 h-14 sm:w-20  sm:h-20 rounded-lg mr-4"
              />
            )}
            <div className="text-xl sm:text-2xl font-bold">
              {currentRecord?.name}
            </div>
          </div>

          <div className="mt-5">
            <div className="flex flex-col text-start gap-1 text-lg">
              {currentRecord?.email && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Email:</div>
                  <div>{currentRecord?.email}</div>
                </div>
              )}
              {currentRecord?.contact && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Contact number:</div>
                  <div>{currentRecord?.contact?.phone}</div>
                </div>
              )}
              {currentRecord?.address && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Address:</div>
                  <div>
                    {currentRecord?.address?.street},{" "}
                    {currentRecord?.address?.city},{" "}
                    {currentRecord?.address?.state},{" "}
                    {currentRecord?.address?.zip}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Display Owned Properties */}
          {currentRecord?.products && currentRecord?.products.length > 0 && (
            <div className="mt-5">
              <h3 className="text-lg font-bold mb-2">Products:</h3>
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
                  dataSource={currentRecord.products}
                  columns={[
                    {
                      title: "Product Name",
                      dataIndex: "name",
                      key: "name",
                      align: "center",
                    },
                    {
                      title: "Product Type",
                      dataIndex: "category",
                      key: "category",
                      align: "center",
                    },
                    {
                      title: "Price",
                      dataIndex: "price",
                      key: "price",
                      align: "center",
                    },
                    {
                      title: "Unit",
                      dataIndex: "unit",
                      key: "unit",
                      align: "center",
                    },
                    {
                      title: "Stock",
                      dataIndex: "stock",
                      key: "stock",
                      align: "center",
                    },
                  ]}
                  rowKey="name"
                />
              </ConfigProvider>
            </div>
          )}
        </div>
        {/* <button
          onClick={() => handleBlock(currentRecord)}
          className="bg-secondary-color text-primary-color py-3 text-xl font-semibold rounded-lg mt-8 w-full"
        >
          Block
        </button> */}
      </div>
    </Modal>
  );
};

export default ViewSellerModal;
