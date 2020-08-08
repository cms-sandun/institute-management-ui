import React from "react";
import ReactDOM from "react-dom";
import { Table, Tag, Space, Button, Modal } from "antd";
import BatchForm from "./BatchForm";

export default class BatchManagement extends React.Component {
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
      title: "Batch Name",
      dataIndex: "batchName",
      key: "batchName",
    },
    {
      title: "Student Count",
      dataIndex: "stuCount",
      key: "stuCount",
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
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
      batchName: "BIT-COL-SEM1-2020",
      stuCount: "125",
      course: "BIT-SEM1",
      branch: "Colombo",
    },
    {
      key: "1",
      batchName: "BIT-GAM-SEM2-2020",
      stuCount: "180",
      course: "BIT-SEM2",
      branch: "Gampaha",
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
        <Button
          style={{ float: "right", marginBottom: "10px", zIndex: "1" }}
          type="primary"
          className="success-btn"
          onClick={this.showModal}
        >
          Add New
        </Button>
        <Table columns={this.columns} dataSource={this.data} />
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          title="Batch Form"
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Clear
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
            <BatchForm/>
        </Modal>
      </div>
    );
  }
}
