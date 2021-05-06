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
            enrolledStudentList:[]
        };

        this.loadResultsTable = this.loadResultsTable.bind(this);
    }

    columns = [
        {
            title: "Student Name",
            render : (text, record)=>{
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
    }


    openNotificationWithIcon(type, title, msg) {
        notification[type]({
            message: title,
            description: msg,
        });
    }

    /*getStudentsArray() {
        return (
            <>
                {this.state.batchesList.length > 0 && this.state.batchesList.map(batch => {
                    return (
                        <Option key={batch.id} value={batch.id}>{batch.name}</Option>
                    )
                })}
            </>
        )
    }*/


    render() {
        return (
            <form>
                <div className='row'>
                    <div className='col-md-7'>
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
                    </div>
                    <div className='col-md-3'>
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
                    </div>
                    <div className='col-md-2'>
                        <Form.Item>
                            <Button
                                style={{float: "right", marginBottom: "10px", zIndex: '1'}}
                                type="primary"
                                className="success-btn"
                                onClick={()=>{
                                    this.showAddNewExamModal(true, null)
                                }}
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
