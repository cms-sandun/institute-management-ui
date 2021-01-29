import React from "react";
import {Layout, Menu, Breadcrumb, Badge, Avatar, Form, Upload, Input, Select, Button, Typography, Space, Checkbox} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const {Title, Link, Text} = Typography;


export default class Login extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    render() {
        return (
            <form>
                <div className='row'>
                    <div className='col '>
                        <div className='login-control-wrapper mx-auto align-middle'
                             style={{marginTop: '5px', width: '40%', padding: '65px',boxShadow: '0px 0px 10px 1px #001628', backgroundColor:'#299398'}}>
                            <img className='img-fluid w-50 mx-auto d-block' src={window.location.origin+"/logo_login.png"}/>
                            <Title className='text-white' level={3}>SipZone Education Institute</Title>
                            <Text type="secondary" className='d-block mb-3 text-white'>Login to the account</Text>
                            <Form.Item>
                                <Input
                                    onChange={this.onInputFieldChangeHandler}
                                    name="userName"
                                    value={this.state.firstName}
                                    placeholder='User Name'
                                    prefix={<UserOutlined/>}
                                />
                                <label className="error-label">
                                    {this.state.firstNameError}
                                </label>
                            </Form.Item>
                            <Form.Item>
                                <Input
                                    onChange={this.onInputFieldChangeHandler}
                                    name="password"
                                    value={this.state.middleName}
                                    placeholder='Password'
                                    prefix={<LockOutlined/>}
                                    type='password'
                                />
                                <label className="error-label">
                                    {this.state.middleNameError}
                                </label>
                            </Form.Item>
                            <label className="text-white">
                                Please enter correct credentials
                            </label>
                            <Button
                                type="primary"
                                className="success-btn w-100 mt-3"
                            >
                                Login
                            </Button>
                            <Form.Item>
                                <a className='text-white' href="#">Forgot Password</a>
                            </Form.Item>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
