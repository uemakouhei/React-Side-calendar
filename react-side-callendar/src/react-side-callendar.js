import React, { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

export function SideCalendar({ onChange, open, onClose }) {
  //カレンダー配列
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [calendarData, setCalendarData] = useState([]);
  const [calendarMonths, setcalendarMonths] = useState([
    new Date().getMonth() + 1,
  ]);
  const [calendarYears, setcalendarYears] = useState([
    new Date().getFullYear(),
  ]);

  //カレンダー指定変数
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setselectedYear] = useState(new Date().getFullYear());
  const [AcExpand, setAcExpand] = useState(true);
  const [AcExpand_Y, setAcExpand_Y] = useState(true);
  const [limitdown, setlimitdown] = useState(5);
  const [limitupper, setlimitupper] = useState(5);
  const drawerContentRef = useRef(null);
  useEffect(() => {
    const generateCalendarData = () => {
      const viewData = [];
      const firstDay = new Date(selectedYear, selectedMonth, 1);
      const lastDay = new Date(selectedYear, selectedMonth + 1, 0);

      for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
        viewData.push({
          date: `${selectedYear}/${selectedMonth
            .toString()
            .padStart(2, "0")}/${day.toString().padStart(2, "0")}`,
          event: `Event for ${selectedMonth + 1}/${day}`,
        });
      }

      setCalendarData(viewData);
    };

    generateCalendarData();
  }, [selectedMonth]);

  useEffect(() => {
    const ViewData = [];
    if (!AcExpand && AcExpand_Y) {
      for (let index = 1; index < 13; index++) {
        ViewData?.push(index);
      }
      setcalendarMonths(ViewData);
    } else {
      setcalendarMonths([selectedMonth]);
    }
  }, [AcExpand, AcExpand_Y]);

  useEffect(() => {
    const ViewData = [];
    if (!AcExpand_Y) {
      for (
        let index = selectedYear - limitdown;
        index < selectedYear + limitupper;
        index++
      ) {
        ViewData?.push(index);
      }
      setcalendarYears(ViewData);
    } else {
      setcalendarYears([selectedYear]);
    }
  }, [AcExpand_Y, AcExpand, selectedYear, limitdown, limitupper]);

  const handleItemClick = (date) => {
    onChange(date);
  };

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  function getDayOfWeek(date , lang) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const daysOfWeekJp = ["日" , "月" , "火" , "水" , "木" ,"金" ,"土"];
    const dayIndex = date.getDay();
    let dayOfWeek =daysOfWeek[dayIndex];
    if (lang == "Jp") {
     dayOfWeek = daysOfWeekJp[dayIndex];
    }
    return dayOfWeek;
  }



  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        drawerContentRef.current;
      const isAtBottom = Math.abs(scrollTop + clientHeight - scrollHeight) <= 1;

      if (isAtBottom && AcExpand_Y) {
        setlimitupper((prevlimit) => prevlimit + 5);
      } else if (scrollTop === 0 && AcExpand_Y) {
        setlimitdown((prevlimit) => prevlimit + 5);
      }
    };

    drawerContentRef.current.addEventListener("scroll", handleScroll);

    return () => {
      drawerContentRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={{ width: "100vw", height: "100vh" }}
      onClick={handleOutsideClick}
    >
      <Drawer anchor="left" onClose={onClose} open={open} variant="persistent">
        <List
          ref={drawerContentRef}
          style={{ height: "100%", overflowY: "auto" }}
        >
          <ListItem></ListItem>
          {calendarYears.map((yearvalue) => (
            <Accordion
              key={yearvalue}
              expanded={AcExpand_Y && selectedYear == yearvalue ? true : false}
            >
              <AccordionSummary>
                <ListItemButton
                  onClick={() => {
                    setAcExpand_Y((prev) => !prev);
                    setAcExpand(false);
                    setselectedYear(yearvalue);
                  }}
                   sx={(yearvalue ) == new Date().getFullYear() ? {pl: 1 , bgcolor : "orange" ,width:"100%"} : { pl : 1}}>
                  <Typography sx={{ textAlign: "center" , mr:5 }} variant="h4">
                    {yearvalue}
                  </Typography>
                  <Typography variant="caption" sx={{ml:1}}>year</Typography>
                </ListItemButton>
              </AccordionSummary>
              {AcExpand_Y ? (
                <AccordionDetails>
                  {calendarMonths?.map((value) => (
                    <Accordion
                      key={value}
                      expanded={
                        AcExpand && selectedMonth == value ? true : false
                      }
                      onChange={() => {
                        setAcExpand((prev) => !prev);
                        setSelectedMonth(value);
                      }}
                    >
                      <AccordionSummary>
                        <ListItemButton sx={(value - 1) == new Date().getMonth() ? {pl: 3 , bgcolor : "orange" ,width:"100%"} : { pl : 3}}>
                        <Typography variant="h4">{value}</Typography>
                        <Typography sx={{ ml: 1 }} variant="caption">
                          {months[value - 1]}
                        </Typography>
                        </ListItemButton>
                      </AccordionSummary>
                      {AcExpand ? (
                         <AccordionDetails>
                         <List>
                           {calendarData.map((item, index) => (
                             <div>
                               <Divider />
                               <ListItemButton
                                sx={new Date(item.date).setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0) ? {pl: 8 , bgcolor : "orange" ,width:"100%"} : { pl : 8}}
                                 key={index}
                                 onClick={() => {
                                   handleItemClick(item.date);
                                   onClose();
                                 }}
                               >
                                 <ListItemText
                                   primary={
                                     <Typography variant="h6">
                                       {item.date}
                                       <Typography sx={{ ml : 2}} variant="caption" >
                                       ({getDayOfWeek(new Date(item.date) , "Jp")})
                                       </Typography>
                                     </Typography>
                                   }
                                 />
                               </ListItemButton>
                             </div>
                           ))}
                         </List>
                       </AccordionDetails>
                      ) : (null)}
                    </Accordion>
                  ))}{" "}
                </AccordionDetails>
              ) : null}
            </Accordion>
          ))}
        </List>
      </Drawer>
    </div>
  );
}