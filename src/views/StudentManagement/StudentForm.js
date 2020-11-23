import React from "react";
import { Form, Input, Upload, Select, Button, notification } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import studentService from "../../services/studentService";
const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const buttonItemLayout = {
  wrapperCol: { span: 16, offset: 10 },
};

export default class StudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: props.student.first_name,
      lastName: props.student.last_name,
      middleName: props.student.middle_name,
      address: props.student.address,
      gender: props.student.gender != undefined ? props.student.gender : 'male',
      contactNo: props.student.contact_no,
      dob: props.student.dob,
      email: props.student.email,
      firstNameError: "",
      middleNameError: "",
      lastNameError: "",
      addressError: "",
      contactNoError: "",
      dobError: "",
      emailError: "",
    };

    //console.log(this.props.student)

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.resetErrorLabels = this.resetErrorLabels.bind(this);
    this.setValidationError = this.setValidationError.bind(this);
    this.onInputFieldChangeHandler = this.onInputFieldChangeHandler.bind(this);
  }

  resetErrorLabels() {
    this.setState({
      firstNameError: "",
      middleNameError: "",
      lastNameError: "",
      addressError: "",
      contactNoError: "",
      dobError: "",
      emailError: "",
    });
  }

  resetFields() {
    this.setState({
      firstName: "",
      lastName: "",
      middleName: "",
      address: "",
      gender: "male",
      contactNo: "",
      dob: "",
      email: "",
    });
  }

  openNotificationWithIcon(type, title, msg) {
    notification[type]({
      message: title,
      description: msg,
    });
  }

  onInputFieldChangeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  setValidationError(errorField, errorMsg) {
    this.setState({
      [errorField]: errorMsg,
    });
  }

  async onSubmitHandler(event) {
    this.resetErrorLabels();

    // Validate first name
    if (!this.state.firstName) {
      this.setValidationError("firstNameError", "First name cannot be empty");
    }

    // Validate middle name
    if (!this.state.middleName) {
      this.setValidationError("middleNameError", "Middle name cannot be empty");
    }

    // Validate last name
    if (!this.state.lastName) {
      this.setValidationError("lastNameError", "Last name cannot be empty");
    }

    // Validate address
    if (!this.state.address) {
      this.setValidationError("addressError", "Address cannot be empty");
    }

    // Validate contact no
    if (!this.state.contactNo) {
      this.setValidationError("contactNoError", "Contact No cannot be empty");
    }

    // Validate DOB
    if (!this.state.dob) {
      this.setValidationError("dobError", "DOB cannot be empty");
    }

    // Validate email
    if (!this.state.email) {
      this.setValidationError("emailError", "Email cannot be empty");
    }

    const response = await studentService.saveStudent({
      branchId: 2,
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      address: this.state.address,
      gender: this.state.gender,
      contactNo: this.state.contactNo,
      dob: this.state.dob,
      email: this.state.email,
    });

    if (response.data.success) {
      this.openNotificationWithIcon("success", "Student", "Successfully saved");
      this.resetErrorLabels();
      this.resetFields();
    }
  }

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

        <Form.Item label="First Name">
          <Input
            onChange={this.onInputFieldChangeHandler}
            name="firstName"
            value={this.state.firstName}
          />
          <label className="form-control error-label">
            {this.state.firstNameError}
          </label>
        </Form.Item>

        <Form.Item label="Middle Name">
          <Input
            onChange={this.onInputFieldChangeHandler}
            name="middleName"
            value={this.state.middleName}
          />
          <label className="form-control error-label">
            {this.state.middleNameError}
          </label>
        </Form.Item>

        <Form.Item label="Last Name">
          <Input
            onChange={this.onInputFieldChangeHandler}
            name="lastName"
            value={this.state.lastName}
          />
          <label className="form-control error-label">
            {this.state.lastNameError}
          </label>
        </Form.Item>

        <Form.Item label="Address">
          <TextArea
            onChange={this.onInputFieldChangeHandler}
            name="address"
            value={this.state.address}
          />
          <label className="form-control error-label">
            {this.state.addressError}
          </label>
        </Form.Item>

        <Form.Item label="Gender">
          <Select
            defaultValue={this.state.gender}
            onChange={this.onInputFieldChangeHandler}
            name="gender"
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Contact No">
          <Input
            onChange={this.onInputFieldChangeHandler}
            name="contactNo"
            value={this.state.contactNo}
          />
          <label className="form-control error-label">
            {this.state.contactNoError}
          </label>
        </Form.Item>

        <Form.Item label="DOB">
          <input
            className="form-control ant-form-item-control-input"
            type="date"
            onChange={this.onInputFieldChangeHandler}
            name="dob"
          />
          <label className="form-control error-label">
            {this.state.dobError}
          </label>
        </Form.Item>

        <Form.Item label="Email">
          <Input
            onChange={this.onInputFieldChangeHandler}
            name="email"
            value={this.state.email}
          />
          <label className="form-control error-label">
            {this.state.emailError}
          </label>
        </Form.Item>

        <Form.Item style={{ textAlign: "right" }} {...buttonItemLayout}>
          <Button
            className="form-button submit-button"
            type="primary"
            onClick={this.onSubmitHandler}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
