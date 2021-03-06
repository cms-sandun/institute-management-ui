import React from "react";
import {Layout, Menu, Breadcrumb, Badge, Avatar, Drawer, Dropdown} from "antd";
import {Route, Link} from "react-router-dom";
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
import PaymentManagement from "../PaymentManagement/PaymentManagement";
import ReportsManagement from "../ReportsManagement/ReportsManagement";
import authService from "../../services/authService";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;


export default class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            collapsed: false,
            isDrawerVisible: false,
            breadcrumbMainPath: '',
            breadcrumbSubPath: '',
            userName: '',
            userObj:''
        };

        this.hasPermissions = this.hasPermissions.bind(this);
    }

    getMenu(){
        return(
            <Menu>
                <Menu.Item key="0">
                    <a href="/login">Logout</a>
                </Menu.Item>
            </Menu>
        )
    }

    showDrawer = () => {
        this.setState({
            isDrawerVisible: true,
        });
    };

    setBreadCrumb = (mainPath, subPath) => {
        this.setState({
            breadcrumbMainPath: mainPath,
            breadcrumbSubPath: subPath,
        })
    }

    onCloseDrawer = () => {
        this.setState({
            isDrawerVisible: false,
        });
    };

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    componentDidMount() {
        if(!authService.isLogged()){
            window.location.replace("/login")
            return
        }

        let userJson = localStorage.getItem('user')
        const userObj = JSON.parse(userJson)
        const userName = userObj.username


        this.setState({
            userObj : userObj,
            userName: userName
        })

    }

    permissionMap = {
        admin : ['users','reports','employees','students','courses','batches','classes','exams','calendar','payments','attendance'],
        teacher : ['exams','attendance'],
        student : ['users','reports'],
        receptionist : ['students','courses','batches','classes','payments']
    }

    hasPermissions(screen) {
        let user_role = this.state.userObj.user_type

        if(user_role != undefined){
            let permissionArr = this.permissionMap[user_role]
            console.log(permissionArr)
            return !permissionArr.includes(screen)
       }
    }

    render() {
        return (
            <Layout style={{minHeight: "100vh"}}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={["0"]} mode="inline">
                        <Menu.Item key="0" icon={<UsergroupAddOutlined/>}>
                            <Link to='/'>Home</Link>
                        </Menu.Item>
                        <Menu.Item disabled={this.hasPermissions('users')} key="1" icon={<UsergroupAddOutlined/>}>
                            <Link to='/users'>Users</Link>
                        </Menu.Item>
                        <Menu.Item disabled={this.hasPermissions('employees')} key="2" icon={<UsergroupAddOutlined/>}>
                            <Link to='/employees'>Employees</Link>
                        </Menu.Item>
                        <Menu.Item disabled={this.hasPermissions('students')} key="3" icon={<UsergroupAddOutlined/>}>
                            <Link to="/students">Students</Link>
                        </Menu.Item>
                        <Menu.Item disabled={this.hasPermissions('courses')} key="4" icon={<BookOutlined/>}>
                            <Link to='/courses'>Courses</Link>
                        </Menu.Item>
                        <Menu.Item disabled={this.hasPermissions('batches')} key="5" icon={<GroupOutlined/>}>
                            <Link to="/batches">Batches</Link>
                        </Menu.Item>
                        <Menu.Item disabled={this.hasPermissions('classes')} key="7" icon={<BookOutlined/>}>
                            <Link to='/classes'>Classes</Link>
                        </Menu.Item>
                        <Menu.Item disabled={this.hasPermissions('exams')} key="8" icon={<PaperClipOutlined/>}>
                            <Link to="/exams">Exams</Link>
                        </Menu.Item>
                        <Menu.Item disabled={this.hasPermissions('calendar')} key="9" icon={<CalendarOutlined/>}>
                            <Link to='/calendar'>Calendar</Link>
                        </Menu.Item>
                        <Menu.Item disabled={this.hasPermissions('payments')} key="10" icon={<DollarCircleOutlined/>}>
                            <Link to='/payments'>Payments</Link>
                        </Menu.Item>
                        <Menu.Item disabled={this.hasPermissions('attendance')} key="11" icon={<BarChartOutlined/>}>
                            <Link to='/attendance'>Stu. Attendance</Link>
                        </Menu.Item>
                        <Menu.Item disabled={this.hasPermissions('reports')} key="12" icon={<BarChartOutlined/>}>
                            <Link to='/reports'>Reports</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background">

                        <div style={{float: "left"}}>
                            <img className='institute-logo' width={50} src={window.location.origin + "/logo.jpg"}/>
                            <label className='ml-4 mb-0 institute-name-label'>SipZone Education Institute</label>
                        </div>

                        <div style={{float: "right", cursor: 'pointer'}}>
                            <Badge dot onClick={this.showDrawer}>
                                <NotificationOutlined/>
                            </Badge>
                            <Avatar style={{marginLeft: "20px"}} icon={<UserOutlined/>}/>
                            <Dropdown className='ml-2' overlay={this.getMenu()} trigger={['click']}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    {this.state.userName}
                                </a>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content style={{margin: "0 16px"}}>
                        <Breadcrumb style={{margin: "16px 0"}}>
                            <Breadcrumb.Item> <Link to='/'>{this.state.breadcrumbMainPath}</Link></Breadcrumb.Item>
                            <Breadcrumb.Item> <Link to='/'>{this.state.breadcrumbSubPath}</Link></Breadcrumb.Item>
                        </Breadcrumb>
                        <div
                            className="site-layout-background"
                            style={{padding: 24, minHeight: '100%'}}
                        >
                            <Route path="/" exact render={(props) => (
                                <EventsCalendar {...props} setBreadCrumb={this.setBreadCrumb}/>
                            )}/>
                            <Route path="/students" exact render={(props) => (
                                <StudentManagement {...props} setBreadCrumb={this.setBreadCrumb}/>
                            )}/>
                            <Route path="/employees" exact render={(props) => (
                                <EmployeeManagement {...props} setBreadCrumb={this.setBreadCrumb}/>
                            )}/>
                            <Route path="/batches" exact render={(props) => (
                                <BatchManagement {...props} setBreadCrumb={this.setBreadCrumb}/>
                            )}/>
                            <Route path="/courses" exact render={(props) => (
                                <CourseManagement {...props} setBreadCrumb={this.setBreadCrumb}/>
                            )}/>
                            <Route path="/exams" exact render={(props) => (
                                <ExamManagement {...props} setBreadCrumb={this.setBreadCrumb}/>
                            )}/>
                            <Route path="/attendance" exact render={(props) => (
                                <StuAttendanceManagement {...props} setBreadCrumb={this.setBreadCrumb}/>
                            )}/>
                            <Route path="/calendar" exact render={(props) => (
                                <EventsCalendar {...props} setBreadCrumb={this.setBreadCrumb}/>
                            )}/>
                            <Route path="/login" exact render={(props) => (
                                <Login {...props} setBreadCrumb={this.setBreadCrumb}/>
                            )}/>
                            <Route path="/users" exact render={(props) => (
                                <UserManagement {...props} setBreadCrumb={this.setBreadCrumb}/>
                            )}/>
                            <Route path="/classes" exact render={(props) => (
                                <ClassManagement {...props} setBreadCrumb={this.setBreadCrumb}/>
                            )}/>
                            <Route path="/payments" exact render={(props) => (
                                <PaymentManagement {...props} setBreadCrumb={this.setBreadCrumb}/>
                            )}/>
                            <Route path="/reports" exact render={(props) => (
                                <ReportsManagement {...props} setBreadCrumb={this.setBreadCrumb}/>
                            )}/>
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
                    <Footer style={{textAlign: "center"}}></Footer>
                </Layout>
            </Layout>
        );
    }
}
