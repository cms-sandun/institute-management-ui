import React from "react";
import BatchForm from "../BatchManagement/BatchForm";
import {Table, Space, Button, Modal, Popconfirm, Input} from "antd";
import batchService from "../../services/batchService";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const {confirm} = Modal;
const {Search} = Input;

export default class BatchManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            data: [],
            batch: null,
            isSearchLoading:false,
            isNewRecord:true
        };

        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.deleteBatch = this.deleteBatch.bind(this);
        this.showDeleteConfirmation = this.showDeleteConfirmation.bind(this);
        this.loadTable = this.loadTable.bind(this);
    }

    columns = [
        {
            title: "Batch Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Student Count",
            dataIndex: "student_count",
            key: "student_count",
        },
        {
            title: "Course",
            dataIndex: "course_id",
            key: "course_id",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Action",
            key: "action",
            render: (text, record) => (
                <div>
                    <Button type='primary' className='mr-2' icon={<EditOutlined />} onClick={(e) => {
                        this.showModal(false, record)
                    }}>
                    </Button>


                    <Button type='danger' icon={<DeleteOutlined />} onClick={(e) => {
                        this.showDeleteConfirmation(record.id)
                    }}>

                    </Button>
                </div>
            ),
        },
    ];

    loadTable() {
        batchService.getAllBatches().then(response => {
            this.setState({
                data: response.data.data
            })
        })
    }


    componentDidMount() {
        this.loadTable()
        this.props.setBreadCrumb("Batch", "View");
    }

    deleteBatch(batchId) {
        Modal.confirm({
            title: 'Delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Do you want to delete?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                batchService.deleteBatch(batchId).then(response => {
                    if (response.data.success) {
                        this.loadTable()
                    }
                })
            }
        });
    }

    showDeleteConfirmation(batchId) {
        this.deleteBatch(batchId);
    }

    showModal(isNewRecord, record) {
        this.setState({
            batch: record,
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
          batchService.searchBatches(searchText).then(response => {
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
                            title="Batch Form"
                            footer={[]}
                            width={900}
                        >
                            <BatchForm batch={this.state.batch} loadTable={this.loadTable} isNewRecord={this.state.isNewRecord} />
                        </Modal>
                    </div>
                </div>


            </div>
        );
    }
}
