import React from "react";
import {Form, Input, Upload, Select, DatePicker} from "antd";
import studentService from "../../services/studentService";
import QrReader from 'react-qr-reader'
import { Card } from 'antd';
const { Meta } = Card;

const {Option} = Select;

export default class MarkAttendanceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: ''
    };

    this.setValidationError = this.setValidationError.bind(this);
    this.onInputFieldChangeHandler = this.onInputFieldChangeHandler.bind(this);
  }

  handleScan = data => {
    if (data) {
      studentService.getStudentById(data).then(response=>{
        this.setState({
          result: response.data.data
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
                      <Option>Certificate Program in Microsoft Office</Option>
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
                        cover={<img alt="example" src={window.location.origin+"/profile_pic.jpeg"} />}
                    >
                      <Meta title={this.state.result.first_name} description="1655457" />
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
