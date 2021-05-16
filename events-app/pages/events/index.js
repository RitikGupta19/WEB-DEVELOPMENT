import { useRouter } from "next/router";
import EventList from "../../components/events/events-list";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../helper/api-utils";
import Head from "next/head";

function AllEventsPage(props) {
  const { events } = props;
  const router = useRouter();
  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };
  return (
    <div>
      <Head>
        <title>All events</title>
        <meta
          title='description'
          content='Variety of events to evolve better.'
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </div>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}
export default AllEventsPage;
