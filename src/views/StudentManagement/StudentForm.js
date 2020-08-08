import React from "react";
import { Form, Input, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

export default class StudentForm extends React.Component {

  constructor(props) {
    super(props);
  }

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
          <Form.Item label="Profile Image" name="profileImage">
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item label="First Name" name="firstName">
            <Input />
          </Form.Item>

          <Form.Item label="Middle Name" name="middleName">
            <Input />
          </Form.Item>

          <Form.Item label="Last Name" name="lastName">
            <Input />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input />
          </Form.Item>

          <Form.Item label="Gender" name="gender">
            <Input />
          </Form.Item>

          <Form.Item label="Contact No" name="contact">
            <Input />
          </Form.Item>

          <Form.Item label="DOB" name="dob">
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
        </Form>
    );
  }
}
