import React from "react";
import {Form, Input, Upload, Select, Button, notification, DatePicker} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import employeeService from "../../services/employeeService";

const {Option} = Select;

export default class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeID: props.employee ? props.employee.id : '',
      profileImage: props.employee ? props.employee.profileImage : '',
      firstName: props.employee ? props.employee.first_name : '',
      middleName: props.employee ? props.employee.middle_name : '',
      lastName: props.employee ? props.employee.last_name : '',
      empNo: props.employee ? props.employee.empNo : '',
      address: props.employee ? props.employee.address : '',
      gender: props.employee ? props.employee.gender : 'male',
      contactNo: props.employee ? props.employee.contact_no : '',
      email: props.employee ? props.employee.email : '',
      dob: props.employee ? props.employee.dob : '',
      qualifications: props.employee ? props.employee.qualifications : '',
      type: props.employee ? props.employee.type : 'academic',
      firstNameError: "",
      middleNameError: "",
      lastNameError: "",
      addressError: "",
      contactNoError: "",
      dobError: "",
      emailError: "",
      qualificationsError: "",
    };

    //console.log(this.props.employee)

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.resetErrorLabels = this.resetErrorLabels.bind(this);
    this.setValidationError = this.setValidationError.bind(this);
    this.onInputFieldChangeHandler = this.onInputFieldChangeHandler.bind(this);
    this.onGenderChangeHandler = this.onGenderChangeHandler.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
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
      qualificationsError: ""
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
      qualifications: "",
      profileImage: "",
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

  onGenderChangeHandler(value) {
    this.setState({
      gender: value,
    });
  }

  setValidationError(errorField, errorMsg) {
    this.setState({
      [errorField]: errorMsg
    });
  }

  handleImageUpload = (event) => {
    const file = event.file;
    if (file) {
      this.setState({
        profileImage:file
      })
    }
  }

  async onSubmitHandler(event) {
    this.resetErrorLabels();
    let haveErrors = false;

    // Validate first name
    if (!this.state.firstName) {
      this.setValidationError("firstNameError", "First name cannot be empty");
      haveErrors = true
    }

    // Validate middle name
    if (!this.state.middleName) {
      this.setValidationError("middleNameError", "Middle name cannot be empty");
      haveErrors = true
    }

    // Validate last name
    if (!this.state.lastName) {
      this.setValidationError("lastNameError", "Last name cannot be empty");
      haveErrors = true
    }

    // Validate address
    if (!this.state.address) {
      this.setValidationError("addressError", "Address cannot be empty");
      haveErrors = true
    }

    // Validate contact no
    if (!this.state.contactNo) {
      this.setValidationError("contactNoError", "Contact No cannot be empty");
      haveErrors = true
    }

    // Validate DOB
    if (!this.state.dob) {
      this.setValidationError("dobError", "DOB cannot be empty");
      haveErrors = true
    }

    // Validate email
    if (!this.state.email) {
      this.setValidationError("emailError", "Email cannot be empty");
      haveErrors = true
    }

    if(haveErrors) return

    // const payload = {
    //   branchId: 1,
    //   firstName: this.state.firstName,
    //   middleName: this.state.middleName,
    //   lastName: this.state.lastName,
    //   address: this.state.address,
    //   gender: this.state.gender,
    //   contactNo: this.state.contactNo,
    //   dob: this.state.dob,
    //   email: this.state.email,
    //   qualifications: this.state.qualifications,
    //   type: this.state.type,
    // }

    //way of sending as form data, unless images cannot upload
    const payload = new FormData();
    payload.append('profile_image',this.state.profileImage)
    payload.append('firstName',this.state.firstName)
    payload.append('middleName',this.state.middleName)
    payload.append('lastName',this.state.lastName)
    payload.append('address',this.state.address)
    payload.append('gender',this.state.gender)
    payload.append('contactNo',this.state.contactNo)
    payload.append('dob',this.state.dob)
    payload.append('email',this.state.email)
    payload.append('qualifications',this.state.qualifications)
    payload.append('type',this.state.type)

    let response = null
    if (this.props.isNewRecord) {
      response = await employeeService.saveEmployee(payload);
    }else{
      response = await employeeService.updateEmployee(this.state.employeeID, payload);
    }

    if (response.data.success) {
      this.openNotificationWithIcon("success", "Employee", response.data.msg);
      this.resetErrorLabels();
      this.resetFields();
      this.props.loadTable();
    }else{
      this.openNotificationWithIcon("error", "Employee", response.data.msg);
    }

  }

  render() {
    return (
        <form>
          <div className='row'>

          </div>
          <div className='row'>
            <div className='col-md-4'>
              <Form.Item label="Profile Image">
                <Upload.Dragger name="profileImage" onChange={this.handleImageUpload}>
                  <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                  </p>
                  <p className="ant-upload-text">
                    Click or drag file to this area to upload
                  </p>
                </Upload.Dragger>
              </Form.Item>
            </div>
            <div className='col-md-4'>
              <Form.Item>
                <Input
                    onChange={this.onInputFieldChangeHandler}
                    name="firstName"
                    value={this.state.firstName}
                    placeholder='First Name'
                />
                <label className="error-label">
                  {this.state.firstNameError}
                </label>
              </Form.Item>

              <Form.Item>
                <Input
                    onChange={this.onInputFieldChangeHandler}
                    name="middleName"
                    value={this.state.middleName}
                    placeholder='Middle Name'
                />
                <label className="error-label">
                  {this.state.middleNameError}
                </label>
              </Form.Item>

              <Form.Item>
                <Input
                    onChange={this.onInputFieldChangeHandler}
                    name="lastName"
                    value={this.state.lastName}
                    placeholder='Last Name'
                />
                <label className="error-label">
                  {this.state.lastNameError}
                </label>
              </Form.Item>

              <Form.Item>
                <TextArea
                    onChange={this.onInputFieldChangeHandler}
                    name="address"
                    value={this.state.address}
                    placeholder='Address'
                />
                <label className="error-label">
                  {this.state.addressError}
                </label>
              </Form.Item>

              <Form.Item>
                <Select
                    defaultValue={this.state.gender}
                    onChange={this.onGenderChangeHandler}
                    name="gender"
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Input
                    onChange={this.onInputFieldChangeHandler}
                    name="contactNo"
                    value={this.state.contactNo}
                    placeholder='Contact No'
                />
                <label className="error-label">
                  {this.state.contactNoError}
                </label>
              </Form.Item>

              <Form.Item>
                <Input
                    onChange={this.onInputFieldChangeHandler}
                    name="email"
                    value={this.state.email}
                    placeholder='Email'
                />
                <label className="error-label">
                  {this.state.emailError}
                </label>
              </Form.Item>

              <Form.Item>
                <input
                    className="form-control ant-form-item-control-input"
                    type="date"
                    onChange={this.onInputFieldChangeHandler}
                    name="dob"
                    placeholder='DOB'
                />
                <label className="error-label">
                  {this.state.dobError}
                </label>
              </Form.Item>

            </div>

            <div className='col-md-4'>
              <Form.Item>
                <TextArea
                    name="qualifications"
                    value={this.state.qualifications}
                    onChange={this.onInputFieldChangeHandler}
                    placeholder='Qualifications'
                />
                <label className="error-label">
                  {this.state.qualificationsError}
                </label>
              </Form.Item>

              <Form.Item>
                <Select
                    defaultValue={this.state.type}
                    onChange={this.onGenderChangeHandler}
                    name="type"
                >
                  <Option value="academic">Academic</Option>
                  <Option value="non-academic">Non Academic</Option>
                </Select>
              </Form.Item>

              <Form.Item style={{textAlign: "right"}}>
                <Button
                    className="form-button submit-button"
                    type="primary"
                    onClick={this.onSubmitHandler}
                >
                  Submit
                </Button>
              </Form.Item>
            </div>

          </div>
        </form>
    );
  }
}
