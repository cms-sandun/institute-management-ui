import React from "react";
import {Form, Input, Upload, Select, Button, notification, DatePicker, TimePicker} from "antd";
import {InboxOutlined} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import paymentService from "../../services/paymentService";
import moment from "moment";
import studentService from "../../services/studentService";

const {Option} = Select;

export default class PaymentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            paymentID: props.payment ? props.payment.id : '',
            studentId: props.payment ? props.payment.student_id : '',
            paidAmount: props.payment ? props.payment.paid_amount : '',
            remainingAmount: props.payment ? props.payment.remaining_amount : '',
            date: props.payment ? props.payment.date : '',
            paymentMethod: props.payment ? props.payment.payment_method : 'Direct Payment',
            studentList:[],

            studentNameError: "",
            paidAmountError: "",
            remainingAmountError: "",
            dateError: "",
            paymentMethodError: "",
        };

        //console.log(this.props.student)

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.resetErrorLabels = this.resetErrorLabels.bind(this);
        this.setValidationError = this.setValidationError.bind(this);
        this.onInputFieldChangeHandler = this.onInputFieldChangeHandler.bind(this);
        this.onPaymentMethodChangeHandler = this.onPaymentMethodChangeHandler.bind(this);
        this.onPaymentDateChangeHandler = this.onPaymentDateChangeHandler.bind(this);
        this.onStudentChangeHandler = this.onStudentChangeHandler.bind(this);
    }

    resetErrorLabels() {
        this.setState({
            studentNameError: "",
            paidAmountError: "",
            remainingAmountError: "",
            dateError: "",
            paymentMethodError: "",
        });
    }

    resetFields() {
        this.setState({
            studentId: "",
            paidAmount: "",
            remainingAmount: "",
            date: "",
            paymentMethod: "direct",
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
    onPaymentMethodChangeHandler(value) {
        this.setState({
            paymentMethod: value,
        });
    }
    onPaymentDateChangeHandler(moment, dateString) {
        this.setState({
            date: moment
        })
    }
    loadStudents(){
        studentService.getAllStudents().then(
            response => {
                this.setState({
                    studentList: response.data.data
                })
            }
        )
    }

    onStudentChangeHandler(value) {
        this.setState({
            studentId: value,
        });
    }

    setValidationError(errorField, errorMsg) {
        this.setState({
            [errorField]: errorMsg
        });
    }

    componentDidMount() {
        this.loadStudents()
    }


    async onSubmitHandler(event) {
        this.resetErrorLabels();
        let haveErrors = false;

        if(haveErrors) return

        const payload = {
            studentId: this.state.studentId,
            // studentName: this.state.studentName,
            paidAmount: this.state.paidAmount,
            remainingAmount: this.state.remainingAmount,
            date: this.state.date,
            paymentMethod: this.state.paymentMethod,
        }

        let response = null
        if (this.props.isNewRecord) {
            response = await paymentService.savePayment(payload);
        }else{
            response = await paymentService.updatePayment(this.state.paymentID, payload);
        }

        if (response.data.success) {
            this.openNotificationWithIcon("success", "Payment", response.data.msg);
            this.resetErrorLabels();
            this.resetFields();
            this.props.loadTable();
        }else{
            this.openNotificationWithIcon("error", "Payment", response.data.msg);
        }

    }

    studentArray = () => {
        return (
            <>
                {this.state.studentList.length >0 && this.state.studentList.map(stu => {
                    console.log(this.state.studentList)
                    return (
                        <Option key={stu.id} value={stu.id}>{stu.first_name}</Option>

                    )
                })}
            </>
        )
    }

    render() {
        return (
            <form>
                <div className='row'>
                    <div className='col-md-12'>

                        <Form.Item>
                            <Select
                                placeholder="Select Student"
                                name="studentName" onChange={this.onStudentChangeHandler}

                            >
                                {this.studentArray()}
                            </Select>
                            <label className="error-label">
                                {this.state.studentNameError}
                            </label>
                        </Form.Item>

                            <div className='row'>
                                <div className='col-md-6'>
                <Form.Item>

                                    <Input
                                        onChange={this.onInputFieldChangeHandler}
                                        name="paidAmount"
                                        value={this.state.paidAmount}
                                        placeholder='Paid Amount'
                                    />
                                    <label className="error-label">
                                        {this.state.paidAmountError}
                                    </label>
                </Form.Item>
                                </div>
                                <div className='col-md-6'>
                                    <Form.Item>
                                    <DatePicker placeholder="Date" onChange={this.onPaymentDateChangeHandler}
                                                value={this.state.date}/>
                                    <label className="error-label">
                                        {this.state.dateError}
                                    </label>
                                    </Form.Item>
                    </div>
                            </div>

                        <Form.Item>
                            <Select
                                defaultValue={this.state.paymentMethod}
                                onChange={this.onPaymentMethodChangeHandler}
                                name="paymentMethod"
                            >
                                <Option value="direct">Direct Payment</Option>
                                <Option value="bankDeposit">Bank deposit</Option>
                                <Option value="online">Online Payment</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item style={{textAlign: "right"}}>
                            <Button
                                className="form-button submit-button"
                                type="primary"
                                onClick={this.onSubmitHandler}
                            >
                                Submit
                            </Button>
                        </Form.Item>

                    </div>
                </div>
            </form>
        );
    }
}
