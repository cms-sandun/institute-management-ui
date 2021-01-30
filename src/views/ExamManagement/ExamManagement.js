import React from "react";
import ExamForm from "../ExamManagement/ExamForm";
import {Table, Space, Button, Modal, Popconfirm, Input} from "antd";
import examService from "../../services/examService";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const {confirm} = Modal;
const {Search} = Input;

export default class ExamManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            data: [],
            exam: null,
            isSearchLoading:false,
            isNewRecord:true
        };

        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.deleteExam = this.deleteExam.bind(this);
        this.showDeleteConfirmation = this.showDeleteConfirmation.bind(this);
        this.loadTable = this.loadTable.bind(this);
    }

    columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Exam Name",
            dataIndex: "exam_name",
            key: "exam_name",
        },
        {
            title: "Start At",
            dataIndex: "start_at",
            key: "start_at",
        },
        {
            title: "End At",
            dataIndex: "end_at",
            key: "end_at",
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

    deleteExam(examId) {
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

    showDeleteConfirmation(examId) {
        this.deleteExam(examId);
    }

    showModal(isNewRecord, record) {
        this.setState({
            exam: record,
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
          examService.searchExames(searchText).then(response => {
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
                            title="Exam Form"
                            footer={[]}
                            width={900}
                        >
                            <ExamForm exam={this.state.exam} loadTable={this.loadTable} isNewRecord={this.state.isNewRecord} />
                        </Modal>
                    </div>
                </div>


            </div>
        );
    }
}
