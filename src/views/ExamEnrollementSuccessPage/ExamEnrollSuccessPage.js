import React from "react";
import {Button,Result} from "antd";
import examService from "../../services/examService";

export default class ExamEnrollSuccessPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            exam : ''
        }
    }

    componentDidMount() {

        var url_string = window.location.href
        var url = new URL(url_string);
        var stu_id = url.searchParams.get("stu_id");
        var exam_id = url.searchParams.get("exam_id");

        examService.enrollToExam(stu_id, exam_id). then(
            response => {
                this.setState({
                    exam : response.data.data
                })
            }
        )
    }

    render() {
        return (
            this.state.exam != '' && this.state.exam != null && this.state.exam != undefined ? <Result
                status="success"
                title={"You are successfully enrolled to the exam : "+this.state.exam.exam_name}
                extra={[
                    <Button type="primary" key="console">
                        Download Admission
                    </Button>
                ]}
            /> : <Result
                status="500"
                title="Something wrong"
                subTitle="Please try again"
                extra={[
                    <Button type="primary" key="console">
                        Login
                    </Button>
                ]}
            />
        );
    }
}
