import React from "react";
import {Form, Input, Upload, Select, Button, notification} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import courseService from "../../services/courseService";

const {Option} = Select;

export default class CourseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            courseID: props.course ? props.course.id : '',
            name: props.course ? props.course.name : '',
            description: props.course ? props.course.description : '',
            courseFee: props.course ? props.course.course_fee : '',
            status: props.course ? props.course.status : 'enabled',
            nameError: "",
            descriptionError: "",
            courseFeeError: "",
            haveErrors: false
        };

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.resetErrorLabels = this.resetErrorLabels.bind(this);
        this.setValidationError = this.setValidationError.bind(this);
        this.onInputFieldChangeHandler = this.onInputFieldChangeHandler.bind(this);
        this.onStatusChangeHandler = this.onStatusChangeHandler.bind(this);
    }

    resetErrorLabels() {
        this.setState({
            nameError: "",
            descriptionError: "",
            courseFeeError: "",
            haveErrors: false
        });
    }

    resetFields() {
        this.setState({
            name: "",
            description: "",
            courseFee: "",
            status: ""
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
            haveErrors: true
        });
    }

    async onSubmitHandler(event) {
        this.resetErrorLabels();
        let haveErrors = false;

        // Validate first name
        if (!this.state.name) {
            this.setValidationError("nameError", "Name cannot be empty");
            haveErrors = true
        }

        // Validate middle name
        if (!this.state.description) {
            this.setValidationError("descriptionError", "Description cannot be empty");
            haveErrors = true
        }else{
            if(this.state.description.length >= 400){
                this.setValidationError("descriptionError", "Description should not exceed 400 characters");
                haveErrors = true
            }
        }

        // Validate last name
        if (!this.state.courseFee) {
            this.setValidationError("courseFeeError", "Course fee cannot be empty");
            haveErrors = true
        }else{
            const regex = /^((\d{1,3}|\s*){1})((\,\d{3}|\d)*)(\s*|\.(\d{2}))$/;
            if(!regex.test(this.state.courseFee)){
                this.setValidationError("courseFeeError", "Course fee is not valid");
                haveErrors = true
            }
        }

        if (haveErrors) return

        const payload = {
            name: this.state.name,
            description: this.state.description,
            course_fee: this.state.courseFee,
            status: this.state.status
        }

        let response = null
        if (this.props.isNewRecord) {
            response = await courseService.saveCourse(payload);
        } else {
            response = await courseService.updateCourse(this.state.courseID, payload);
        }

        if (response.data.success) {
            this.openNotificationWithIcon("success", "Course", response.data.msg);
            this.resetErrorLabels();
            this.resetFields();
            this.props.loadTable();
        } else {
            this.openNotificationWithIcon("error", "Course", response.data.msg);
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
                                placeholder='Course Name'
                            />
                            <label className="error-label">
                                {this.state.nameError}
                            </label>
                        </Form.Item>

                        <Form.Item>
                            <Input
                                onChange={this.onInputFieldChangeHandler}
                                name="courseFee"
                                value={this.state.courseFee}
                                placeholder='Course Fee'
                            />
                            <label className="error-label">
                                {this.state.courseFeeError}
                            </label>
                        </Form.Item>

                        <Form.Item>
                            <TextArea
                                onChange={this.onInputFieldChangeHandler}
                                name="description"
                                value={this.state.description}
                                placeholder='Description'
                            />
                            <label className="error-label">
                                {this.state.descriptionError}
                            </label>
                        </Form.Item>

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
