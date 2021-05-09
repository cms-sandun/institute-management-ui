import React from "react";
import {Form, Input, Upload, Select, Button, notification, Table} from "antd";
import {EditOutlined, DeleteOutlined, ExclamationCircleOutlined, UserOutlined} from '@ant-design/icons';
import studentService from "../../services/studentService";
import batchService from "../../services/batchService";

const {Option} = Select;

export default class AssociateStudentsForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            batch : this.props.batch ? this.props.batch : '',
            studentList: [],
            associatedStudentList: [],
            selectedStudent:''
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onStudentSelectHandler = this.onStudentSelectHandler.bind(this);
        this.onDeleteAssociateStudentHandler = this.onDeleteAssociateStudentHandler.bind(this);
    }

    columns = [
        {
            title: "Student Name",
            render : ((text, record) => {
               return `${record.first_name} ${record.last_name}`
            }),
            key: "name",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <div>
                    <Button title="Delete" className='mr-2' icon={<DeleteOutlined/>} onClick={()=>{
                        this.onDeleteAssociateStudentHandler(record.id)
                    }}>
                    </Button>
                </div>
            ),
        },
    ];

    getAssociatedStudentsList(){
        batchService.getAssociateStudent(this.state.batch.id).then(response=>{
            this.setState({
                associatedStudentList: response.data.data
            })
            console.log(this.state.associatedStudentList)
        })
    }

    componentDidMount() {
        studentService.getAllStudents().then(response => {
            this.setState({
                studentList: response.data.data
            })
        })
        this.getAssociatedStudentsList();
    }

    openNotificationWithIcon(type, title, msg) {
        notification[type]({
            message: title,
            description: msg,
        });
    }

    onDeleteAssociateStudentHandler(id){
        batchService.deleteAssociateStudent(id).then(response=>{
            if(response.data.success){
                this.getAssociatedStudentsList()
                this.openNotificationWithIcon("success", "Associated Student", response.data.msg);
            }
        })
    }

    getStudents() {
        return (
            <>
                {this.state.studentList.length > 0 && this.state.studentList.map(student => {
                    return (
                        <Option key={student.id} value={student.id}>{student.first_name} {student.middle_name} {student.last_nams}</Option>
                    )
                })}
            </>
        )
    }

    onStudentSelectHandler(student){
        this.setState({
            selectedStudent : student
        })
    }

    onSubmitHandler(){
        if(!this.state.selectedStudent){
            this.openNotificationWithIcon("error", "Batch", "Please select a student");
            return
        }

        const payload = {
            batch_id : this.state.batch.id,
            student_id : this.state.selectedStudent
        }

        batchService.addAssociateStudent(payload).then(response=>{
            if(response.data.success){
                this.openNotificationWithIcon("success", "Batch", "Successfully added");
                this.getAssociatedStudentsList()
            }
        })
    }

    render() {
        return (
            <form>
                <div className='row mb-3'>
                    <div className='col-md-12'>
                        <Select
                            placeholder="Select Student"
                            name="student"
                            style={{ minWidth: "50%"}}
                            onChange={this.onStudentSelectHandler}
                        >
                            {this.getStudents()}
                        </Select>
                       <Button
                           type="primary"
                           className="success-btn ml-2"
                           onClick={this.onSubmitHandler}
                       >
                         Add
                       </Button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <Table columns={this.columns} dataSource={this.state.associatedStudentList}/>
                    </div>
                </div>
            </form>
        );
    }
}
