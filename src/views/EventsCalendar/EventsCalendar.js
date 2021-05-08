import React from "react";
import {Form, Input, Upload, Select, Button, notification, DatePicker} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import studentService from "../../services/studentService";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import eventsService from "../../services/eventsService";

const {Option} = Select;
const localizer = momentLocalizer(moment);

export default class EventsCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data : []
    };
  }

  getEventsList(){
    eventsService.getAllEvents().then(response=>{
      this.setState({
        data:response.data.data
      })
    })
  }

  componentDidMount() {
    this.props.setBreadCrumb("Calendar", "View");
    this.getEventsList()
  }



  render() {
    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <Calendar
                  localizer={localizer}
                  events={this.state.data}
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
