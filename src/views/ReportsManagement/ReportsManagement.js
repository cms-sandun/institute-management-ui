import React from "react";
import {Form, Input, Upload, Select, Button, notification, DatePicker, Card} from "antd";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import examService from "../../services/examService";
import reportService from "../../services/reportService";

const {Option} = Select;
const localizer = momentLocalizer(moment);

export default class ReportsManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      examsList: [],
      report1SelectedExam: ''
    }

    this.getExamList = this.getExamList.bind(this);
    this.loadExams = this.loadExams.bind(this);
    this.onExamChangeHandler = this.onExamChangeHandler.bind(this);
    this.generateResultsSummaryReport = this.generateResultsSummaryReport.bind(this);
  }

  getExamList() {
    examService.getAllExames().then(response => {
      if (response.data.success) {
        this.setState({
          examsList: response.data.data
        })
      }
    })
  }

  loadExams() {
    return (
        <>
          {this.state.examsList.length > 0 && this.state.examsList.map(exam => {
            return (
                <Option key={exam.id} value={exam.id}>{exam.exam_name}</Option>
            )
          })}
        </>
    )
  }

  onExamChangeHandler(value) {
    this.setState({
      report1SelectedExam: value
    })
  }

  componentDidMount() {
    this.props.setBreadCrumb("Reports", "View");
    this.getExamList()
  }

  openNotificationWithIcon(type, title, msg) {
    notification[type]({
      message: title,
      description: msg,
    });
  }

  generateResultsSummaryReport() {
    if(!this.state.report1SelectedExam) {
      this.openNotificationWithIcon("error", "Report", "Please select exam");
      return
    }

    reportService.getResultSummaryReport(this.state.report1SelectedExam).then(response => {
      if (response.data.success) {
        window.open("http://localhost:5000/" + response.data.data, 'blank')
      }
    })
  }

  render() {
    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <Card title="Results Summary">
                <Select
                    placeholder="Select Exam"
                    name="exam"
                    className="w-100"
                    onChange={this.onExamChangeHandler}

                >
                  {this.loadExams()}
                </Select>
                <Button
                    className="form-button submit-button"
                    type="primary"
                    onClick={this.generateResultsSummaryReport}
                >
                  Generate Report
                </Button>
              </Card>
            </div>
            <div className="col">

            </div>
            <div className="col">

            </div>
          </div>
        </div>
    );
  }
}
