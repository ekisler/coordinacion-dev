import React from 'react';
import { isSameDay } from 'date-fns';
import { Th } from '@chakra-ui/react';

const WeekDays = ({ weeks }) => {
  const today = new Date();
  return (
    <>
      {weeks.length > 0 && (
        <React.Fragment key={weeks[0].startOfWeekDate}>
          {weeks[0].days.map(dayObj => {
            const isToday = isSameDay(new Date(dayObj.date), today);
            return (
              <Th
                key={dayObj.date}
                textAlign="center"
                fontWeight={isToday ? 'bold' : 'normal'}
                color={isToday ? 'red.500' : 'gray.500'}
                bg={isToday ? 'yellow.100' : 'transparent'}
                p={1}
                borderRadius="md"
              >
                {dayObj.day}
              </Th>
            );
          })}
        </React.Fragment>
      )}
    </>
  );
};

export default WeekDays;
