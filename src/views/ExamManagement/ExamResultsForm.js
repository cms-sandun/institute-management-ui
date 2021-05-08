import React from "react";
import {Form, Input, Upload, Select, Button, notification, DatePicker, Table} from "antd";
import examService from "../../services/examService";

const format = 'HH:mm';

const {Option} = Select;

export default class ExamResultsForm extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            data: [],
            exam_id: this.props.exam.id,
            enrolledStudentList: [],
            selectedStudent: '',
            selectedGrade: ''
        };

        this.loadResultsTable = this.loadResultsTable.bind(this);
        this.onGradeChangeHandler = this.onGradeChangeHandler.bind(this);
        this.onStudentChangeHandler = this.onStudentChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    columns = [
        {
            title: "Student Name",
            render: (text, record) => {
                return `${record.student.first_name} ${record.student.last_name}`
            },
            key: "result",
        },
        {
            title: "Result",
            dataIndex: "result",
            key: "result",
        },
        {
            title: "Actions"
        }
    ];

    loadResultsTable(exam_id) {
        examService.getResults(exam_id).then(response => {
            this.setState({
                data: response.data.data
            })
        })
    }

    componentDidMount() {
        this.loadResultsTable(this.state.exam_id)
        examService.getEnrolledStudentsList(this.state.exam_id).then(response => {
            console.log(response.data)
            this.setState({
                enrolledStudentList: response.data.data
            })
        })
    }


    openNotificationWithIcon(type, title, msg) {
        notification[type]({
            message: title,
            description: msg,
        });
    }

    getEnrolledStudentsList() {
        return (
            <>
                {this.state.enrolledStudentList.length > 0 && this.state.enrolledStudentList.map(student => {
                    return (
                        <Option key={student.id} value={student.id}>{student.first_name}</Option>
                    )
                })}
            </>
        )
    }

    getGradesList() {
        return (
            <>
                <Option key={1} value="A">A</Option>
                <Option key={2} value="B">B</Option>
                <Option key={3} value="C">C</Option>
                <Option key={4} value="D">D</Option>
                <Option key={5} value="F">F</Option>
            </>
        )
    }

    openNotificationWithIcon(type, title, msg) {
        notification[type]({
            message: title,
            description: msg,
        });
    }

    onSubmitHandler() {
        const payload = {
            exam_id : this.state.exam_id,
            student_id : this.state.selectedStudent,
            result : this.state.selectedGrade
        }

        examService.addResults(payload).then(response => {
            if(response.data.success){
                this.openNotificationWithIcon("success", "Results", response.data.msg);
            }
        })
    }

    onStudentChangeHandler(value) {
        this.setState({
            selectedStudent: value
        })
    }

    onGradeChangeHandler(value) {
        this.setState({
            selectedGrade: value
        })
    }


    render() {
        return (
            <form>
                <div className='row'>
                    <div className='col-md-7'>
                        <Form.Item>
                            <Select
                                placeholder="Select Student"
                                name="student" onChange={this.onStudentChangeHandler}

                            >
                                {this.getEnrolledStudentsList()}
                            </Select>
                            <label className="error-label">
                                {this.state.examNameError}
                            </label>
                        </Form.Item>
                    </div>
                    <div className='col-md-3'>
                        <Form.Item>
                            <Select
                                placeholder="Select Grade"
                                name="student" onChange={this.onGradeChangeHandler}

                            >
                                {this.getGradesList()}
                            </Select>
                            <label className="error-label">
                                {this.state.examNameError}
                            </label>
                        </Form.Item>
                    </div>
                    <div className='col-md-2'>
                        <Form.Item>
                            <Button
                                style={{float: "right", marginBottom: "10px", zIndex: '1'}}
                                type="primary"
                                className="success-btn"
                                onClick={this.onSubmitHandler}
                            >
                                Add
                            </Button>
                        </Form.Item>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <Table columns={this.columns} dataSource={this.state.data}/>
                    </div>
                </div>
            </form>
        );
    }
}
