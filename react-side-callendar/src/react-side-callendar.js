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
  const [limitdown, setlimitdown] = useState(10);
  const [limitupper, setlimitupper] = useState(10);
  const drawerContentRef = useRef(null);
  useEffect(() => {
    const generateCalendarData = () => {
      const viewData = [];
      const firstDay = new Date(selectedYear, selectedMonth, 1);
      const lastDay = new Date(selectedYear, selectedMonth + 1, 0);

      for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
        viewData.push({
          date: `${new Date().getFullYear()}/${selectedMonth
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

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        drawerContentRef.current;
      const isAtBottom = Math.abs(scrollTop + clientHeight - scrollHeight) <= 1;

      if (isAtBottom && AcExpand_Y) {
        setlimitupper((prevlimit) => prevlimit + 20);
      } else if (scrollTop === 0 && AcExpand_Y) {
        setlimitdown((prevlimit) => prevlimit + 20);
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
                >
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
                        <ListItemButton sx={{ml : 2}}>
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
                                sx={{ml: 8}}
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