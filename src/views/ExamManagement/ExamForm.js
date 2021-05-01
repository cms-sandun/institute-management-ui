import React from "react";
import {Form, Input, Upload, Select, Button, notification, DatePicker} from "antd";
import TextArea from "antd/lib/input/TextArea";
import batchService from "../../services/batchService";
import employeeService from "../../services/employeeService";
import { TimePicker } from 'antd';
import moment from 'moment';
const format = 'HH:mm';

const {Option} = Select;

export default class ExamForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      batchID: props.batch ? props.batch.id : '',
      examName: props.batch ? props.batch.name : '',
      startAt: props.batch ? props.batch.start_at : '',
      endAt: props.batch ? props.batch.end_at : '',
      batchesList: [],
      selectedBatch: '',
      batchError: "",
      examNameError: "",
      startAtError: "",
      endAtError: ""
    };

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.resetErrorLabels = this.resetErrorLabels.bind(this);
    this.setValidationError = this.setValidationError.bind(this);
    this.onInputFieldChangeHandler = this.onInputFieldChangeHandler.bind(this);
    this.onStatusChangeHandler = this.onStatusChangeHandler.bind(this);
    this.getBatchesArray = this.getBatchesArray.bind(this);
    this.onBatchChangeHandler = this.onBatchChangeHandler.bind(this);
  }

  componentDidMount() {
    this.loadBatches()
  }

  resetErrorLabels() {
    this.setState({
      nameError: "",
      courseError: "",
      statusError: ""
    });
  }

  resetFields() {
    this.setState({
      batchID: "",
      name: "",
      studentCount: "",
      course: "",
      status: "enabled"
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

  onStatusChangeHandler(value) {
    this.setState({
      status: value,
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
    if (!this.state.name) {
      this.setValidationError("nameError", "Course name should be provided");
    }

    // Validate middle name
    if (!this.state.course) {
      this.setValidationError("courseError", "Course should be selected");
    }

    const payload = {
      name: this.state.name,
      middleName: this.state.course
    }

    let response = null
    if (this.props.isNewRecord) {
      response = await batchService.saveBatch(payload);
    }else{
      response = await batchService.updateBatch(this.state.batchID, payload);
    }

    if (response.data.success) {
      this.openNotificationWithIcon("success", "Batch", response.data.msg);
      this.resetErrorLabels();
      this.resetFields();
      this.props.loadTable();
    }else{
      this.openNotificationWithIcon("error", "Batch", response.data.msg);
    }

  }

  loadBatches(){
    batchService.getAllBatches().then(
        response => {
          this.setState({
            batchesList: response.data.data
          })
        }
    )
  }

  getBatchesArray(){
    return (
        <>
          {this.state.batchesList.length >0 && this.state.batchesList.map(batch => {
            return (
                <Option key={batch.id} value={batch.id}>{batch.name}</Option>
            )
          })}
        </>
    )
  }

  onBatchChangeHandler(value) {
    this.setState({
      selectedBatch: value,
    });
  }

  render() {
    return (
        <form>
          <div className='row'>
            <div className='col-md-12'>
              <Form.Item>
                <Select
                    placeholder="Select Batch"
                    name="batch" onChange={this.onBatchChangeHandler}

                >
                  {this.getBatchesArray()}
                </Select>
                <label className="error-label">
                  {this.state.batchError}
                </label>
              </Form.Item>

              <Form.Item>
                <Input
                    onChange={this.onInputFieldChangeHandler}
                    name="examName"
                    value={this.state.examName}
                    placeholder='Exam Name'
                />
                <label className="error-label">
                  {this.state.examNameError}
                </label>
              </Form.Item>

              <Form.Item>
                <DatePicker placeholder="Exam Date" onChange={this.dateOnChangeHandler} />
                <TimePicker className='ml-5' defaultValue={moment('12:00', format)} format={format} />
                <TimePicker className='ml-2' defaultValue={moment('13:00', format)} format={format} />
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
