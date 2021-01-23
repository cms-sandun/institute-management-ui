import React from "react";
import {Form, Input, Upload, Select, Button, notification, DatePicker} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import studentService from "../../services/studentService";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";

const {Option} = Select;
const localizer = momentLocalizer(moment);

export default class EventsCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentID: props.student ? props.student.id : '',
      firstName: props.student ? props.student.first_name : '',
      lastName: props.student ? props.student.last_name : '',
      middleName: props.student ? props.student.middle_name : '',
      address: props.student ? props.student.address : '',
      gender: props.student ? props.student.gender : 'male',
      contactNo: props.student ? props.student.contact_no : '',
      dob: props.student ? props.student.dob : '',
      email: props.student ? props.student.email : '',
      firstNameError: "",
      middleNameError: "",
      lastNameError: "",
      addressError: "",
      contactNoError: "",
      dobError: "",
      emailError: ""
    };

    //console.log(this.props.student)

    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.resetErrorLabels = this.resetErrorLabels.bind(this);
    this.setValidationError = this.setValidationError.bind(this);
    this.onInputFieldChangeHandler = this.onInputFieldChangeHandler.bind(this);
    this.onGenderChangeHandler = this.onGenderChangeHandler.bind(this);
  }

  resetErrorLabels() {
    this.setState({
      firstNameError: "",
      middleNameError: "",
      lastNameError: "",
      addressError: "",
      contactNoError: "",
      dobError: "",
      emailError: ""
    });
  }

  resetFields() {
    this.setState({
      firstName: "",
      lastName: "",
      middleName: "",
      address: "",
      gender: "male",
      contactNo: "",
      dob: "",
      email: "",
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

  onGenderChangeHandler(value) {
    this.setState({
      gender: value,
    });
  }

  setValidationError(errorField, errorMsg) {
    this.setState({
      [errorField]: errorMsg
    });
  }

  async onSubmitHandler(event) {
    this.resetErrorLabels();
    let haveErrors = false;

    // Validate first name
    if (!this.state.firstName) {
      this.setValidationError("firstNameError", "First name cannot be empty");
      haveErrors = true
    }

    // Validate middle name
    if (!this.state.middleName) {
      this.setValidationError("middleNameError", "Middle name cannot be empty");
      haveErrors = true
    }

    // Validate last name
    if (!this.state.lastName) {
      this.setValidationError("lastNameError", "Last name cannot be empty");
      haveErrors = true
    }

    // Validate address
    if (!this.state.address) {
      this.setValidationError("addressError", "Address cannot be empty");
      haveErrors = true
    }

    // Validate contact no
    if (!this.state.contactNo) {
      this.setValidationError("contactNoError", "Contact No cannot be empty");
      haveErrors = true
    }

    // Validate DOB
    if (!this.state.dob) {
      this.setValidationError("dobError", "DOB cannot be empty");
      haveErrors = true
    }

    // Validate email
    if (!this.state.email) {
      this.setValidationError("emailError", "Email cannot be empty");
      haveErrors = true
    }

    if(haveErrors) return

    const payload = {
      branchId: 2,
      firstName: this.state.firstName,
      middleName: this.state.middleName,
      lastName: this.state.lastName,
      address: this.state.address,
      gender: this.state.gender,
      contactNo: this.state.contactNo,
      dob: this.state.dob,
      email: this.state.email,
    }

    let response = null
    if (this.props.isNewRecord) {
      response = await studentService.saveStudent(payload);
    }else{
      response = await studentService.updateStudent(this.state.studentID, payload);
    }

    if (response.data.success) {
      this.openNotificationWithIcon("success", "Student", response.data.msg);
      this.resetErrorLabels();
      this.resetFields();
      this.props.loadTable();
    }else{
      this.openNotificationWithIcon("error", "Student", response.data.msg);
    }

  }

  myEventsList = [
    {
      'title': 'BIT colombo - SAD',
      'allDay': true,
      'start': new Date(2021, 0, 22),
      'end': new Date(2021, 0, 22)
    },
    {
      'title': 'FIT - Maths',
      'allDay': true,
      'start': new Date(2021, 0, 23),
      'end': new Date(2021, 0, 23)
    },
    {
      'title': 'IS - Revision',
      'allDay': true,
      'start': new Date(2021, 0, 24),
      'end': new Date(2021, 0, 24)
    },
    {
      'title': 'DTS ENDS',
      'start': new Date(2021, 10, 6, 0, 0, 0),
      'end': new Date(2021, 10, 13, 0, 0, 0)
    },

    {
      'title': 'Some Event',
      'start': new Date(2021, 3, 9, 0, 0, 0),
      'end': new Date(2021, 3, 9, 0, 0, 0)
    },
    {
      'title': 'Conference',
      'start': new Date(2021, 3, 11),
      'end': new Date(2021, 3, 13),
      desc: 'Big conference for important people'
    },
    {
      'title': 'Meeting',
      'start': new Date(2021, 3, 12, 10, 30, 0, 0),
      'end': new Date(2021, 3, 12, 12, 30, 0, 0),
      desc: 'Pre-meeting meeting, to prepare for the meeting'
    },
    {
      'title': 'Lunch',
      'start': new Date(2021, 3, 12, 12, 0, 0, 0),
      'end': new Date(2021, 3, 12, 13, 0, 0, 0),
      desc: 'Power lunch'
    },
    {
      'title': 'Meeting',
      'start': new Date(2021, 3, 12, 14, 0, 0, 0),
      'end': new Date(2021, 3, 12, 15, 0, 0, 0)
    },
    {
      'title': 'Happy Hour',
      'start': new Date(2021, 3, 12, 17, 0, 0, 0),
      'end': new Date(2021, 3, 12, 17, 30, 0, 0),
      desc: 'Most important meal of the day'
    },
    {
      'title': 'Dinner',
      'start': new Date(2021, 3, 12, 20, 0, 0, 0),
      'end': new Date(2021, 3, 12, 21, 0, 0, 0)
    },
    {
      'title': 'Birthday Party',
      'start': new Date(2021, 3, 13, 7, 0, 0),
      'end': new Date(2021, 3, 13, 10, 30, 0)
    },
    {
      'title': 'Birthday Party 2',
      'start': new Date(2021, 3, 13, 7, 0, 0),
      'end': new Date(2021, 3, 13, 10, 30, 0)
    },
    {
      'title': 'Birthday Party 3',
      'start': new Date(2021, 3, 13, 7, 0, 0),
      'end': new Date(2021, 3, 13, 10, 30, 0)
    },
    {
      'title': 'Late Night Event',
      'start': new Date(2021, 3, 17, 19, 30, 0),
      'end': new Date(2021, 3, 18, 2, 0, 0)
    },
    {
      'title': 'Multi-day Event',
      'start': new Date(2021, 3, 20, 19, 30, 0),
      'end': new Date(2021, 3, 22, 2, 0, 0)
    }
  ]

  render() {
    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <Calendar
                  localizer={localizer}
                  events={this.myEventsList}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: 500 }}
              />
            </div>
          </div>
        </div>
    );
  }
}
