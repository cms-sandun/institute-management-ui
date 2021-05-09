import React from "react";
import {
    Layout,
    Menu,
    Breadcrumb,
    Badge,
    Avatar,
    Form,
    Upload,
    Input,
    Select,
    Button,
    Typography,
    Space,
    Checkbox
} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import authService from "../../services/authService";
import Dashboard from "./Dashboard";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const {Title, Link, Text} = Typography;


export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            userName: '',
            pwd: '',
            errMsg: ''
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onUserPwdChangeHandler = this.onUserPwdChangeHandler.bind(this);
        this.onUserNameChangeHandler = this.onUserNameChangeHandler.bind(this);
    }

    onCollapse = (collapsed) => {
        this.setState({collapsed});
    };

    onUserNameChangeHandler(e){
     this.setState({
         userName : e.target.value
     })
    }

    onUserPwdChangeHandler(e){
        this.setState({
            pwd : e.target.value
        })
    }

    onSubmitHandler() {
        // Reset error label
        this.setState({
            errMsg:""
        })

        // Validation
        if(this.state.userName == "" || this.state.pwd == ""){
            this.setState({
                errMsg:"Please enter valid credentials"
            })
            return
        }

        const payload = {
            user_name: this.state.userName,
            pwd: this.state.pwd,
            userNameError: '',
            pwdError: ''
        }

        authService.login(payload).then(response => {
            if (response.data.data) {
                localStorage.setItem('user', JSON.stringify(response.data.data))
                window.location.replace("/")
            } else {
                this.setState({
                    errMsg: response.data.msg
                })
            }
        })
    }

    render() {
        return (
            <form>
                <div className='row'>
                    <div className='col '>
                        <div className='login-control-wrapper mx-auto align-middle mt-5'
                             style={{
                                 marginTop: '5px',
                                 width: '40%',
                                 padding: '65px',
                                 boxShadow: '0px 0px 10px 1px #001628',
                                 backgroundColor: '#299398'
                             }}>
                            <img className='img-fluid w-50 mx-auto d-block'
                                 src={window.location.origin + "/logo_login.png"}/>
                            <Title className='text-white text-center mb-4' level={3}>SipZone Education Institute</Title>
                            <Text type="secondary" className='d-block mb-3 text-white'>Login to the account</Text>
                            <Form.Item>
                                <Input
                                    onChange={this.onUserNameChangeHandler}
                                    name="userName"
                                    value={this.state.userName}
                                    placeholder='User Name'
                                    prefix={<UserOutlined/>}
                                />
                                <label className="error-label">
                                    {this.state.userNameError}
                                </label>
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    onChange={this.onUserPwdChangeHandler}
                                    name="password"
                                    value={this.state.pwd}
                                    placeholder='Password'
                                    prefix={<LockOutlined/>}
                                    type='password'
                                />
                                <label className="error-label">
                                    {this.state.pwdError}
                                </label>
                            </Form.Item>
                            <label className="text-white">
                                {this.state.errMsg}
                            </label>
                            <Button
                                type="primary"
                                className="success-btn w-100 mt-3"
                                onClick={this.onSubmitHandler}
                            >
                                Login

                            </Button>
                            <Form.Item>
                                <a className='text-white' href="#">Reset Password</a>
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
