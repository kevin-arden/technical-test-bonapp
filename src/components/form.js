import React from "react";
import moment from "moment";
import "../App.css";
import { Form, Input, DatePicker, Button } from "antd";

const FormTemplate = (props) => {
  const { setTodo, todo, closeModal, detailData, type } = props;
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    let payload = {
      key: Math.random().toString(16).slice(2),
      title: values.title,
      detail: values.detail,
      date: moment(values.date._d).format("YYYY-MM-DD"),
    };

    if (type === "Form") {
      setTodo((oldtodo) => [...oldtodo, payload]);
    } else if (type === "Edit") {
      const updateData = [...todo];
      const arrayIndex = updateData.findIndex(
        (item) => item.key === detailData[0].key
      );
      delete payload.key;
      payload.key = detailData[0].key;
      updateData[arrayIndex] = payload;
      setTodo(updateData);
    }

    onReset();
    closeModal();
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please input the title" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Date"
        name="date"
        rules={[{ required: true, message: "Please input the date" }]}
      >
        <DatePicker picker="date" format="YYYY-MM-DD" />
      </Form.Item>
      <Form.Item label="Detail" name="detail">
        <Input.TextArea />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="margin">
          Submit
        </Button>
        <Button htmlType="button" onClick={() => onReset()}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormTemplate;
