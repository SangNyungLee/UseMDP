import React from 'react';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';

const Calendar = () => {
  const groups = [
    { id: 1, title: 'Group 1' },
  ];

  const items = [
    {
      id: 1,
      group: 1,
      title: 'Item 1',
      start_time: new Date(2023, 10, 1),
      end_time: new Date(2023, 10, 5),
    },
  ];

  return (
    <Timeline
      groups={groups}
      items={items}
      defaultTimeStart={new Date(2023, 9, 28)}
      defaultTimeEnd={new Date(2023, 10, 10)}
    />
  );
};

export default MyTimeline;