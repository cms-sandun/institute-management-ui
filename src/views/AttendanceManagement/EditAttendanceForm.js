import React from "react";
import {Form, Input, Upload, Select, Button, notification, DatePicker} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import studentService from "../../services/studentService";
import QrReader from 'react-qr-reader'
import { Card } from 'antd';
const { Meta } = Card;

const {Option} = Select;

export default class EditAttendanceForm extends React.Component {
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
      result: 'S. Niroshini'
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
    this.openNotificationWithIcon("success", "Attendance", "Successfully Updated");
  }

  render() {
    return (
        <form>
          <div className='row'>
            <div className='col-md-12'>

              <Form.Item>
                <div className='row'>
                  <div className='col-md-3'>
                    <label>Status</label>
                  </div>

                  <div className='col-md-9'>
                    <Select placeholder="Select Status">
                      <Option>Present</Option>
                      <Option>Absent</Option>
                    </Select>
                  </div>
                </div>
              </Form.Item>


              <Form.Item>
                <div className='row'>
                  <div className='col-md-3'>
                    <label>Notes</label>
                  </div>

                  <div className='col-md-9'>
                    <TextArea>

                    </TextArea>
                  </div>
                </div>
              </Form.Item>

              <Form.Item>
                <div className='row'>
                  <div className='col-md-12 text-right'>
                    <Button
                        className="form-button submit-button"
                        type="primary"
                        onClick={this.onSubmitHandler}
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </Form.Item>

            </div>
          </div>
        </form>
    );
  }
}
