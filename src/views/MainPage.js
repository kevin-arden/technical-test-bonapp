import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Input,
  Space,
  List,
  Skeleton,
  Select,
  Table,
} from "antd";
import moment from "moment";
import ModalComponent from "../components/modal";
import "../App.css";
import { SearchOutlined } from "@ant-design/icons";

const MainPage = () => {
  const [todo, setTodo] = useState([]);
  const [dataTodo, setDataTodo] = useState(todo ? todo : null);
  const [value, setValue] = useState("");
  const [modalType, setModalType] = useState();
  const [viewModal, setViewModal] = useState(false);
  const [dataDetail, setDataDetail] = useState(false);

  const showModal = (type, id) => {
    setModalType(type);
    setViewModal(true);
    if (id) {
      setDataDetail(todo.filter((item) => item.key === id));
    }
  };

  const closeModal = () => {
    setViewModal(false);
  };

  const deleteItem = (key) => {
    setTodo(todo.filter((item) => item.key !== key));
  };

  let sorted = [];
  const sortList = (type) => {
    if (type === "Ascending") {
      sorted = dataTodo.sort((a, b) => {
        let dateA = a.date;
        let dateB = b.date;
        if (dateA < dateB) {
          return -1;
        }
        if (dateA > dateB) {
          return 1;
        }
        return 0;
      });
    } else if (type === "Descending") {
      sorted = dataTodo.sort((a, b) => {
        let dateA = a.date;
        let dateB = b.date;
        if (dateA > dateB) {
          return -1;
        }
        if (dateA < dateB) {
          return 1;
        }
        return 0;
      });
    }
  };

  useEffect(() => {
    setDataTodo(todo);
  }, [todo]);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, item) => (
        <div className="action-container">
          <a
            onClick={() => showModal("Detail", item.key)}
            className="decoration-none"
          >
            {item.title}
          </a>
        </div>
      ),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: {
        compare: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, item) => (
        <div className="action-container">
          <a onClick={() => deleteItem(item.key)}>Delete</a>
          <a onClick={() => showModal("Edit", item.key)}>Edit</a>
        </div>
      ),
    },
  ];

  return (
    <>
      <Row>
        <Col
          lg={{ span: 16, offset: 4 }}
          md={{ span: 18, offset: 3 }}
          sm={{ span: 20, offset: 2 }}
          xs={{ span: 22, offset: 1 }}
        >
          <h1>Todo List App</h1>
        </Col>
      </Row>
      <Row>
        <Col
          lg={{ span: 16, offset: 4 }}
          md={{ span: 18, offset: 3 }}
          sm={{ span: 20, offset: 2 }}
          xs={{ span: 22, offset: 1 }}
        >
          <Button type="primary" onClick={() => showModal("Form")}>
            Add Something To Do
          </Button>
          <ModalComponent
            type={modalType}
            viewModal={viewModal}
            closeModal={closeModal}
            setTodo={setTodo}
            detailData={modalType === "form" ? null : dataDetail}
            data={todo}
          />
        </Col>
      </Row>
      <Row className="pad">
        <Col
          lg={{ span: 16, offset: 4 }}
          md={{ span: 18, offset: 3 }}
          sm={{ span: 20, offset: 2 }}
          xs={{ span: 22, offset: 1 }}
        >
          <Input
            placeholder="Find Item"
            value={value}
            onChange={(e) => {
              console.log(e.target.value);
              const currValue = e.target.value;
              setValue(currValue);
              const filteredData = todo.filter((entry) =>
                entry.title.includes(currValue)
              );
              setDataTodo(filteredData);
            }}
          />
          {/* <Select
            defaultValue="Sort By"
            bordered={false}
            style={{ width: 120 }}
            onChange={sortList}
          >
            <Select.Option value="Sort By">Sort By</Select.Option>
            <Select.Option value="Ascending">Ascending</Select.Option>
            <Select.Option value="Descending">Descending</Select.Option>
          </Select> */}
          <Table
            dataSource={dataTodo}
            columns={columns}
            rowSelection={"checkbox"}
          />
          {/* <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={dataTodo}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <a onClick={() => deleteItem(item.key)}>Delete</a>,

                  <a onClick={() => showModal("Edit", item.key)}>Edit</a>,
                ]}
              >
                <Skeleton avatar title={false} loading={item.loading} active>
                  <List.Item.Meta
                    title={
                      <a onClick={() => showModal("Detail", item.key)}>
                        {item.title}
                      </a>
                    }
                    description={item.date}
                  />
                </Skeleton>
              </List.Item>
            )}
          /> */}
        </Col>
      </Row>
    </>
  );
};

export default MainPage;
