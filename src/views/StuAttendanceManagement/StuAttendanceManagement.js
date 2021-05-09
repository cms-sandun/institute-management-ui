import React from "react";
import {Table, Space, Button, Modal, Popconfirm, Input, Tag, Select, notification} from "antd";
import {DatePicker} from 'antd';
import studentService from "../../services/studentService";
import {EditOutlined, DeleteOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import StuMarkAttendanceForm from "./StuMarkAttendanceForm";
import {momentLocalizer} from "react-big-calendar";
import moment from "moment";
import StuEditAttendanceForm from "./StuEditAttendanceForm";
import classService from "../../services/classService";
import Moment from 'moment';

import studentAttendanceService from "../../services/studentAttendanceService";
const {Option} = Select;
const {Search} = Input;
const localizer = momentLocalizer(moment);

export default class StuAttendanceManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            isVisibleEdit: false,
            data: [],
            classes: [],
            student: null,
            isSearchLoading: false,
            isNewRecord: true,
            selectedClass: '',
            selectedDate: ''
        };

        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.deleteAttendance = this.deleteAttendance.bind(this);
        this.showDeleteConfirmation = this.showDeleteConfirmation.bind(this);
        this.loadClassesDropDown = this.loadClassesDropDown.bind(this);
        this.searchByClassAndDate = this.searchByClassAndDate.bind(this);
        this.classOnChangeHandler = this.classOnChangeHandler.bind(this);
        this.dateOnChangeHandler = this.dateOnChangeHandler.bind(this);
        this.exportReport = this.exportReport.bind(this);
    }

    columns = [
        {
            title: "Student Name",
            render: (text, record) => (
                record.student ? record.student.first_name : ''
            )
        },
        {
            title: "Status",
            render: (text, record) => (
                record.status  == 'present' ? <Tag color="#28a745">Present</Tag> : <Tag color="#ff4d4f">Absent</Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <div>
                    <Button icon={<DeleteOutlined/>} onClick={(e) => {
                        this.showDeleteConfirmation(record.id)
                    }}>
                    </Button>
                </div>
            ),
        },
    ];

    loadClassesDropDown() {
        classService.getAllClass().then(response => {
            this.setState({
                classes: response.data.data
            })
        })
    }


    componentDidMount() {
        this.loadClassesDropDown()
        this.props.setBreadCrumb("Attendance", "View");
    }

    openNotificationWithIcon(type, title, msg) {
        notification[type]({
            message: title,
            description: msg,
        });
    }

    deleteAttendance(attendanceId) {
        Modal.confirm({
            title: 'Delete',
            icon: <ExclamationCircleOutlined/>,
            content: 'Do you want to delete?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                studentAttendanceService.deleteAttendance(attendanceId).then(response => {
                    if (response.data.success) {
                        this.openNotificationWithIcon("success", "Attendance", response.data.msg);
                        this.searchByClassAndDate()
                    }
                })
            }
        });
    }

    showDeleteConfirmation(studentId) {
        this.deleteAttendance(studentId);
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
            isVisibleEdit: false
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

    searchByClassAndDate() {
        if (this.state.selectedClass != '' && this.state.selectedClass != undefined && this.state.selectedDate != '' && this.state.selectedDate != undefined) {
            studentAttendanceService.getAttendanceByClassIdAndDate(this.state.selectedClass, Moment(this.state.selectedDate).format('yyyy-MM-DD')).then(response => {
                this.setState({
                    data: response.data.data
                })
            })
        }else{
            this.openNotificationWithIcon("warning","Warning","Select Class and Date")
        }
    }

    classOnChangeHandler(value) {
        this.setState({
            selectedClass: value
        })
    }

    dateOnChangeHandler(moment, dateString) {
        this.setState({
            selectedDate: moment
        })
    }

    getClassesDropDown() {
        return (
            <>
                {this.state.classes.map(cls => {
                    return (
                        <Option value={cls.id} name={cls.name}>
                            {cls.name}
                        </Option>
                    )
                })}
            </>
        )
    }

    exportReport(){
        if (this.state.selectedClass != '' && this.state.selectedClass != undefined && this.state.selectedDate != '' && this.state.selectedDate != undefined) {
            studentAttendanceService.exportReport(this.state.selectedClass, Moment(this.state.selectedDate).format('yyyy-MM-DD')).then(response => {
                window.open("http://localhost:5000/"+response.data.data,'blank')
            })
        }else{
            this.openNotificationWithIcon("warning","Warning","Select Class and Date")
        }
    }


    render() {
        return (
            <div className="container-fluid">

                <div className="row">
                    <div className="col-md-9">
                        <div className='controlsWrapper'>
                            <Select style={{width: '400px'}} placeholder='Select Class'
                                    onChange={this.classOnChangeHandler}>
                                {this.state.classes && this.getClassesDropDown()}
                            </Select>
                            <DatePicker className='ml-2' onChange={this.dateOnChangeHandler} />
                            <Button
                                style={{marginBottom: "10px", marginLeft:"10px", zIndex: '1'}}
                                type="primary"
                                className="success-btn"
                                onClick={this.searchByClassAndDate}
                            >
                                Load
                            </Button>
                            <Button
                                style={{marginBottom: "10px", marginLeft:"10px", zIndex: '1'}}
                                type="primary"
                                className="success-btn"
                                onClick={this.exportReport}
                            >
                                Export
                            </Button>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <Button
                            style={{float: "right", marginBottom: "10px", zIndex: '1'}}
                            type="primary"
                            className="success-btn"
                            onClick={() => {
                                this.showMarkAttendanceModal(true, null)
                            }}
                        >
                            Mark Attendance
                        </Button>
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
                            <StuMarkAttendanceForm student={this.state.student} loadTable={this.loadTable}
                                                   isNewRecord={this.state.isNewRecord}/>
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
                            <StuEditAttendanceForm student={this.state.student} loadTable={this.loadTable}
                                                   isNewRecord={this.state.isNewRecord}/>
                        </Modal>
                    </div>
                </div>


            </div>
        );
    }
}
