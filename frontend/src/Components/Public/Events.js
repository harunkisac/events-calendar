import React from "react";
import Event from "./Event.js";
import "../../Style/Event.css";
import FloatersOfEvents from "../Admin/Floaters/FloatersOfEvent.js";
import Popup from "reactjs-popup";
import VolunteerForm from "../Admin/Floaters/FloaterToVolunteer";
import NavBar from "../NavBar";

const Events = props => {
    console.log(props.events);

    return (
        <div className="events">
            <NavBar>
                <h1 className="myHeader ml-5 ">Events</h1>
            </NavBar>
            {props.events.map(function(event, i) {
                return (
                    <div className="event" key={i}>
                        <Event
                            key={i}
                            name={event.lesson}
                            description={event.description}
                            date={event.date}
                        />
                        <FloatersOfEvents id={event.event_id} />

                        <Popup
                            trigger={
                                <button
                                    type="button"
                                    className="btn btn-outline-primary mr-4 mb-2 mt-4"
                                >
                                    volunteer
                                </button>
                            }
                            position="right center"
                            modal
                        >
                            <VolunteerForm event_id={event.event_id} />
                        </Popup>

                        <a
                            className="btn btn-link mr-4 mb-2 mt-4"
                            href={`/event/${event.event_id}`}
                            alt={event.lesson}
                        >
                            Read more
                        </a>
                    </div>
                );
            })}
        </div>
    );
};

export default Events;
