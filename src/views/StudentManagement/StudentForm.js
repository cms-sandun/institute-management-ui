import React from "react";
import {Form, Input, Upload, Select, Button, notification, DatePicker} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import studentService from "../../services/studentService";
import moment from "moment";
const {Option} = Select;

export default class StudentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentID: props.student ? props.student.id : '',
      firstName: props.student ? props.student.first_name : '',
      lastName: props.student ? props.student.last_name : '',
      address: props.student ? props.student.address : '',
      gender: props.student ? props.student.gender : 'male',
      contactNo: props.student ? props.student.contact_no : '',
      dob: props.student ? props.student.dob : '',
      email: props.student ? props.student.email : '',
      profileImage:'',
      firstNameError: "",
      middleNameError: "",
      lastNameError: "",
      addressError: "",
      contactNoError: "",
      dobError: "",
      emailError: ""
    };

    //console.log(this.props.student)

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.resetErrorLabels = this.resetErrorLabels.bind(this);
    this.setValidationError = this.setValidationError.bind(this);
    this.onInputFieldChangeHandler = this.onInputFieldChangeHandler.bind(this);
    this.onGenderChangeHandler = this.onGenderChangeHandler.bind(this);
    this.onDOBChangeHandler = this.onDOBChangeHandler.bind(this);
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
      emailError: ""
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

  onGenderChangeHandler(value) {
    this.setState({
      gender: value,
    });
  }

  onDOBChangeHandler(value) {
    this.setState({
      dob: value,
    });
  }

  setValidationError(errorField, errorMsg) {
    this.setState({
      [errorField]: errorMsg
    });
  }

  async onSubmitHandler(event) {
    this.resetErrorLabels();
    let haveErrors = false;

    // Validate first name
    if (!this.state.firstName) {
      this.setValidationError("firstNameError", "First name cannot be empty");
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
    }else{
      // Check if valid phone
      const regex = /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/;
      if(!regex.test(this.state.contactNo)){
        this.setValidationError("contactNoError", "Invalid phone number");
        haveErrors = true
      }
    }

    // Validate DOB
    if (!this.state.dob) {
      this.setValidationError("dobError", "DOB cannot be empty");
      haveErrors = true
    }else{
      var a = moment();
      var b = moment(this.state.dob, 'YYYY');
      var age = a.diff(b, 'years');
      if(age <= 6 || age >=60){
        this.setValidationError("dobError", "Age should be between 6 and 60");
        haveErrors = true
      }
    }

    // Validate email
    if (!this.state.email) {
      this.setValidationError("emailError", "Email cannot be empty");
      haveErrors = true
    }else{
      // Check if valid email
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(!regex.test(this.state.email)){
        this.setValidationError("emailError", "Invalid email");
        haveErrors = true
      }
    }

    if(haveErrors) return

    /*const payload = {
      branchId: 2,
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      address: this.state.address,
      gender: this.state.gender,
      contactNo: this.state.contactNo,
      dob: this.state.dob,
      email: this.state.email,
    }*/


    const payload = new FormData();
    payload.append('profileImage',this.state.profileImage)
    payload.append('firstName',this.state.firstName)
    payload.append('middleName',this.state.middleName)
    payload.append('lastName',this.state.lastName)
    payload.append('address',this.state.address)
    payload.append('gender',this.state.gender)
    payload.append('contactNo',this.state.contactNo)
    payload.append('dob',this.state.dob)
    payload.append('email',this.state.email)

    let response = null
    if (this.props.isNewRecord) {
      response = await studentService.saveStudent(payload);
    }else{
      response = await studentService.updateStudent(this.state.studentID, payload);
    }

    if (response.data.success) {
      this.openNotificationWithIcon("success", "Student", response.data.msg);
      this.resetErrorLabels();
      this.resetFields();
      this.props.loadTable();
    }else{
      this.openNotificationWithIcon("error", "Student", response.data.msg);
    }

  }

  handleImageUpload = (event) => {
    const file = event.file;
    if (file) {
      this.setState({
        profileImage:file
      })
    }
  }

  render() {
    return (
        <form>
          <div className='row'>
            <div className='col-md-4'>
              <Form.Item label="Profile Image" name="profileImage">
                <Upload.Dragger name="files" onChange={this.handleImageUpload}>
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
                    rules={[{ required: true, message: 'Missing sight' }]}
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
            </div>
            <div className='col-md-4'>
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
                <DatePicker  placeholder='DOB' className='w-100' onChange={this.onDOBChangeHandler} />
                <label className="error-label">
                  {this.state.dobError}
                </label>
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
