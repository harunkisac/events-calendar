import React from "react";
import Event from "./Event.js";
import "../../Style/Event.css";
import FloatersOfEvents from "../Admin/Floaters/Floaters_of_event.js";
import Popup from "reactjs-popup";
import VolunteerForm from "../Admin/Floaters/FloaterToVolunteer";

const Events = props => {
    return (
        <div className="events">
            <h1 className="event_titles">Events</h1>
            {props.events.map(function(event, i) {
                return (
                    <div className="event">
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
