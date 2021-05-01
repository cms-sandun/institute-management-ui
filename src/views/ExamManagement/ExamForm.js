import React from "react";
import {Form, Input, Upload, Select, Button, notification, DatePicker} from "antd";
import TextArea from "antd/lib/input/TextArea";
import batchService from "../../services/batchService";
import employeeService from "../../services/employeeService";
import {TimePicker} from 'antd';
import examService from "../../services/examService";

const format = 'HH:mm';

const {Option} = Select;

export default class ExamForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            batchID: props.batch ? props.batch.id : '',
            examName: props.batch ? props.batch.name : '',
            examDate: props.batch ? props.batch.exam_date : '',
            startTime: props.batch ? props.batch.start_time : '',
            endTime: props.batch ? props.batch.end_time : '',
            batchesList: [],
            selectedBatch: '',
            batchError: "",
            examNameError: "",
            examDateError: "",
            startTimeError: "",
            endTimeError: ""
        };

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.resetErrorLabels = this.resetErrorLabels.bind(this);
        this.setValidationError = this.setValidationError.bind(this);
        this.onInputFieldChangeHandler = this.onInputFieldChangeHandler.bind(this);
        this.getBatchesArray = this.getBatchesArray.bind(this);
        this.onBatchChangeHandler = this.onBatchChangeHandler.bind(this);
        this.onStartTimeChangeHandler = this.onStartTimeChangeHandler.bind(this);
        this.onEndTimeChangeHandler = this.onEndTimeChangeHandler.bind(this);
        this.onExamDateChangeHandler = this.onExamDateChangeHandler.bind(this);
    }

    componentDidMount() {
        this.loadBatches()
    }

    resetErrorLabels() {
        this.setState({
            batchError: "",
            examNameError: "",
            examDateError: "",
            startTimeError: "",
            endTimeError: ""
        });
    }

    resetFields() {
        this.setState({
            batchID: '',
            examName: '',
            examDate: '',
            startTime: '',
            endTime: '',
            selectedBatch: '',
            batchesList: [],
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
        let haveErrors = false;

        // Validate batch
        if (!this.state.selectedBatch) {
            this.setValidationError("batchError", "Select batch");
            haveErrors = true
        }

        // Validate exam name
        if (!this.state.examName) {
            this.setValidationError("examNameError", "Exam name should be provided");
            haveErrors = true
        }

        // Validate exam date
        if (!this.state.examDate) {
            this.setValidationError("examDateError", "Exam date should be selected");
            haveErrors = true
        }

        // Validate start time
        if (!this.state.startTime) {
            this.setValidationError("startTimeError", "Start time should be selected");
            haveErrors = true
        }

        // Validate end time
        if (!this.state.endTime) {
            this.setValidationError("endTimeError", "End time should be selected");
            haveErrors = true
        }

        if (haveErrors) return

        const payload = {
          batch_id: this.state.selectedBatch,
          name: this.state.examName,
          exam_date: this.state.examDate,
          start_time: this.state.startTime,
          end_time: this.state.endTime
        }

        let response = null
        if (this.props.isNewRecord) {
            response = await examService.saveExam(payload);
        } else {
            response = await examService.updateExam(this.state.batchID, payload);
        }

        if (response.data.success) {
            this.openNotificationWithIcon("success", "Batch", response.data.msg);
            this.resetErrorLabels();
            this.resetFields();
            this.props.loadTable();
        } else {
            this.openNotificationWithIcon("error", "Batch", response.data.msg);
        }

    }

    loadBatches() {
        batchService.getAllBatches().then(
            response => {
                this.setState({
                    batchesList: response.data.data
                })
            }
        )
    }

    getBatchesArray() {
        return (
            <>
                {this.state.batchesList.length > 0 && this.state.batchesList.map(batch => {
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

    onExamDateChangeHandler(moment, dateString) {
        this.setState({
            examDate: moment
        })
    }

    onStartTimeChangeHandler(moment, dateString) {
        this.setState({
            startTime: dateString
        })
    }

    onEndTimeChangeHandler(moment, dateString) {
        this.setState({
            endTime: dateString
        })
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
                            <div className='row'>
                                <div className='col-md-4'>
                                    <DatePicker placeholder="Exam Date" onChange={this.onExamDateChangeHandler}/>
                                  <label className="error-label">
                                    {this.state.examDateError}
                                  </label>
                                </div>
                                <div className='col-md-4'>
                                    <TimePicker format={format}
                                                onChange={this.onStartTimeChangeHandler}/>
                                  <label className="error-label">
                                    {this.state.startTimeError}
                                  </label>
                                </div>
                                <div className='col-md-4'>
                                    <TimePicker format={format}
                                                onChange={this.onEndTimeChangeHandler}/>
                                  <label className="error-label">
                                    {this.state.endTimeError}
                                  </label>
                                </div>
                            </div>
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
