import React from "react";
import { Modal } from "antd";
import FormTemplate from "./form";
import DetailComponent from "./detail";
const ModalComponent = (props) => {
  const { viewModal, closeModal, setTodo, data, type, detailData } = props;

  const modalContent = () => {
    if (type === "Form") {
      return (
        <FormTemplate
          closeModal={closeModal}
          setTodo={setTodo}
          todo={data}
          type={type}
        />
      );
    } else if (type === "Detail") {
      return <DetailComponent detailData={detailData} />;
    } else if (type === "Edit") {
      return (
        <FormTemplate
          closeModal={closeModal}
          setTodo={setTodo}
          todo={data}
          detailData={detailData}
          type={type}
        />
      );
    }
  };

  return (
    <Modal
      title={type === "Detail" ? "" : `${type} Data`}
      visible={viewModal}
      onOk={() => closeModal()}
      onCancel={() => closeModal()}
      footer={null}
    >
      {modalContent()}
    </Modal>
  );
};

export default ModalComponent;
