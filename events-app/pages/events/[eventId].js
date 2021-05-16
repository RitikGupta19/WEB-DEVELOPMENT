import { Fragment } from "react";
import Head from "next/head";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventSummary from "../../components/event-detail/event-summary";
import ErrorAlert from "../../components/ui/error-alert";
import {
  getAllEvents,
  getEventById,
  getFeaturedEvents,
} from "../../helper/api-utils";

function SpecificEventPage({ selectedEvent }) {
  const event = selectedEvent;
  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }
  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta
          title='description'
          content='Variety of events to evolve better.'
        />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        image={event.image}
        address={event.location}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const id = context.params.eventId;
  const event = await getEventById(id);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents();
  const paths = allEvents.map((event, index) => ({
    params: { eventId: event.id },
  }));
  return {
    paths: paths,
    // fallback: false, // NextJs will show 404 page for an unknown id
    // fallback: true, // Telling nextjs there are more pages here, then prepared ones
    fallback: "blocking", // waits for whole page to be ready, work as loading (better user experience)
  };
}

export default SpecificEventPage;
