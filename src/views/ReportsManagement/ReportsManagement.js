import React from "react";
import {Form, Input, Upload, Select, Button, notification, DatePicker, Card} from "antd";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import examService from "../../services/examService";

const {Option} = Select;
const localizer = momentLocalizer(moment);

export default class ReportsManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      examsList: [],
      selectedExam: ''
    }

    this.getExamList = this.getExamList.bind(this);
    this.loadExams = this.loadExams.bind(this);
    this.onExamChangeHandler = this.onExamChangeHandler.bind(this);
  }

  getExamList() {
    examService.getAllExames().then(response => {
      if (response.data.success) {
        this.setState({
          examsList : response.data.data
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

  onExamChangeHandler(value){
    this.setState({
      selectedExam : value
    })
  }

  componentDidMount() {
    this.props.setBreadCrumb("Reports", "View");
    this.getExamList()
  }

  generateResultsSummaryReport(){

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
