import React from "react";
import EmployeeForm from "./EmployeeForm";
import {Table, Space, Button, Modal, Popconfirm, Input} from "antd";
import employeeService from "../../services/employeeService";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

const {confirm} = Modal;
const {Search} = Input;

export default class EmployeeManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            data: [],
            employee: null,
            isSearchLoading:false,
            isNewRecord:true
        };

        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
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
        employeeService.getAllEmployees().then(response => {
            this.setState({
                data: response.data.data
            })
        })
    }


    componentDidMount() {
        this.loadTable()
        this.props.setBreadCrumb("Employee", "View");
    }

    deleteEmployee(employeeId) {
        Modal.confirm({
            title: 'Delete',
            icon: <ExclamationCircleOutlined />,
            content: 'Do you want to delete?',
            okText: 'Yes',
            cancelText: 'No',
            onOk: () => {
                employeeService.deleteEmployee(employeeId).then(response => {
                    if (response.data.success) {
                        this.loadTable()
                    }
                })
            }
        });
    }

    showDeleteConfirmation(employeeId) {
        this.deleteEmployee(employeeId);
    }

    showModal(isNewRecord, record) {
        this.setState({
            employee: record,
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
          employeeService.searchEmployees(searchText).then(response => {
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
                        <Table columns={this.columns} dataSource={this.state.data} size="small"/>
                        <Modal
                            destroyOnClose={true}
                            visible={this.state.visible}
                            onCancel={(e) => {
                                this.handleCancel(e)
                            }}
                            title="Employee Form"
                            footer={[]}
                            width={900}
                        >
                            <EmployeeForm employee={this.state.employee} loadTable={this.loadTable} isNewRecord={this.state.isNewRecord} />
                        </Modal>
                    </div>
                </div>


            </div>
        );
    }
}
