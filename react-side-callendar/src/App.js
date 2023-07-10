import { Button, Card, CardContent, Chip, Divider, Drawer, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { SideCalendar } from './react-side-callendar';


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
    <div>
      <button onClick={handleCalendarOpen}> {calendarOpen ? "close" : "open"} Calendar</button>
      <SideCalendar onChange={handleCalendarChange} open={calendarOpen} onClose={handleCalendarClose} />
      <p>Selected Date: {selectedDate}</p>
    </div>
  );
};

export default App;