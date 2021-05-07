import React from "react";
import StudentForm from "./PaymentForm";
import {Table, Space, Button, Modal, Popconfirm, Input, notification} from "antd";
import paymentService from "../../services/paymentService";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import PaymentForm from "./PaymentForm";
import moment from 'moment'
import classService from "../../services/classService";
import studentService from "../../services/studentService";


const {confirm} = Modal;
const {Search} = Input;

export default class PaymentManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            data: [],
            students: [],
            payment: null,
            isSearchLoading:false,
            isNewRecord:true
        };

        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.showDeleteConfirmation = this.showDeleteConfirmation.bind(this);
        this.loadTable = this.loadTable.bind(this);
        this.loadStudentDropDown = this.loadStudentDropDown.bind(this);
    }

    columns = [

        {
            title: "Student Name",
            render: (text, record) => {
              return `${record.student.first_name} ${record.student.last_name}`
            },
            key: "firstName", //unique key for column
        },
        {
            title: "Paid Amount",
            dataIndex: "paid_amount",
            key: "paidAmount",
        },
        {
            title: "Remaining Amount",
            dataIndex: "remaining_amount",
            key: "remainingAmount",
        },
        {
            title: "Date",
            render : (text, record) => {
              return moment(record.date).format("YYYY-MM-DD")
            },
            key: "date",
        },
        {
            title: "Payment Method",
            dataIndex: "payment_method",
            key: "paymentMethod",
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
        paymentService.getAllPayments().then(response => {
            this.setState({
                data: response.data.data
            })
        })
    }

    //after click student from menu // react function
    componentDidMount() {
        this.loadTable();
        this.props.setBreadCrumb("Payments", "View");
    }

    openNotificationWithIcon(type, title, msg) {
        notification[type]({
            message: title,
            description: msg,
        });
    }

    showDeleteConfirmation(studentId) {
        this.deleteStudent(studentId);
    }

    showModal(isNewRecord, record) {
        this.setState({
            payment: record,
            visible: true,
            isNewRecord : isNewRecord
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false
        });
    };


    loadStudentDropDown() {
        studentService.getAllStudents().then(response => {
            this.setState({
                students: response.data.data
            })
        })
    }

    //capture event object (e)
    // handlerSearch = (e) => {
    //     if(e.key == "Enter"){
    //         this.setState({isSearchLoading:true})
    //         let searchText = e.target.value;
    //         studentService.searchStudents(searchText).then(response => {
    //             this.setState({
    //                 data: response.data.data,
    //                 isSearchLoading:false
    //             })
    //         })
    //     }
    // }

    //html part/view
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
                                this.loadStudentDropDown()
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
                            title="Payment Form"
                            footer={[]}
                            width={800}
                        >
                            <PaymentForm  payment={this.state.payment} loadTable={this.loadTable} isNewRecord={this.state.isNewRecord} />
                        </Modal>
                    </div>
                </div>


            </div>
        );
    }
}
