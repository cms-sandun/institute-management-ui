import React from "react";
import StudentForm from "./StudentForm";
import {Table, Space, Button, Modal, Popconfirm, Input, notification} from "antd";
import studentService from "../../services/studentService";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const {confirm} = Modal;
const {Search} = Input;

export default class StudentManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            data: [],
            student: null,
            isSearchLoading:false,
            isNewRecord:true
        };

        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
        this.showDeleteConfirmation = this.showDeleteConfirmation.bind(this);
        this.loadTable = this.loadTable.bind(this);
    }

    columns = [
        {
            title: "",
            render: (text, record) => (
                <div>
                    <img style={{maxWidth:'50px'}} className='img-fluid' src={window.location.origin+"/profile_pic.jpeg"}/>
                </div>
            ),
        },
        {
            title: "First Name",
            dataIndex: "first_name",
            key: "firstName",
        },
        {
            title: "Middle Name",
            dataIndex: "middle_name",
            key: "middleName",
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
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <div>
                    <Button className='mr-2' icon={<EditOutlined />} onClick={(e) => {
                        this.showModal(false, record)
                    }}>
                    </Button>


                    <Button icon={<DeleteOutlined />} onClick={(e) => {
                        this.showDeleteConfirmation(record.id)
                    }}>

                    </Button>
                </div>
            ),
        },
    ];

    loadTable() {
        studentService.getAllStudents().then(response => {
            this.setState({
                data: response.data.data
            })
        })
    }

    componentDidMount() {
        this.loadTable();
        this.props.setBreadCrumb("Students", "View");
    }

    openNotificationWithIcon(type, title, msg) {
        notification[type]({
            message: title,
            description: msg,
        });
    }

    deleteStudent(studentId) {
        Modal.confirm({
            title: 'Delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Do you want to delete?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                studentService.deleteStudent(studentId).then(response => {
                    if (response.data.success) {
                        this.openNotificationWithIcon("success", "Student", response.data.msg);
                        this.loadTable();
                    }else{
                        this.openNotificationWithIcon("error", "Student", response.data.msg);
                    }
                })
            }
        });
    }

    showDeleteConfirmation(studentId) {
        this.deleteStudent(studentId);
    }

    showModal(isNewRecord, record) {
        this.setState({
            student: record,
            visible: true,
            isNewRecord : isNewRecord
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false
        });
    };

    handlerSearch = (e) => {
      if(e.key == "Enter"){
          this.setState({isSearchLoading:true})
          let searchText = e.target.value;
          studentService.searchStudents(searchText).then(response => {
              this.setState({
                  data: response.data.data,
                  isSearchLoading:false
              })
          })
      }
    }

    render() {
        return (
            <div className="container-fluid">

                <div className="row">
                    <div className="col-md-6">
                        <Search onKeyUp={this.handlerSearch} placeholder="Search By Name" loading={this.state.isSearchLoading}/>
                    </div>

                    <div className="col-md-6">
                        <Button
                            style={{float: "right", marginBottom: "10px", zIndex: '1'}}
                            type="primary"
                            className="success-btn"
                            onClick={()=>{
                                this.showModal(true, null)
                            }}
                        >
                            Add New
                        </Button>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <Table columns={this.columns} dataSource={this.state.data}/>
                        <Modal
                            destroyOnClose={true}
                            visible={this.state.visible}
                            onCancel={(e) => {
                                this.handleCancel(e)
                            }}
                            title="Student Form"
                            footer={[]}
                            width={900}
                        >
                            <StudentForm student={this.state.student} loadTable={this.loadTable} isNewRecord={this.state.isNewRecord} />
                        </Modal>
                    </div>
                </div>


            </div>
        );
    }
}
