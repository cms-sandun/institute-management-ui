import React from "react";
import {Form, Input, Upload, Select, Button, notification} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import batchService from "../../services/batchService";
import employeeService from "../../services/employeeService";
import courseService from "../../services/courseService";

const {Option} = Select;

export default class BatchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      batchID: props.batch ? props.batch.id : '',
      name: props.batch ? props.batch.name : '',
      studentCount: props.batch ? props.batch.student_count : '',
      courseId: props.batch ? props.batch.course_id : '',
      description: props.batch ? props.batch.description : '',
      status: props.batch ? props.batch.status : 'enabled',
      courseList:[],
      nameError: "",
      courseError: "",
      statusError: ""
    };
    console.log(this.props)

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.resetErrorLabels = this.resetErrorLabels.bind(this);
    this.setValidationError = this.setValidationError.bind(this);
    this.onInputFieldChangeHandler = this.onInputFieldChangeHandler.bind(this);
    this.onStatusChangeHandler = this.onStatusChangeHandler.bind(this);
    this.onCourseChangeHandler = this.onCourseChangeHandler.bind(this);
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

  loadCourses(){
    courseService.getAllCourses().then(
        response => {
          this.setState({
            courseList: response.data.data
          })
        }
    )
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

  componentDidMount() {
    this.loadCourses()
  }

  onCourseChangeHandler(value) {
    this.setState({
      courseId: value,
    });
  }

  async onSubmitHandler(event) {
    this.resetErrorLabels();

    // Validate first name
    if (!this.state.name) {
      this.setValidationError("nameError", "Course name should be provided");
    }

    // Validate middle name
    if (!this.state.courseId) {
      this.setValidationError("courseError", "Course should be selected");
    }

    const payload = {
      name: this.state.name,
      course_id: this.state.courseId,
      studentCount: this.state.studentCount,
      description: this.state.description,
      status: this.state.status,
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

  courseArray = () => {
    return (
        <>
          {this.state.courseList.length >0 && this.state.courseList.map(crs => {
            return (
                <Option key={crs.id} value={crs.id}>{crs.name}</Option>

            )
          })}
        </>
    )
  }

  render() {
    return (
        <form>
          <div className='row'>
            <div className='col-md-12'>

              <Form.Item>
                <Select
                    placeholder="Select Course"
                    name="course" onChange={this.onCourseChangeHandler}

                >
                  {this.courseArray()}
                </Select>
                <label className="error-label">
                  {this.state.courseError}
                </label>
              </Form.Item>

              <Form.Item>
                <Input
                    onChange={this.onInputFieldChangeHandler}
                    name="name"
                    value={this.state.name}
                    placeholder='Batch Name'
                />
                <label className="error-label">
                  {this.state.nameError}
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
