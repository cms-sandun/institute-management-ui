import React from "react";
import {Form, Input, Upload, Select, DatePicker, Button, notification} from "antd";
import studentService from "../../services/studentService";
import QrReader from 'react-qr-reader'
import {Card} from 'antd';
import studentAttendanceService from "../../services/studentAttendanceService";

const {Meta} = Card;

const {Option} = Select;

export default class StuMarkAttendanceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: '',
      isHiddenStuProfile: true
    };

    this.setValidationError = this.setValidationError.bind(this);
    this.onInputFieldChangeHandler = this.onInputFieldChangeHandler.bind(this);
    this.submitAttendance = this.submitAttendance.bind(this);
  }

  handleScan = data => {
    if (data) {
      studentService.getStudentById(data).then(response => {
        this.setState({
          result: response.data.data,
          isHiddenStuProfile: false
        })
      })
    }
  }


  onInputFieldChangeHandler(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  setValidationError(errorField, errorMsg) {
    this.setState({
      [errorField]: errorMsg
    });
  }

  openNotificationWithIcon(type, title, msg) {
    notification[type]({
      message: title,
      description: msg,
    });
  }

  submitAttendance() {

    const entry = this.state.result;
    if (entry) {
      const payload = {
        classes_id: 3,
        student_id: entry.id,
        status: 'present'
      }

      studentAttendanceService.saveAttendance(payload).then(response => {
        this.setState({
          isHiddenStuProfile: true
        })
        this.openNotificationWithIcon("success", "Attendance", response.data.msg);
      })
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
                    style={{width: '400px'}}
                />
              </Form.Item>
            </div>
            <div className='col-md-6'>
              <Form.Item label="Student Profile" name="selectedProfile" hidden={this.state.isHiddenStuProfile}>
                <Card
                    hoverable
                    style={{width: '50%'}}
                    cover={<img alt="example" src={window.location.origin + "/profile_pic.jpeg"}/>}
                >
                  <Meta title={this.state.result.first_name} description={this.state.result.id}/>
                </Card>
                <Button onClick={this.submitAttendance} type='primary' style={{width: '50%', marginTop: 10}}
                        class="ant-btn ant-btn-primary success-btn">Next</Button>
              </Form.Item>
            </div>
          </div>
        </form>
    );
  }
}
