/* eslint-disable react/prop-types */
import { Modal } from "antd";
import { getImageUrl } from "../../utils/baseUrl";

const ViewSellerModal = ({ isViewSeller, handleCancel, currentRecord }) => {
  const imageUrl = getImageUrl();

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
            {currentRecord?.image && (
              <img
                src={`${imageUrl}/${currentRecord.image}`}
                alt={currentRecord?.fullName}
                className="w-14 h-14 sm:w-20  sm:h-20 rounded-lg mr-4"
              />
            )}
            <div className="text-xl sm:text-2xl font-bold">
              {currentRecord?.fullName}
            </div>
          </div>

          <div className="mt-5">
            <div className="flex flex-col text-start gap-1 text-lg">
              <div className="sm:flex gap-1">
                <div className="font-bold">Seller ID :</div>
                <div>{currentRecord?._id}</div>
              </div>
              {currentRecord?.email && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Email :</div>
                  <div>{currentRecord?.email}</div>
                </div>
              )}
              {currentRecord?.phone && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Contact :</div>
                  <div>{currentRecord?.phone}</div>
                </div>
              )}
              {currentRecord?.address && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Address :</div>
                  <div>{currentRecord?.address}</div>
                </div>
              )}
              {currentRecord?.isActive && (
                <div className="sm:flex gap-1">
                  <div className="font-bold">Status :</div>
                  <div>
                    {currentRecord?.isActive ? (
                      <p className="text-lg font-semibold text-green-600">
                        Active
                      </p>
                    ) : (
                      <p className="text-lg font-semibold text-red-600">
                        Inactive
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewSellerModal;
