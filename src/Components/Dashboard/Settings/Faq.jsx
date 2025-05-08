/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Button, ConfigProvider, Modal, message, Form, Pagination } from "antd";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import { FaQuestionCircle } from "react-icons/fa";
import TextArea from "antd/es/input/TextArea";

const allFaqData = [
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy. You can return most new, unopened items within 30 days of delivery for a full refund.",
  },
  {
    question: "How do I track my order?",
    answer:
      "Once your order has shipped, you will receive an email with a tracking number and link to track the package.",
  },
  {
    question: "Can I change or cancel my order?",
    answer:
      "If your order has not yet shipped, we may be able to cancel or modify it. Please contact our customer service team as soon as possible.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on the destination.",
  },
  {
    question: "How can I contact customer service?",
    answer:
      "You can contact our customer service team via email at support@example.com or by calling 1-800-123-4567.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and Apple Pay.",
  },
  {
    question: "Do you offer gift cards?",
    answer:
      "Yes, we offer digital gift cards in various denominations. You can purchase them on our website.",
  },
];

export default function FAQ() {
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newFaq, setNewFaq] = useState({
    question: "",
    answer: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingFaq, setEditingFaq] = useState(null);

  useEffect(() => {
    setFaqData(allFaqData);
  }, []);

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastFaq = currentPage * itemsPerPage;
  const indexOfFirstFaq = indexOfLastFaq - itemsPerPage;
  const currentFaqs = faqData.slice(indexOfFirstFaq, indexOfLastFaq);

  const handleModalClose = () => {
    setIsModalVisible(false);
    setIsEditMode(false);
    setNewFaq({
      question: "",
      answer: "",
    });
    setEditingFaq(null);
  };

  const showAddFaqModal = () => {
    setIsEditMode(false);
    setIsModalVisible(true);
  };

  const showEditFaqModal = (faq) => {
    setIsEditMode(true);
    setEditingFaq(faq);
    setNewFaq({
      question: faq.question,
      answer: faq.answer,
    });
    setIsModalVisible(true);
  };

  const handleSaveFaq = () => {
    if (isEditMode) {
      const updatedFaqData = faqData.map((faq) =>
        faq === editingFaq ? { ...faq, ...newFaq } : faq
      );
      setFaqData(updatedFaqData);
      message.success("FAQ updated successfully!");
    } else {
      setFaqData([...faqData, { ...newFaq, category_id: Date.now() }]);
      message.success("New FAQ added successfully!");
    }
    handleModalClose();
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultBg: "#2774C2",
            defaultColor: "rgba(255,255,255,0.88)",
            defaultHoverBg: "rgb(43,67,164)",
            defaultHoverColor: "rgb(224,236,252)",
            defaultHoverBorderColor: "rgb(195,222,255)",
          },
        },
      }}
    >
      <div className="p-5 h-screen">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-3xl font-bold text-[#333]">
            Frequently Asked Questions
          </h1>
          <div className="flex items-center gap-2">
            <button
              onClick={showAddFaqModal}
              className="h-12 w-full px-8 bg-[#2774C2] text-lg text-white rounded-lg font-semibold hover:bg-[#2774C2] transition duration-300 ease-in-out"
            >
              Add FAQs
            </button>
          </div>
        </div>

        {/* FAQ list */}
        <div className="mt-10">
          {currentFaqs.map((faq, index) => (
            <div
              key={index}
              className="flex items-end justify-between mb-4 pb-5 border-[#2774C2] border rounded-lg p-4"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <FaQuestionCircle fontSize={20} className="text-[#235f9b]" />
                  <h3 className="font-semibold text-lg">{faq.question}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <BiSolidMessageSquareDetail
                    fontSize={20}
                    className="text-[#235f9b]"
                  />
                  <p className="text-lg">{faq.answer}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={() => showEditFaqModal(faq)}>
                  <AiOutlineEdit fontSize={20} />
                </Button>
                <Button>
                  <MdOutlineDelete fontSize={20} />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          align="center"
          current={currentPage}
          total={faqData.length}
          pageSize={itemsPerPage}
          onChange={handlePaginationChange}
        />

        {/* Add New FAQ Modal */}
        <Modal
          title={
            isEditMode ? (
              <h2 className="text-secondary-color text-center text-xl underline">
                Edit FAQ
              </h2>
            ) : (
              <h2 className="text-secondary-color text-center text-xl underline">
                Add FAQ
              </h2>
            )
          }
          visible={isModalVisible}
          onCancel={handleModalClose}
          onOk={handleSaveFaq}
          width={600}
        >
          <Form layout="vertical">
            <Form.Item
              label="Question"
              value={newFaq.question}
              onChange={(e) =>
                setNewFaq({
                  ...newFaq,
                  question: e.target.value,
                })
              }
            >
              <TextArea
                value={newFaq.question}
                className="h-14"
                rows={2}
                onChange={(e) =>
                  setNewFaq({
                    ...newFaq,
                    question: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Form.Item
              label="Answer"
              value={newFaq.answer}
              onChange={(e) =>
                setNewFaq({
                  ...newFaq,
                  answer: e.target.value,
                })
              }
            >
              <TextArea
                value={newFaq.answer}
                className="h-28"
                rows={4}
                onChange={(e) =>
                  setNewFaq({
                    ...newFaq,
                    answer: e.target.value,
                  })
                }
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </ConfigProvider>
  );
}
