import React from "react";
import {Form, Input, Upload, Select, Button, notification, DatePicker} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import studentService from "../../services/studentService";
import QrReader from 'react-qr-reader'
import { Card } from 'antd';
const { Meta } = Card;

const {Option} = Select;

export default class MarkAttendanceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentID: props.student ? props.student.id : '',
      firstName: props.student ? props.student.first_name : '',
      lastName: props.student ? props.student.last_name : '',
      middleName: props.student ? props.student.middle_name : '',
      address: props.student ? props.student.address : '',
      gender: props.student ? props.student.gender : 'male',
      contactNo: props.student ? props.student.contact_no : '',
      dob: props.student ? props.student.dob : '',
      email: props.student ? props.student.email : '',
      firstNameError: "",
      middleNameError: "",
      lastNameError: "",
      addressError: "",
      contactNoError: "",
      dobError: "",
      emailError: "",
      result: 'No result'
    };

    //console.log(this.props.student)

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.resetErrorLabels = this.resetErrorLabels.bind(this);
    this.setValidationError = this.setValidationError.bind(this);
    this.onInputFieldChangeHandler = this.onInputFieldChangeHandler.bind(this);
    this.onGenderChangeHandler = this.onGenderChangeHandler.bind(this);
  }

  handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
  }

  handleError = err => {
    console.error(err)
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

    const payload = {
      branchId: 2,
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      address: this.state.address,
      gender: this.state.gender,
      contactNo: this.state.contactNo,
      dob: this.state.dob,
      email: this.state.email,
    }

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

  render() {
    return (
        <form>
          <div className='row'>
            <div className='col-md-6'>
              <Form.Item label="Scan QR" name="profileImage">
                <QrReader
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '400px' }}
                />
              </Form.Item>
            </div>
            <div className='col-md-6'>

              <Form.Item>
                <div className='row'>
                  <div className='col-md-3'>
                    <label>Select Date</label>
                  </div>

                  <div className='col-md-9'>
                    <DatePicker style={{width:'100%'}}/>
                  </div>
                </div>
              </Form.Item>

              <Form.Item>
                <div className='row'>
                  <div className='col-md-3'>
                    <label>Select Class</label>
                  </div>

                  <div className='col-md-9'>
                    <Select style={{width:'100%'}}>
                      <Option>System Analysis and Design</Option>
                    </Select>
                  </div>
                </div>
              </Form.Item>

              <Form.Item>
                <div className='row'>
                  <div className='col-md-3'>
                    <label>Student Profile</label>
                  </div>

                  <div className='col-md-9'>
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="example" src={window.location.origin+"/placeholder.png"} />}
                    >
                      <Meta title={"Student Name : "+this.state.result} description="Student ID : 1655457" />
                    </Card>
                  </div>
                </div>
              </Form.Item>




            </div>
          </div>
        </form>
    );
  }
}
