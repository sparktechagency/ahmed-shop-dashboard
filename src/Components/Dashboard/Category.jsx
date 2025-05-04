import { useState, useEffect } from "react";
import {
  Button,
  ConfigProvider,
  Input,
  Modal,
  Space,
  Table,
  Tooltip,
  message,
  Form,
  Upload,
  Switch,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { GoEye } from "react-icons/go";
import { RiEdit2Fill } from "react-icons/ri";

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    // description: "",
    image: "",
    products: [],
  });

  // Fetch category data (or replace with your actual API)
  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        // Simulating fetching category data, replace with your actual data source
        const response = await axios.get("data/categoryData.json"); // Change the path
        setCategoryData(response.data);
      } catch (error) {
        console.error("Error fetching category data", error);
        message.error("Failed to load category data");
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryData();
  }, []);

  // Filter categories based on search text
  const filteredCategoryData = categoryData.filter((category) =>
    category.categoryName.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const showCategoryDetailsModal = (record) => {
    setSelectedCategory(record);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedCategory(null);
  };

  const showAddCategoryModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddCategoryCancel = () => {
    setIsAddModalVisible(false);
    setNewCategory({
      categoryName: "",
      // description: "",
      image: "",
      products: [],
    });
  };

  const handleAddCategoryOk = () => {
    setCategoryData([
      ...categoryData,
      { ...newCategory, category_id: Date.now() },
    ]);
    setIsAddModalVisible(false);
    setNewCategory({
      categoryName: "",
      // description: "",
      image: "",
      products: [],
    });
    message.success("New category added successfully!");
  };

  const handleImageUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }

    setNewCategory({
      ...newCategory,
      image: URL.createObjectURL(file),
    });

    return false;
  };

  const changeStatus = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const columns = [
    {
      title: "Category ID",
      dataIndex: "category_id",
      key: "category_id",
      render: (text) => <span>{text}</span>,
      align: "center",
    },
    {
      title: "Cover Image",
      dataIndex: "image",
      key: "image",
      render: (record) => (
        <img
          src={record}
          alt="category"
          className="rounded-full size-12 object-cover mx-auto"
        />
      ),
      align: "center",
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text) => <span>{text}</span>,
      align: "center",
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text) => <span>{text}</span>,
    //   align: "center",
    // },
    {
      title: "Total Products",
      dataIndex: "products",
      key: "products",
      render: (products) => (
        <div>{products.length > 0 ? products.length : 0}</div>
      ),
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="flex items-center justify-center gap-5">
          <Tooltip placement="left" title="View Details">
            <Button
              className="!p-0"
              style={{
                background: "#FFFFFF",
                border: "none",
                color: "#222222",
              }}
              onClick={() => showCategoryDetailsModal(record)}
            >
              <GoEye style={{ fontSize: "24px" }} />
            </Button>
          </Tooltip>
          <Tooltip placement="right" title="Change Status">
            <Switch
              size="medium"
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked
              className="!p-0"
              onChange={changeStatus}
              // style={{
              //   background: "#FFFFFF",
              //   border: "none",
              //   color: "#222222",
              // }}
              // onClick={() => showCategoryDetailsModal(record)}
            ></Switch>
          </Tooltip>
        </div>
      ),
    },
  ];

  // Columns for the product table inside the modal
  const productColumns = [
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
      render: (text) => <span>{text}</span>,
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => <span>${text.toFixed(2)}</span>,
      align: "center",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (text) => <span>{text}</span>,
      align: "center",
    },
    {
      title: "Availability",
      dataIndex: "availability",
      key: "availability",
      render: (text) => <span>{text}</span>,
      align: "center",
    },
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
          <h1 className="text-3xl font-bold text-[#333]">Product Categories</h1>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search Category..."
              value={searchText}
              onChange={handleSearch}
              style={{ width: "100%", height: 40 }}
              prefix={<SearchOutlined />}
            />
            <button
              onClick={showAddCategoryModal}
              className="h-10 w-full bg-[#0080FF] text-white rounded-lg font-semibold hover:bg-[#2774C2] transition duration-300 ease-in-out"
            >
              Add New Category
            </button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredCategoryData}
          loading={loading}
          rowKey="category_id"
          pagination={{ pageSize: 5 }}
        />

        {/* Modal for Category Details */}
        <Modal
          title={
            <div className="">
              <h2 className="text-secondary-color text-center text-xl underline">
                Category Type -{" "}
                <span className="font-semibold text-2xl">
                  {selectedCategory?.categoryName}
                </span>
              </h2>
            </div>
          }
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={null}
          width={800}
          height={600}
          centered
        >
          {selectedCategory && (
            <div className="flex flex-col gap-2">
              <div className="flex items-center ">
                <div>
                  {/* <p>
                    Description:{" "}
                    <span className="text-lg font-semibold">
                      {selectedCategory.description}
                    </span>
                  </p> */}
                  <p>
                    Total Products :{" "}
                    <span className="text-lg font-semibold">
                      {selectedCategory.products.length}
                    </span>
                  </p>
                </div>
                <img
                  src={selectedCategory.image}
                  alt="category"
                  className="rounded-full size-28 object-cover mx-auto"
                />
              </div>
              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      headerBg: "#2774c2",
                      headerColor: "rgba(255,255,255,0.88)",
                      padding: 5,
                      fontSize: 14,
                    },
                  },
                }}
              >
                <Table
                  columns={productColumns}
                  dataSource={selectedCategory.products}
                  pagination={false}
                  rowKey="product_id"
                />
              </ConfigProvider>
            </div>
          )}
        </Modal>

        {/* Add New Category Modal */}
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: "#0080FF",
                colorPrimaryHover: "#2774C2",
                colorPrimaryActive: "rgb(62,62,62)",
              },
            },
          }}
        >
          <Modal
            title={
              <div className="">
                <h2 className="text-secondary-color text-center text-xl underline">
                  Add New Category
                </h2>
              </div>
            }
            visible={isAddModalVisible}
            onCancel={handleAddCategoryCancel}
            onOk={handleAddCategoryOk}
            width={500}
          >
            <Form layout="vertical">
              <Form.Item
                label="Category Name"
                value={newCategory.categoryName}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    categoryName: e.target.value,
                  })
                }
              >
                <Input
                  value={newCategory.categoryName}
                  className="h-10 w-2/3"
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      categoryName: e.target.value,
                    })
                  }
                />
              </Form.Item>
              {/* <Form.Item
                label="Description"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
              >
                <Input
                  value={newCategory.description}
                  className="h-10"
                  onChange={(e) =>
                    setNewCategory({
                      ...newCategory,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Item> */}
              <Form.Item label="Category Image">
                <Upload
                  showUploadList={false}
                  beforeUpload={handleImageUpload}
                  accept="image/*"
                >
                  <ConfigProvider>
                    <Button
                      className="bg-[#2774C2] text-white h-10"
                      icon={<RiEdit2Fill />}
                    >
                      Upload Category Image
                    </Button>
                  </ConfigProvider>
                </Upload>
                {/* Display uploaded image if exists */}
                {newCategory.image && (
                  <div style={{ marginTop: 10 }}>
                    <img
                      src={newCategory.image}
                      alt="Category"
                      style={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        marginTop: 10,
                      }}
                    />
                  </div>
                )}
              </Form.Item>
            </Form>
          </Modal>
        </ConfigProvider>
      </div>
    </ConfigProvider>
  );
};

export default Category;
