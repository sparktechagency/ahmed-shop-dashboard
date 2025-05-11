import { useState } from "react";
import {
  Button,
  ConfigProvider,
  Input,
  Modal,
  Table,
  Tooltip,
  Form,
  Upload,
  Switch,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { RiEdit2Fill } from "react-icons/ri";
import {
  useAllCategoryQuery,
  useChangeCategoryStatusMutation,
  useCreateCategoryMutation,
} from "../../Redux/api/categoryApi";
import { getImageUrl } from "../../utils/baseUrl";
import { toast } from "sonner";

const Category = () => {
  const [searchText, setSearchText] = useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [newCategory, setNewCategory] = useState({
    categoryName: "",
    image: "",
  });

  const { data: categoryData, loading, refetch } = useAllCategoryQuery();
  const allCategory = categoryData?.data;
  console.log("categoryData", allCategory);

  const [addCategory] = useCreateCategoryMutation();
  const [changeStatus] = useChangeCategoryStatusMutation();

  const imageUrl = getImageUrl();

  const filteredCategoryData =
    allCategory &&
    allCategory.filter((category) =>
      category.name.toLowerCase().includes(searchText.toLowerCase())
    );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const showAddCategoryModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddCategoryCancel = () => {
    setIsAddModalVisible(false);
    setNewCategory({
      categoryName: "",
      image: "",
    });
  };

  const handleImageUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      toast.error("You can only upload image files!");
      return false;
    }

    const displayImage = URL.createObjectURL(file);

    setNewCategory({
      ...newCategory,
      image: file,
      imagePreview: displayImage,
    });

    return false;
  };

  const handleAddCategoryOk = async () => {
    try {
      if (!newCategory.categoryName || !newCategory.image) {
        toast.error("Category name and image are required!");
        return;
      }
      const formData = new FormData();
      formData.append("name", newCategory.categoryName);
      formData.append("image", newCategory.image);

      const response = await addCategory(formData).unwrap();

      if (response?.success) {
        toast.success("Category Added Successfully");
        setIsAddModalVisible(false);
        setNewCategory({
          categoryName: "",
          image: "",
          imagePreview: "",
        });
        refetch();
      } else {
        toast.error("Failed");
      }
    } catch (error) {
      console.log("Error Adding Category", error);
      toast.error("Error adding category");
    }
  };

  const handleChangeCategoryStatus = async (checked, categoryId) => {
    console.log("id", categoryId);
    try {
      const categoryToUpdate = allCategory.find(
        (category) => category._id === categoryId
      );
      const newStatus = !categoryToUpdate.isActive;
      const response = await changeStatus({
        id: categoryId,
        data: { isActive: newStatus },
      }).unwrap();

      if (response?.success) {
        console.log("response", response);
        toast.success("Category Status Updated Successfully!");
        refetch();
      } else {
        toast.error("Failed to update category status.");
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("Error updating category status");
    }
  };

  const columns = [
    {
      title: "Category ID",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <span>{text}</span>,
      align: "center",
    },
    {
      title: "Cover Image",
      dataIndex: "image",
      key: "image",
      render: (record) => (
        <img
          src={`${imageUrl}/${record}`}
          alt="category"
          className="rounded-full size-12 object-cover mx-auto"
        />
      ),
      align: "center",
    },
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div>
          {console.log(record)}
          <Tooltip placement="right" title="Change Status">
            <Switch
              size="medium"
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              checked={record.isActive}
              onChange={(status) =>
                handleChangeCategoryStatus(status, record._id)
              }
            ></Switch>
          </Tooltip>
        </div>
      ),
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
              <Form.Item label="Category Image">
                <Upload
                  showUploadList={true}
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
                {newCategory.imagePreview && (
                  <div style={{ marginTop: 10 }}>
                    <img
                      src={newCategory.imagePreview}
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
