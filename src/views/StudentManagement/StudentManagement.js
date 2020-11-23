import React from "react";
import StudentForm from "./StudentForm";
import { Table, Space, Button, Modal } from "antd";
import studentService from "../../services/studentService";
import { Input } from 'antd';
const { confirm } = Modal;
const { Search } = Input;

export default class StudentManagement extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      data:[],
      student:null
    };

    this.showModal = this.showModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.deleteStudent = this.deleteStudent.bind(this);
    this.showDeleteConfirmation = this.showDeleteConfirmation.bind(this);
  }

  columns = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "lastName",
    },
    {
      title: "Contact No",
      dataIndex: "contact_no",
      key: "contact",
    },
    {
      title: "Batch",
      dataIndex: "batch",
      key: "batch",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button type='primary' onClick={(e)=>{this.showModal(record)}}>Update</Button>
          <Button type='danger' onClick={(e)=>{this.showDeleteConfirmation(record.id)}}>Delete</Button>
        </Space>
      ),
    },
  ];

  loadTable(){
    studentService.getAllStudents().then(response=>{
      this.setState({
        data:response.data.data
      })
    })
  }


  componentDidMount(){
     this.loadTable()
  }

  deleteStudent(studentId){
    studentService.deleteStudent(studentId).then(response=>{
      if(response.data.success){
        this.loadTable()
      }
    })
  }

  showDeleteConfirmation(studentId){
    this.deleteStudent(studentId);
  }
  
  showModal(record) {
    this.setState({
      student:record,
      visible: true
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div className="row">

        <div className="col-md-6">
          <Search placeholder="input search loading default" />
        </div>

        <div className="col-md-6">
          <Button
              style={{ float: "right", marginBottom: "10px", zIndex:'1' }}
              type="primary"
              className="success-btn"
              onClick={this.showModal}
          >
            Add New
          </Button>
        </div>

        <div>


        </div>


        <Table columns={this.columns} dataSource={this.state.data} />
        <Modal
          destroyOnClose={true}
          visible={this.state.visible}
          onCancel={(e)=>{this.handleCancel(e)}}
          title="Student Form"
          footer={[]}
        >
          <StudentForm student={this.state.student}  />
        </Modal>
      </div>
    );
  }
}
