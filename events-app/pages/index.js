import Head from "next/head";
import EventList from "../components/events/events-list";
import { getFeaturedEvents } from "../helper/api-utils";
// import CKEditor from "../components/CkEditor";
// import { Button } from "antd";

function HomePage({ events }) {
  return (
    <div>
      <Head>
        <title>Next Events App</title>
        <meta
          title='description'
          content='Variety of events to evolve better.'
        />
      </Head>
      <EventList events={events} />
    </div>
    // <CKEditor />
    // <Button type='primary'>Button</Button>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800, // Refreshes page in every 30 min on production
  };
}

export default HomePage;
