import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import EventList from "../../components/events/events-list";
import ResultsTitle from "../../components/events/results-title";
import { getFilteredEvents } from "../../dummy-data";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import useSWR from "swr";

function FilteredEventsPage(props) {
  // No Need for here client side fetching, example for understanding only
  // const [loadedEvents, setLoadedEvents] = useState([]);
  // const router = useRouter();
  // const filteredData = router.query.slug;

  // const { data, error } = useSWR(
  //   "https://next-events-39e81-default-rtdb.firebaseio.com/events.json"
  // );
  // console.log("Data", data);

  // useEffect(() => {
  //   if (data) {
  //     let events = [];
  //     for (const key in data) {
  //       events.push({
  //         id: key,
  //         ...data[key],
  //       });
  //     }
  //     setLoadedEvents(events);
  //   }
  //   console.log(loadedEvents);
  // }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name='description' content={`A list of filtered events.`} />
    </Head>
  );

  // const filteredYear = filteredData[0];
  // const filteredMonth = filteredData[1];

  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  // if (props.hasError) { // For server side generation
  if (props.hasError) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p className='center'>Invalid Filter, please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  let events = props.events;

  // First Rendering of component, there will be not data
  if (!events) {
    return (
      <Fragment>
        {pageHeadData}
        <p className='center'>Loading...</p>
      </Fragment>
    );
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === props.date.year &&
      eventDate.getMonth() === props.date.month - 1
    );
  });

  // const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p className='center'>No Event Found</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  // -1 used as date function takes start point from 0
  const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList events={filteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const filteredData = params.slug;

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2022 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      // Method 1
      props: {
        hasError: true, // will check this prop to show better ui for error
      },
      // This will redirect to certain route (Method 2)
      // redirect: {
      //   destination: "/error"
      // }

      // Method 3 (Takes you to 404 page)
      // notFound: true,
    };
  }
  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  };
}
export default FilteredEventsPage;
