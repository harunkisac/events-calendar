import React from "react";
import Message from "../../Message/Message";
import { withRouter } from 'react-router'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import moment from "moment";
moment.locale("en");

class Form extends React.Component {
    state = {
        message: false,
        date: undefined,
        eventDateError: ""
    };
    constructor(props) {
        super(props);
        this.lessonRef = React.createRef();
        this.event_dateRef = React.createRef();
        this.descriptionRef = React.createRef();
        this.timeRef = React.createRef();
        this.numVolunteersNeededRef = React.createRef();
        this.countryRef = React.createRef();
        this.cityRef = React.createRef();
        this.syllabusUrlRef = React.createRef();
        this.addressRef = React.createRef();
    }
    componentDidMount(){
        if(this.props._id){
            fetch(`/events/api/${this.props._id}`)
                .then(res => res.json())
                .then(data => {
                    let curEvent = data.event;
                    this.lessonRef.current.value = curEvent.name;
                    this.setState({
                        date: moment(curEvent.date)
                    });
                    this.timeRef.current.value = curEvent.time;
                    this.descriptionRef.current.value = curEvent.description;
                    this.numVolunteersNeededRef.current.value = curEvent.numVolunteersNeeded;
                    this.countryRef.current.value = curEvent.country;
                    this.cityRef.current.value = curEvent.city;
                    this.syllabusUrlRef.current.value = curEvent.syllabusUrl;
                    this.addressRef.current.value = curEvent.address;
                });
        }
    }
    handleDateChange = date => {
        this.setState({
            date: date,
            eventDateError: ""
        });
        if (!date) {
            this.setState({
                eventDateError: "error"
            });
        }
    };

    // handleChangeRaw = date => {
    //     //console.log(date)
    //     date.currentTarget.value = moment(this.props.input.value).format(
    //         "YYYY/MM/DD"
    //     );
    // };

    // toggleError = () => {
    //     this.setState(prevState => {
    //         return {
    //             hasError: !prevState.hasError
    //         };
    //         console.log("prevState:", this.state.hasError, prevState);
    //     });
    // };

    onSubmit = event => {
        event.preventDefault();
        const body = {
            name: this.lessonRef.current.value,
            date: this.state.date,
            description: this.descriptionRef.current.value,
            time: this.timeRef.current.value,
            numVolunteersNeeded: this.numVolunteersNeededRef.current.value,
            country: this.countryRef.current.value,
            city: this.cityRef.current.value,
            syllabusUrl: this.syllabusUrlRef.current.value,
            address: this.addressRef.current.value
        };
        if(this.props._id) {
            fetch("/events/api/" + this.props._id, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: "put",
                body: JSON.stringify(body)
            })
                .then(() => {
                    this.props.history.push("/admin/event/" + this.props._id);
                })
                .catch(error => console.error(error));
        }
        else{
            fetch("/events/api", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(body)
            })
                .then(() => {
                    this.props.history.push("/admin/events")
                })
                .catch(error => console.error(error));
        }

    };

    render() {
        return (
            <div className="container mt-2">
                <Message
                    show={this.state.message}
                    status="success"
                    message="New event is added"
                />
                <h1 className="text-center mb-3">Add Events</h1>
                <form>
                    <div className="form-group">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 m-auto">
                                    <br />
                                    <label
                                        className="font-weight-bold"
                                        htmlFor="event name"
                                    >
                                        Event Name
                                    </label>
                                    <input
                                        className="input form-control form-control-lg"
                                        placeholder="Events name"
                                        ref={this.lessonRef}
                                    />
                                    <br />
                                    <label
                                        className="font-weight-bold"
                                        htmlFor="event date"
                                    >
                                        Events Date
                                    </label>
                                    {/* <input
                                        className="input form-control form-control-lg"
                                        placeholder="Event date"
                                        ref={this.event_dateRef}
                                        required
                                    />
                                    <br /> */}
                                    <DatePicker
                                        ref={this.event_dateRef}
                                        name="eventDate"
                                        id="eventDate"
                                        className={
                                            this.state.eventDateError
                                                ? "redBorder form-control form-control-lg"
                                                : "input form-control form-control-lg"
                                        }
                                        selected={this.state.date}
                                        onChange={this.handleDateChange.bind(
                                            this
                                        )}
                                        onFocusChange={this.handleDateChange.bind(
                                            this
                                        )}
                                        minDate={new Date()}
                                        isClearable={true}
                                        placeholderText="Insert Date"
                                    />{" "}
                                    <br />
                                    <label
                                        className="font-weight-bold"
                                        htmlFor="event description"
                                    >
                                        Events Description
                                    </label>
                                    <textarea
                                        className="textarea form-control form-control-lg"
                                        placeholder="Description"
                                        ref={this.descriptionRef}
                                        rows="8"
                                    />
                                    <br />
                                    <label
                                        className="font-weight-bold"
                                        htmlFor="event time"
                                    >
                                        time
                                    </label>
                                    <input
                                        className="input form-control form-control-lg"
                                        placeholder="Time"
                                        ref={this.timeRef}
                                    />
                                    <br />
                                    <label
                                        className="font-weight-bold"
                                        htmlFor="number of Volunteers Needed"
                                    >
                                        number of Volunteers Needed
                                    </label>
                                    <input
                                        className="input form-control form-control-lg"
                                        placeholder="number of Volunteers Needed"
                                        ref={this.numVolunteersNeededRef}
                                    />
                                    <br />
                                    <label
                                        className="font-weight-bold"
                                        htmlFor="event country"
                                    >
                                        Country
                                    </label>
                                    <input
                                        className="input form-control form-control-lg"
                                        placeholder="Events country"
                                        ref={this.countryRef}
                                    />
                                    <br />
                                    <label
                                        className="font-weight-bold"
                                        htmlFor="event city"
                                    >
                                        City
                                    </label>
                                    <input
                                        className="input form-control form-control-lg"
                                        placeholder="Events city"
                                        ref={this.cityRef}
                                    />
                                    <br />
                                    <label
                                        className="font-weight-bold"
                                        htmlFor="event syllabus Url"
                                    >
                                        Syllbus
                                    </label>
                                    <input
                                        className="input form-control form-control-lg"
                                        placeholder="Events syllabus Url"
                                        ref={this.syllabusUrlRef}
                                    />
                                    <br />
                                    <label
                                        className="font-weight-bold"
                                        htmlFor="event Address"
                                    >
                                        Events Address
                                    </label>
                                    <textarea
                                        className="textarea form-control form-control-lg"
                                        placeholder="Adress"
                                        ref={this.addressRef}
                                        rows="4"
                                    />
                                    <br />
                                    <div
                                        className="btn-toolbar justify-content-between"
                                        role="toolbar"
                                    >
                                        <button
                                            className="btn btn-primary"
                                            onClick={e => this.onSubmit(e)}
                                        >
                                            Submit
                                        </button>

                                        <a
                                            className="btn btn-primary "
                                            href="/admin/events"
                                        >
                                            Back
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
export default withRouter(Form)