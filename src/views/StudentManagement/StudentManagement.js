import React from "react";
import StudentForm from "./StudentForm";
import { Table, Space, Button, Modal } from "antd";

export default class StudentManagement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Contact No",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Batch",
      dataIndex: "batch",
      key: "batch",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Update</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  data = [
    {
      key: "1",
      firstName: "Kasun",
      lastName: "Perera",
      contact: "0332225256",
      batch: "BIT-COL-2020",
    },
    {
      key: "2",
      firstName: "Charuka",
      lastName: "Maduranga",
      contact: "0770249809",
      batch: "BIT-COL-2020",
    },
    {
      key: "3",
      firstName: "Sandamali",
      lastName: "Niroshini",
      contact: "0770457656",
      batch: "BIT-COL-2020",
    },
    {
      key: "4",
      firstName: "Lahiru",
      lastName: "Mihiranga",
      contact: "0332220830",
      batch: "BIT-COL-2020",
    },
  ];

  showModal() {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <div>
          <Button
            style={{ float: "right", marginBottom: "10px", zIndex:'1' }}
            type="primary"
            className="success-btn"
            onClick={this.showModal}
          >
            Add New
          </Button>
        </div>
        <Table columns={this.columns} dataSource={this.data} />
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          title="Student Form"
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
          <StudentForm />
        </Modal>
      </div>
    );
  }
}
