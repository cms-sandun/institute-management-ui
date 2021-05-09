import React from "react";
import {Form, Input, Upload, Select, Button, notification, DatePicker,Card} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import studentService from "../../services/studentService";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import eventsService from "../../services/eventsService";

const {Option} = Select;
const localizer = momentLocalizer(moment);

export default class ReportsManagement extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setBreadCrumb("Reports", "View");
  }

  render() {
    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <Card title="Results Summary">
                <Input
                    name="examName"
                    placeholder='Exam Name'
                />
                <Button
                    className="form-button submit-button"
                    type="primary"
                >
                  Generate Report
                </Button>
              </Card>
            </div>
            <div className="col">
              <Card title="Card title">
                Card content
              </Card>
            </div>
            <div className="col">
              <Card title="Card title">
                Card content
              </Card>
            </div>
          </div>
        </div>
    );
  }
}
