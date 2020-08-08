import React from "react";
import { Modal, Form, Input, Button, Select } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default class BatchForm extends React.Component {
  layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };

  render() {
    return (
      <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item label="Course" name="course">
            <Select
            >
              <Option value="bit">BIT</Option>
              <Option value="diploma">IT Diploma</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Branch" name="branch">
          <Select
            >
              <Option value="colombo">Colombo</Option>
              <Option value="gampaha">Gampaha</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Year" name="year">
            <Input />
          </Form.Item>
        </Form>
    );
  }
}
