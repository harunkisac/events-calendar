import React from "react";
import "../Style/Event.css";
import "../Style/Events.css";
import Popup from "reactjs-popup";
import VolunteerForm from "./volunteers-form.js";

const Event = props => {
    return <div className="event">
            <h1>{props.name}</h1>
            <p>Description: {props.description}</p>
            <div>Date: {props.date}</div>
            <div>Floaters: {props.floaters}</div>
            <Popup trigger={<button type="button" className="btn btn-outline-primary mt-4">
                        volunteer
                    </button>} position="right center" modal>
            <VolunteerForm />
            </Popup>
        </div>;
};

export default Event;
