import React from "react";
import { Layout, Menu, Breadcrumb, Badge, Avatar,Drawer } from "antd";
import { Route, Link } from "react-router-dom";
import {
  NotificationOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  BookOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  CalendarOutlined,
  DollarCircleOutlined,
  BranchesOutlined,
  GroupOutlined,
  PaperClipOutlined
} from "@ant-design/icons";
import StudentManagement from "../StudentManagement/StudentManagement";
import BatchManagement from "../BatchManagement/BatchManagement";
import CourseManagement from "../CourseManagement/CourseManagement";
import ExamManagement from "../ExamManagement/ExamManagement";
import EventsCalendar from "../EventsCalendar/EventsCalendar";
import Login from "./Login";
import UserManagement from "../UserManagement/UserManagement";
import EmployeeManagement from "../EmployeeManagement/EmployeeManagement";
import StuAttendanceManagement from "../StuAttendanceManagement/StuAttendanceManagement";
import ClassManagement from "../ClassManagement/ClassManagement";
import ExamEnrollSuccessPage from "../ExamEnrollementSuccessPage/ExamEnrollSuccessPage";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      collapsed: false,
      isDrawerVisible: false,
      breadcrumbMainPath:'',
      breadcrumbSubPath:''
    };

   //this.setBreadCrumb = this.setBreadCrumb.bind(this);
  }

  showDrawer = () => {
    this.setState({
      isDrawerVisible: true,
    });
  };

  setBreadCrumb = (mainPath, subPath) =>{
    this.setState({
      breadcrumbMainPath:mainPath,
      breadcrumbSubPath:subPath,
    })
  }

  onCloseDrawer = () => {
    this.setState({
      isDrawerVisible: false,
    });
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
            <Menu.Item key="1" icon={<UsergroupAddOutlined />}>
              <Link to='/users'>Users</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<UsergroupAddOutlined />}>
            <Link to='/employees'>Employees</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UsergroupAddOutlined />}>
              <Link to="/students">Students</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<BookOutlined />}>
            <Link to='/courses'>Courses</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<GroupOutlined />}>
              <Link to="/batches">Batches</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<BranchesOutlined />}>
            <Link to='/'>Branches</Link>
            </Menu.Item>
            <Menu.Item key="7" icon={<BookOutlined />}>
            <Link to='/classes'>Classes</Link>
            </Menu.Item>
            <Menu.Item key="8" icon={<PaperClipOutlined />}>
              <Link to="/exams">Exams</Link>
            </Menu.Item>
            <Menu.Item key="9" icon={<CalendarOutlined />}>
            <Link to='/calendar'>Calendar</Link>
            </Menu.Item>
            <Menu.Item key="10" icon={<DollarCircleOutlined />}>
            <Link to='/'>Payments</Link>
            </Menu.Item>
            <Menu.Item key="11" icon={<BarChartOutlined />}>
            <Link to='/attendance'>Stu. Attendance</Link>
            </Menu.Item>
            <SubMenu key="12" icon={<AreaChartOutlined />} title="Reports">
              {/*<Menu.Item key="13"> <Link to='/'>Students</Link></Menu.Item>
              <Menu.Item key="14"> <Link to='/'>Income</Link></Menu.Item>*/}
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background">

            <div style={{ float: "left" }}>
              <img className='institute-logo' width={50} src={window.location.origin+"/logo.jpg"} />
              <label className='ml-4 mb-0 institute-name-label'>SipZone Education Institute</label>
            </div>

            <div style={{ float: "right", cursor:'pointer'}}>
              <Badge dot onClick={this.showDrawer}>
                <NotificationOutlined />
              </Badge>
              <Avatar style={{ marginLeft: "20px" }} icon={<UserOutlined />} />
              <label className='ml-2'>Sandamali Niroshini</label>
            </div>
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item> <Link to='/'>{this.state.breadcrumbMainPath}</Link></Breadcrumb.Item>
              <Breadcrumb.Item> <Link to='/'>{this.state.breadcrumbSubPath}</Link></Breadcrumb.Item>
            </Breadcrumb>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: '100%' }}
            >
              <Route path="/" exact render={()=><h1>This is Home</h1>} />
              <Route path="/students" exact render={(props) => (
                  <StudentManagement {...props} setBreadCrumb={this.setBreadCrumb}/>
              )}/>
              <Route path="/employees" exact render={(props) => (
                  <EmployeeManagement {...props} setBreadCrumb={this.setBreadCrumb}/>
              )} />
              <Route path="/batches" exact render={(props) => (
                  <BatchManagement {...props} setBreadCrumb={this.setBreadCrumb}/>
              )} />
              <Route path="/courses" exact render={(props) => (
                  <CourseManagement {...props} setBreadCrumb={this.setBreadCrumb}/>
              )} />
              <Route path="/exams" exact render={(props) => (
                  <ExamManagement {...props} setBreadCrumb={this.setBreadCrumb}/>
              )} />
              <Route path="/attendance" exact render={(props) => (
                  <StuAttendanceManagement {...props} setBreadCrumb={this.setBreadCrumb}/>
              )} />
              <Route path="/calendar" exact render={(props) => (
                  <EventsCalendar {...props} setBreadCrumb={this.setBreadCrumb}/>
              )} />
              <Route path="/login" exact render={(props) => (
                  <Login {...props} setBreadCrumb={this.setBreadCrumb}/>
              )} />
              <Route path="/users" exact render={(props) => (
                  <UserManagement {...props} setBreadCrumb={this.setBreadCrumb}/>
              )} />
              <Route path="/classes" exact render={(props) => (
                  <ClassManagement {...props} setBreadCrumb={this.setBreadCrumb}/>
              )} />
            </div>
          </Content>
          <Drawer
              title="Basic Drawer"
              placement={"right"}
              closable={true}
              onClose={this.onCloseDrawer}
              visible={this.state.isDrawerVisible}
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
          <Footer style={{ textAlign: "center" }}></Footer>
        </Layout>
      </Layout>
    );
  }
}
