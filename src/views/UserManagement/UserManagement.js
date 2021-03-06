import React from "react";
import UserForm from "./UserForm";
import {Table, Space, Button, Modal, Popconfirm, Input, notification} from "antd";
import {EditOutlined, DeleteOutlined, ExclamationCircleOutlined, WindowsOutlined} from '@ant-design/icons';
import ManageRolesForm from "./ManageRolesForm";
import studentService from "../../services/studentService";
import userService from "../../services/userService";

const {confirm} = Modal;
const {Search} = Input;

export default class UserManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            visibleManageRoles: false,
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
            dataIndex: "user_type",
            key: "user_type",
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
        userService.getAllUsers().then(response => {
            this.setState({
                data: response.data.data
            })
        })
    }

    openNotificationWithIcon(type, title, msg) {
        notification[type]({
            message: title,
            description: msg,
        });
    }


    componentDidMount() {
        this.loadTable()
        this.props.setBreadCrumb("Users", "View");
    }

    deleteUser(userId) {
        Modal.confirm({
            title: 'Delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Do you want to delete?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                userService.deleteUser(userId).then(response => {
                    if (response.data.success) {
                        this.openNotificationWithIcon("success", "User", response.data.msg);
                        this.loadTable();
                    }else{
                        this.openNotificationWithIcon("error", "User", response.data.msg);
                    }
                })
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
                            width={400}
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
