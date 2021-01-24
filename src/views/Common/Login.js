import React from "react";
import {Layout, Menu, Breadcrumb, Badge, Avatar, Form, Upload, Input, Select, Button, Typography,Space} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;
const { Title, Link, Text } = Typography;


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
                               style={{marginTop: '10%', width: '40%',padding: '65px', backgroundColor:'#efefef'}}>
                            <Title level={3}>Sip Zone Education Institute</Title>
                            <Text type="secondary" className='d-block mb-3'>Login to the account</Text>
                            <Form.Item>
                              <Input
                                  onChange={this.onInputFieldChangeHandler}
                                  name="userName"
                                  value={this.state.firstName}
                                  placeholder='User Name'
                                  prefix={<UserOutlined />}
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
                                  prefix={<LockOutlined />}
                              />
                              <label className="error-label">
                                {this.state.middleNameError}
                              </label>
                            </Form.Item>
                            <Button
                                type="primary"
                                className="success-btn w-100"
                            >
                              Login
                            </Button>
                          </div>
                        </div>
                    </div>
                </form>
        );
    }
}
