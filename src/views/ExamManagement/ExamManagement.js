import React from "react";
import ExamForm from "../ExamManagement/ExamForm";
import ExamResultsForm from "../ExamManagement/ExamResultsForm";
import {Table, Space, Button, Modal, Popconfirm, Input, notification} from "antd";
import examService from "../../services/examService";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined, BellOutlined, UserOutlined, PaperClipOutlined} from '@ant-design/icons';
import moment from 'moment';

const {confirm} = Modal;
const {Search} = Input;

export default class ExamManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            examResultsVisible: false,
            data: [],
            exam: null,
            isSearchLoading:false,
            isNewRecord:true
        };

        this.showAddNewExamModal = this.showAddNewExamModal.bind(this);
        this.handleAddNewExamFormCancel = this.handleAddNewExamFormCancel.bind(this);
        this.showDeleteConfirmation = this.showDeleteConfirmation.bind(this);
        this.loadTable = this.loadTable.bind(this);
        this.notifyBatch = this.notifyBatch.bind(this);
        this.exportEnrolledStudents = this.exportEnrolledStudents.bind(this);
        this.showExamResultsModal = this.showExamResultsModal.bind(this);
        this.handleExamResultsFormCancel = this.handleExamResultsFormCancel.bind(this);
    }

    columns = [
        {
            title: "Exam Name",
            dataIndex: "exam_name",
            key: "exam_name",
        },
        {
            title: "Batch",
            render:function (text, record) {
                return record.batch.name
            }
        },
        {
            title: "Exam Date",
            render:function (text, record) {
                return moment(record.exam_date).format("YYYY-MM-DD")
            }
        },
        {
            title: "Start Time",
            dataIndex: "start_time",
            key: "start_time",
        },
        {
            title: "End Time",
            dataIndex: "end_time",
            key: "end_time",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <div>
                    <Button title='Edit' className='mr-2' icon={<EditOutlined />} onClick={(e) => {
                        this.showAddNewExamModal(false, record)
                    }}>
                    </Button>


                    <Button title='Delete' className='mr-2' icon={<DeleteOutlined />} onClick={(e) => {
                        this.showDeleteConfirmation(record.id)
                    }}>
                    </Button>

                    <Button title='Notify Batch' className='mr-2' icon={<BellOutlined />} onClick={(e) => {
                        this.notifyBatch(record.id)
                    }}>
                    </Button>


                    <Button title='View Enrolled Students' className='mr-2' icon={<UserOutlined />} onClick={(e) => {
                        this.exportEnrolledStudents(record.id)
                    }}>
                    </Button>

                    <Button title='Results' icon={<PaperClipOutlined />} onClick={(e) => {
                        this.showExamResultsModal(record)
                    }}>
                    </Button>




                </div>
            ),
        },
    ];

    loadTable() {
        examService.getAllExames().then(response => {
            this.setState({
                data: response.data.data
            })
        })
    }


    componentDidMount() {
        this.loadTable()
        this.props.setBreadCrumb("Exams", "View");
    }

    showDeleteConfirmation(examId) {
        Modal.confirm({
            title: 'Delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Do you want to delete?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                examService.deleteExam(examId).then(response => {
                    if (response.data.success) {
                        this.loadTable()
                    }
                })
            }
        });
    }

    notifyBatch(exam_id) {
        Modal.confirm({
            title: 'Notify',
            icon: <ExclamationCircleOutlined />,
            content: 'Do you want to notify the batch?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {

                const payload = {
                    exam_id : exam_id
                }

                examService.notifyBatch(payload).then(response => {
                    if (response.data.success) {
                        this.openNotificationWithIcon("success", "Exam", response.data.msg);
                    }
                })
            }
        });
    }

    exportEnrolledStudents(examId){
        examService.getEnrolledStudents(examId).then(response => {
            if (response.data.success) {
                window.open("http://localhost:5000/"+response.data.data,'blank')
            }
        })
    }
    
    showExamResultsModal(record){
        this.setState({
            examResultsVisible: true,
            exam: record
        });
    }

    showAddNewExamModal(isNewRecord, record) {
        this.setState({
            exam: record,
            visible: true,
            isNewRecord : isNewRecord
        });
    }

    handleAddNewExamFormCancel = (e) => {
        this.setState({
            visible: false
        });
    };

    handleExamResultsFormCancel = (e) => {
        this.setState({
            examResultsVisible: false
        });
    };

    handlerSearch = (e) => {
      if(e.key == "Enter"){
          this.setState({isSearchLoading:true})
          let searchText = e.target.value;
          examService.searchExames(searchText).then(response => {
              this.setState({
                  data: response.data.data,
                  isSearchLoading:false
              })
          })
      }
    }

    openNotificationWithIcon(type, title, msg) {
        notification[type]({
            message: title,
            description: msg,
        });
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
                                this.showAddNewExamModal(true, null)
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
                                this.handleAddNewExamFormCancel(e)
                            }}
                            title="Exam Form"
                            footer={[]}
                            width={500}
                        >
                            <ExamForm exam={this.state.exam} loadTable={this.loadTable} isNewRecord={this.state.isNewRecord} />
                        </Modal>
                        <Modal
                            destroyOnClose={true}
                            visible={this.state.examResultsVisible}
                            onCancel={(e) => {
                                this.handleExamResultsFormCancel(e)
                            }}
                            title="Exam Results Form"
                            footer={[]}
                            width={500}
                        >
                            <ExamResultsForm exam={this.state.exam} />
                        </Modal>
                    </div>
                </div>


            </div>
        );
    }
}
