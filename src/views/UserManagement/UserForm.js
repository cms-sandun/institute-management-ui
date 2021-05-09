import React from "react";
import {Form, Input, Upload, Select, Button, notification, DatePicker} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import studentService from "../../services/studentService";
import userService from "../../services/userService";
import employeeService from "../../services/employeeService";

const {Option} = Select;

export default class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userID:'',
            employee: '',
            userName: props.student ? props.student.first_name : '',
            password: props.student ? props.student.last_name : '',
            role: props.student ? props.student.middle_name : '',
            employeeList:[],
            employeeError: "",
            userNameError: "",
            passwordError: "",
            roleError: ""
        };

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.resetErrorLabels = this.resetErrorLabels.bind(this);
        this.setValidationError = this.setValidationError.bind(this);
        this.onInputFieldChangeHandler = this.onInputFieldChangeHandler.bind(this);
        this.onEmployeeChangeHandler = this.onEmployeeChangeHandler.bind(this);
        this.onRoleChangeHandler = this.onRoleChangeHandler.bind(this);
    }

    resetErrorLabels() {
        this.setState({
            employeeError: "",
            userNameError: "",
            passwordError: "",
            roleError: ""
        });
    }

    loadEmployees(){
        employeeService.getAllEmployees().then(
            response => {
                this.setState({
                    employeeList: response.data.data
                })
            }
        )
    }

    resetFields() {
        this.setState({
            employee: "",
            userName: "",
            password: "",
            role: ""
        });
    }

    openNotificationWithIcon(type, title, msg) {
        notification[type]({
            message: title,
            description: msg,
        });
    }

    onInputFieldChangeHandler(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    onEmployeeChangeHandler(value) {
        this.setState({
            employee: value,
        });
    }

    onRoleChangeHandler(value) {
        this.setState({
            role: value,
        });
    }

    setValidationError(errorField, errorMsg) {
        this.setState({
            [errorField]: errorMsg
        });
    }

    componentDidMount() {
        this.loadEmployees()
    }

    async onSubmitHandler(event) {
        this.resetErrorLabels();
        let haveErrors = false;

        // Validate first name
        if (!this.state.employee) {
            this.setValidationError("employeeError", "Select employee");
            haveErrors = true
        }

        // Validate middle name
        if (!this.state.userName) {
            this.setValidationError("userNameError", "Enter username");
            haveErrors = true
        }

        // Validate last name
        if (!this.state.password) {
            this.setValidationError("passwordError", "Enter password");
            haveErrors = true
        }

        // Validate address
        if (!this.state.role) {
            this.setValidationError("roleError", "Select role");
            haveErrors = true
        }

        if (haveErrors) return

        const payload = {
            employee_id: this.state.employee,
            name: this.state.userName,
            password: this.state.password,
            user_type: this.state.role,
            employee: this.state.employee
        }

        let response = null
        if (this.props.isNewRecord) {
            response = await userService.saveUser(payload);
        } else {
            response = await userService.saveUser(this.state.userID, payload);
        }

        if (response.data.success) {
            this.openNotificationWithIcon("success", "User", response.data.msg);
            this.resetErrorLabels();
            this.resetFields();
            this.props.loadTable();
        } else {
            this.openNotificationWithIcon("error", "User", response.data.msg);
        }

    }

     employeeArray = () => {
        return (
            <>
                {this.state.employeeList.length >0 && this.state.employeeList.map(emp => {
                    return (
                        <Option key={emp.id} value={emp.id}>{emp.first_name}</Option>
                    )
                })}
            </>
        )
    }

    render() {
        return (
            <form>
                <div className='row'>
                    <div className='col-md-12'>
                        <Form.Item>
                            <Select
                                // defaultSelected={this.state.employee}
                                placeholder="Select Employee"
                                name="employee" onChange={this.onEmployeeChangeHandler}

                            >
                                {this.employeeArray()}
                            </Select>
                            <label className="error-label">
                                {this.state.employeeError}
                            </label>
                        </Form.Item>

                        <Form.Item>
                            <Input
                                onChange={this.onInputFieldChangeHandler}
                                name="userName"
                                value={this.state.userName}
                                placeholder='User Name'
                            />
                            <label className="error-label">
                                {this.state.userNameError}
                            </label>
                        </Form.Item>

                        <Form.Item>
                            <Input
                                type='password'
                                onChange={this.onInputFieldChangeHandler}
                                name="password"
                                value={this.state.password}
                                placeholder='Password'
                            />
                            <label className="error-label">
                                {this.state.passwordError}
                            </label>
                        </Form.Item>

                        <Form.Item>
                            <Select
                                onChange={this.onRoleChangeHandler}
                                name="role"
                                placeholder="Select Role"
                            >
                                <Option value="admin">Admin</Option>
                                <Option value="teacher">Teacher</Option>
                                <Option value="student">Student</Option>
                                <Option value="receptionist">Receptionist</Option>
                            </Select>
                            <label className="error-label">
                                {this.state.roleError}
                            </label>
                        </Form.Item>

                        <Form.Item style={{textAlign: "right"}}>
                            <Button
                                className="form-button submit-button"
                                type="primary"
                                onClick={this.onSubmitHandler}
                            >
                                Submit
                            </Button>
                        </Form.Item>


                    </div>
                </div>
            </form>
        );
    }
}
