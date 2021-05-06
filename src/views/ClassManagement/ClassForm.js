import React from "react";
import {Form, Input, Upload, Select, Button, notification, DatePicker, TimePicker} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";

import moment from "moment";
import classService from "../../services/classService";

const {Option} = Select;
const format = 'HH:mm';

export default class ClassForm extends React.Component {
    constructor(props) {
        super(props);

        console.log(props);
        this.state = {
            classId: props.class ? props.class.id : '',
            name: props.class ? props.class.name : '',
            teacherId: props.class ? props.class.teacher_id : '',
            day: props.class ? props.class.day : 'Sunday',
            startAt: props.class ? props.class.start_at : '',
            endAt: props.class ? props.class.end_at : '',
            status: props.class ? props.class.status : 'enabled',

            nameError: "",
            dayError: "",
            startAtError: "",
            endAtError: "",
            statusError: "",
        };

// console.log(this.props.student)

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.resetErrorLabels = this.resetErrorLabels.bind(this);
        this.setValidationError = this.setValidationError.bind(this);
        this.onInputFieldChangeHandler = this.onInputFieldChangeHandler.bind(this);
        this.onStatusChangeHandler = this.onStatusChangeHandler.bind(this);
        this.onStartTimeChangeHandler = this.onStartTimeChangeHandler.bind(this);
        this.onEndTimeChangeHandler = this.onEndTimeChangeHandler.bind(this);
        this.onDateChangeHandler = this.onDateChangeHandler.bind(this);
    }

    resetErrorLabels() {
        this.setState({
            nameError: "",
            dayError: "",
            startAtError: "",
            endAtError: "",
            statusError: "",
        });
    }
    resetFields() {
        this.setState({
            name: "",
            day: "",
            startAt: "",
            endAt: "",
            status: "",
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
    onDateChangeHandler(value) {
        this.setState({
            day: value,
        });
    }

    setValidationError(errorField, errorMsg) {
        this.setState({
            [errorField]: errorMsg
        });
    }
    onStartTimeChangeHandler(moment, dateString) {
        this.setState({
            startAt: dateString
        })
    }
    onEndTimeChangeHandler(moment, dateString) {
        this.setState({
            endAt: dateString
        })
    }

    async onSubmitHandler(event) {
        this.resetErrorLabels();
        let haveErrors = false;

        // Validate class name
        if (!this.state.name) {
            this.setValidationError("nameError", "Class name cannot be empty");
            haveErrors = true
        }

        // Validate class date
        if (!this.state.day) {
            this.setValidationError("dayError", "Class date cannot be empty");
            haveErrors = true
        }

        // Validate start time
        if (!this.state.startAt) {
            this.setValidationError("startAtError", "Start time cannot be empty");
            haveErrors = true
        }

        // Validate end time
        if (!this.state.endAt) {
            this.setValidationError("endAtError", "End time cannot be empty");
            haveErrors = true
        }

        if (haveErrors) return

        const payload = {
            teacher_id: 27,
            name: this.state.name,
            day: this.state.day,
            start_at: this.state.startAt,
            end_at: this.state.endAt,
            status: this.state.status,
        }


        let response = null
        if (this.props.isNewRecord) {
            response = await classService.saveClass(payload);
        }else{
            response = await classService.updateClass(this.state.classId, payload);
        }

        if (response.data.success) {
            this.openNotificationWithIcon("success", "Class", response.data.msg);
            this.resetErrorLabels();
            this.resetFields();
            this.props.loadTable();
        }else{
            this.openNotificationWithIcon("error", "Class", response.data.msg);
        }
    }

    render() {
        return (
            <form>
                <div className='row'>
                    <div className='col-md-12'>
                        <Form.Item>
                            <Input
                                onChange={this.onInputFieldChangeHandler}
                                name="name"
                                value={this.state.name}
                                placeholder='Class Name'
                            />
                            <label className="error-label">
                                {this.state.nameError}
                            </label>
                        </Form.Item>

                        <Form.Item>
                            <Select
                                onChange={this.onDateChangeHandler}
                                name="day"
                                value={this.state.day}
                                placeholder='Class Date'
                            >
                                <Option value="sunday">Sunday</Option>
                                <Option value="monday">Monday</Option>
                                <Option value="tuesday">Tuesday</Option>
                                <Option value="wednesday">Wednesday</Option>
                                <Option value="thursday">Thursday</Option>
                                <Option value="friday">Friday</Option>
                                <Option value="saturday">Saturday</Option>
                            </Select>
                            <label className="error-label">
                                {this.state.dayError}
                            </label>
                        </Form.Item>

                        <div className='row'>
                        <div className='col-md-6'>
                    <Form.Item>
                            <TimePicker def className='time-picker' format={format}
                                        onChange={this.onStartTimeChangeHandler}
                                        placeholder='Start time'/>
                            <label className="error-label">
                                {this.state.startAtError}
                            </label>
                        </Form.Item>
                        </div>
                            <div className='col-md-6'>
                                <Form.Item>
                                    <TimePicker className='time-picker' format={format}
                                                onChange={this.onEndTimeChangeHandler}
                                                placeholder='End time'/>
                                    <label className="error-label">
                                        {this.state.endAtError}
                                    </label>
                                </Form.Item>
                            </div>
                        </div>

                        <Form.Item>
                            <Select
                                defaultValue={this.state.status}
                                onChange={this.onStatusChangeHandler}
                                name="status"
                            >
                                <Option value="enabled">Enabled</Option>
                                <Option value="disabled">Disabled</Option>
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
