import React from "react";
import { Layout, Menu, Breadcrumb, Badge, Avatar } from "antd";
import { Route, Link } from "react-router-dom";
import {
  DesktopOutlined,
  PieChartOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import StudentManagement from "../StudentManagement/StudentManagement";
import BatchManagement from "../BatchManagement/BatchManagement";
import CourseManagement from "../CourseManagement/CourseManagement";
import ExamManagement from "../ExamManagement/ExamManagement";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class Dashboard extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to='/'>Users</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to='/'>Employees</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<DesktopOutlined />}>
              <Link to="/students">Students</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<DesktopOutlined />}>
            <Link to='/courses'>Courses</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<DesktopOutlined />}>
              <Link to="/batches">Batches</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<DesktopOutlined />}>
            <Link to='/'>Branches</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<DesktopOutlined />}>
            <Link to='/'>Classes</Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<DesktopOutlined />}>
              <Link to="/exams">Exams</Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<DesktopOutlined />}>
            <Link to='/'>Time Table</Link>
            </Menu.Item>
            <Menu.Item key="10" icon={<DesktopOutlined />}>
            <Link to='/'>Payments</Link>
            </Menu.Item>
            <Menu.Item key="11" icon={<DesktopOutlined />}>
            <Link to='/'>Attendance</Link>
            </Menu.Item>
            <SubMenu key="12" icon={<UserOutlined />} title="Reports">
              <Menu.Item key="13"> <Link to='/'>Students</Link></Menu.Item>
              <Menu.Item key="14"> <Link to='/'>Income</Link></Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background">
            <div style={{ float: "right" }}>
              <Badge dot>
                <NotificationOutlined />
              </Badge>
              <Avatar style={{ marginLeft: "20px" }} icon={<UserOutlined />} />
            </div>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item> <Link to='/'>Batches</Link></Breadcrumb.Item>
              <Breadcrumb.Item> <Link to='/'>View</Link></Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            >
              <Route path="/" exact render={()=><h1>This is Home</h1>} />
              <Route path="/students" exact component={StudentManagement} />
              <Route path="/batches" exact component={BatchManagement} />
              <Route path="/courses" exact component={CourseManagement} />
              <Route path="/exams" exact component={ExamManagement} />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
      </Layout>
    );
  }
}
