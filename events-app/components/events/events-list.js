import EventItem from "./events-item";
import classes from "./events-item.module.css";

function EventList({ events }) {
  return (
    <ul className={classes.list}>
      {events.map((event, index) => (
        <EventItem
          key={event.id}
          id={event.id}
          image={event.image}
          title={event.title}
          address={event.location}
          date={event.date}
        />
      ))}
    </ul>
  );
}

export default EventList;
