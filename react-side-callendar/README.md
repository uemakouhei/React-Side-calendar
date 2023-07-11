Sample Code
````js
import { Button, Card, CardContent, Chip, Divider, Drawer, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SideCalendar } from './react-side-calendar';


function App() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleCalendarChange = (date) => {
    setSelectedDate(date);
  };

  const handleCalendarOpen = () => {
    setCalendarOpen(true);
  };

  const handleCalendarClose = () => {
    setCalendarOpen(false);
  };

  return (
    <CardContent>
      <Button onClick={handleCalendarOpen}> {calendarOpen ? "close" : "open"} Calendar</Button>
      <Typography>Selected Date: {selectedDate}</Typography>
      <SideCalendar onChange={handleCalendarChange} open={calendarOpen} onClose={handleCalendarClose} />
    </CardContent>
  );
};

export default App;
````
