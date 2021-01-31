import React from "react";
import {Table, Space, Button, Modal, Popconfirm, Input, Tag, Select, notification} from "antd";
import { DatePicker } from 'antd';
import studentService from "../../services/studentService";
import {EditOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import MarkAttendanceForm from "./MarkAttendanceForm";
import {momentLocalizer} from "react-big-calendar";
import moment from "moment";
import EditAttendanceForm from "./EditAttendanceForm";

const { Option } = Select;
const {Search} = Input;
const localizer = momentLocalizer(moment);


export default class AttendanceManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            isVisibleEdit: false,
            data: [],
            student: null,
            isSearchLoading: false,
            isNewRecord: true
        };

        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
        this.showDeleteConfirmation = this.showDeleteConfirmation.bind(this);
        this.loadTable = this.loadTable.bind(this);
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
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Status",
            render: (text, record) => (
                record.id % 3 == 0 ? <Tag color="#28a745">Present</Tag> : <Tag color="#ff4d4f">Absent</Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <div>
                    <Button className='mr-2' icon={<EditOutlined/>} onClick={(e) => {
                        this.showModal(false, record)
                    }}>
                    </Button>


                    <Button icon={<DeleteOutlined/>} onClick={(e) => {
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
        this.loadTable()
        this.props.setBreadCrumb("Attendance", "View");
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
            icon: <ExclamationCircleOutlined/>,
            content: 'Do you want to delete?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                studentService.deleteStudent(studentId).then(response => {
                    if (response.data.success) {
                        this.openNotificationWithIcon("success", "Attendance", response.data.msg);
                        this.loadTable()
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
            isVisibleEdit: true,
            isNewRecord: isNewRecord
        });
    }

    showMarkAttendanceModal(isNewRecord, record) {
        this.setState({
            student: record,
            visible: true,
            isNewRecord: isNewRecord
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
            isVisibleEdit:false
        });
    };

    handlerSearch = (e) => {
        if (e.key == "Enter") {
            this.setState({isSearchLoading: true})
            let searchText = e.target.value;
            studentService.searchStudents(searchText).then(response => {
                this.setState({
                    data: response.data.data,
                    isSearchLoading: false
                })
            })
        }
    }



    render() {
        return (
            <div className="container-fluid">

                <div className="row">
                    <div className="col-md-3">
                        <Search onKeyUp={this.handlerSearch} placeholder="Search By Name"
                                loading={this.state.isSearchLoading}/>
                    </div>
                    <div className="col-md-9">
                        <div className='controlsWrapper'>
                            <Select style={{width:'400px'}}>
                                <Option>Certificate Program in Microsoft Office</Option>
                            </Select>
                            <DatePicker className='ml-2'/>
                            <Button
                                style={{float: "right", marginBottom: "10px", zIndex: '1'}}
                                type="primary"
                                className="success-btn"
                                onClick={()=>{
                                    this.showMarkAttendanceModal(true, null)
                                }}
                            >
                                Mark Attendance
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <Table className='mt-5' columns={this.columns} dataSource={this.state.data}/>
                        <Modal
                            destroyOnClose={true}
                            visible={this.state.visible}
                            onCancel={(e) => {
                                this.handleCancel(e)
                            }}
                            title="Mark Attendance"
                            footer={[]}
                            width={900}
                        >
                            <MarkAttendanceForm student={this.state.student} loadTable={this.loadTable} isNewRecord={this.state.isNewRecord} />
                        </Modal>

                        <Modal
                            destroyOnClose={true}
                            visible={this.state.isVisibleEdit}
                            onCancel={(e) => {
                                this.handleCancel(e)
                            }}
                            title="Edit Attendance Record"
                            footer={[]}
                            width={500}
                        >
                            <EditAttendanceForm student={this.state.student} loadTable={this.loadTable} isNewRecord={this.state.isNewRecord} />
                        </Modal>
                    </div>
                </div>


            </div>
        );
    }
}
