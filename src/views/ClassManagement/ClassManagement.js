import React from "react";

import {Table, Space, Button, Modal, Popconfirm, Input, notification} from "antd";
import classService from "../../services/classService";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import ClassForm from "../ClassManagement/ClassForm";
import studentService from "../../services/studentService";

const {confirm} = Modal;
const {Search} = Input;

export default class ClassManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            data: [],
            class: null,
            isSearchLoading: false,
            isNewRecord: true
        };

        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.deleteClass = this.deleteClass.bind(this);
        this.showDeleteConfirmation = this.showDeleteConfirmation.bind(this);
        this.loadTable = this.loadTable.bind(this);
    }

    columns = [
        {
            title: "Name",
            dataIndex: "name", //db column
            key: "name", //unique key for column
        },
        {
            title: "Day",
            dataIndex: "day",
            key: "day",
        },
        {
            title: "Start At",
            dataIndex: "start_at",
            key: "startAt",
        },
        {
            title: "End At",
            dataIndex: "end_at",
            key: "endAt",
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
    ]

    showModal(isNewRecord, record) {
        this.setState({
            class: record,
            visible: true,
            isNewRecord : isNewRecord
        });
    }

    showDeleteConfirmation(classId) {
            this.deleteClass(classId);
    }


    deleteClass(classId) {
        Modal.confirm({
            title: 'Delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Do you want to delete?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                classService.deleteClass(classId).then(response => {
                    if (response.data.success) {
                        this.openNotificationWithIcon("success", "Class", response.data.msg);
                        this.loadTable();
                    }else{
                        this.openNotificationWithIcon("error", "Class", response.data.msg);
                    }
                })
            }
        });
    }

    openNotificationWithIcon(type, title, msg) {
        notification[type]({
            message: title,
            description: msg,
        });
    }

    handlerSearch = (e) => {
        if(e.key == "Enter"){
            this.setState({isSearchLoading:true})
            let searchText = e.target.value;
            classService.searchClasss(searchText).then(response => {
                this.setState({
                    data: response.data.data,
                    isSearchLoading:false
                })
            })
        }
    }

    loadTable() {
        classService.getAllClass().then(response => {
            this.setState({
                data: response.data.data
            })
        })
    }


    handleCancel = (e) => {
        this.setState({
            visible: false
        });
    };

    //after click student from menu // react function
    componentDidMount() {
        this.loadTable();
        this.props.setBreadCrumb("Classes", "View");
    }

    render() {
        return (
            <div className="container-fluid">

                <div className="row">
                    <div className="col-md-6">
                        <Search onKeyUp={this.handlerSearch} placeholder="Search By Name"
                                loading={this.state.isSearchLoading}/>
                    </div>

                    <div className="col-md-6">
                        <Button
                            style={{float: "right", marginBottom: "10px", zIndex: '1'}}
                            type="primary"
                            className="success-btn"
                            onClick={() => {
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
                            title="Class Form"
                            footer={[]}
                            width={900}
                        >
                            <ClassForm class={this.state.class} loadTable={this.loadTable}
                                         isNewRecord={this.state.isNewRecord}/>
                        </Modal>
                    </div>
                </div>


            </div>
        );
    }

}