import React from "react";
import UserForm from "./UserForm";
import {Table, Space, Button, Modal, Popconfirm, Input} from "antd";
import {EditOutlined, DeleteOutlined, ExclamationCircleOutlined, WindowsOutlined} from '@ant-design/icons';
import ManageRolesForm from "./ManageRolesForm";

const {confirm} = Modal;
const {Search} = Input;

export default class UserManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            visibleManageRoles: true,
            data: [],
            user: null,
            isSearchLoading: false,
            isNewRecord: true
        };

        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.showDeleteConfirmation = this.showDeleteConfirmation.bind(this);
        this.loadTable = this.loadTable.bind(this);
    }

    columns = [
        {
            title: "User Name",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
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
        this.setState({
            data: [
                {
                    "username": "Sandun",
                    "role": "Admin",
                    "created_at": "2021-01-23"
                },
                {
                    "username": "Sandamali",
                    "role": "User",
                    "created_at": "2021-01-24"
                },
                {
                    "username": "Saman",
                    "role": "Admin",
                    "created_at": "2021-01-25"
                }
            ]
        })
    }


    componentDidMount() {
        this.loadTable()
    }

    deleteUser(userId) {
        Modal.confirm({
            title: 'Delete',
            icon: <ExclamationCircleOutlined/>,
            content: 'Do you want to delete?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {

            }
        });
    }

    showDeleteConfirmation(userId) {
        this.deleteUser(userId);
    }

    showModal(isNewRecord, record) {
        this.setState({
            user: record,
            visible: true,
            isNewRecord: isNewRecord
        });
    }

    showManageRolesModal(isNewRecord, record) {
        this.setState({
            user: record,
            visibleManageRoles: true,
            isNewRecord: isNewRecord
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
            visibleManageRoles: false,
        });
    };

    handlerSearch = (e) => {
        if (e.key == "Enter") {
            this.setState({isSearchLoading: true})
            let searchText = e.target.value;

        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                        <Search onKeyUp={this.handlerSearch} placeholder="Search By Name"
                                loading={this.state.isSearchLoading}/>
                    </div>

                    <div className="col-md-6 text-right">
                        <Button
                            style={{float: "right", marginBottom: "10px", zIndex: '1'}}
                            type="primary"
                            className="success-btn"
                            onClick={() => {
                                this.showManageRolesModal(true, null)
                            }}
                        >
                            Manage Roles
                        </Button>

                        <Button
                            style={{marginBottom: "10px", zIndex: '1'}}
                            type="primary"
                            className="success-btn"
                            onClick={() => {
                                this.showModal(true, null)
                            }}
                        >
                            Add New User
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
                            title="User Form"
                            footer={[]}
                            width={900}
                        >
                            <UserForm user={this.state.user} loadTable={this.loadTable}
                                      isNewRecord={this.state.isNewRecord}/>
                        </Modal>


                        <Modal
                            destroyOnClose={true}
                            visible={this.state.visibleManageRoles}
                            onCancel={(e) => {
                                this.handleCancel(e)
                            }}
                            title="Manage Roles Form"
                            footer={[]}
                            width={900}
                        >
                            <ManageRolesForm user={this.state.user} loadTable={this.loadTable}
                                             isNewRecord={this.state.isNewRecord}/>
                        </Modal>


                    </div>
                </div>


            </div>
        );
    }
}
