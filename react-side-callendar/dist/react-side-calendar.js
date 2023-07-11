"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SideCalendar = SideCalendar;
var _react = _interopRequireWildcard(require("react"));
var _material = require("@mui/material");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function SideCalendar(_ref) {
  var onChange = _ref.onChange,
    open = _ref.open,
    onClose = _ref.onClose;
  //カレンダー配列
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var _useState = (0, _react.useState)([]),
    _useState2 = _slicedToArray(_useState, 2),
    calendarData = _useState2[0],
    setCalendarData = _useState2[1];
  var _useState3 = (0, _react.useState)([new Date().getMonth() + 1]),
    _useState4 = _slicedToArray(_useState3, 2),
    calendarMonths = _useState4[0],
    setcalendarMonths = _useState4[1];
  var _useState5 = (0, _react.useState)([new Date().getFullYear()]),
    _useState6 = _slicedToArray(_useState5, 2),
    calendarYears = _useState6[0],
    setcalendarYears = _useState6[1];

  //カレンダー指定変数
  var _useState7 = (0, _react.useState)(new Date().getMonth() + 1),
    _useState8 = _slicedToArray(_useState7, 2),
    selectedMonth = _useState8[0],
    setSelectedMonth = _useState8[1];
  var _useState9 = (0, _react.useState)(new Date().getFullYear()),
    _useState10 = _slicedToArray(_useState9, 2),
    selectedYear = _useState10[0],
    setselectedYear = _useState10[1];
  var _useState11 = (0, _react.useState)(true),
    _useState12 = _slicedToArray(_useState11, 2),
    AcExpand = _useState12[0],
    setAcExpand = _useState12[1];
  var _useState13 = (0, _react.useState)(true),
    _useState14 = _slicedToArray(_useState13, 2),
    AcExpand_Y = _useState14[0],
    setAcExpand_Y = _useState14[1];
  var _useState15 = (0, _react.useState)(5),
    _useState16 = _slicedToArray(_useState15, 2),
    limitdown = _useState16[0],
    setlimitdown = _useState16[1];
  var _useState17 = (0, _react.useState)(5),
    _useState18 = _slicedToArray(_useState17, 2),
    limitupper = _useState18[0],
    setlimitupper = _useState18[1];
  var drawerContentRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    var generateCalendarData = function generateCalendarData() {
      var viewData = [];
      var firstDay = new Date(selectedYear, selectedMonth, 1);
      var lastDay = new Date(selectedYear, selectedMonth + 1, 0);
      for (var day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
        viewData.push({
          date: "".concat(selectedYear, "/").concat(selectedMonth.toString().padStart(2, "0"), "/").concat(day.toString().padStart(2, "0")),
          event: "Event for ".concat(selectedMonth + 1, "/").concat(day)
        });
      }
      setCalendarData(viewData);
    };
    generateCalendarData();
  }, [selectedMonth, selectedYear]);
  (0, _react.useEffect)(function () {
    var ViewData = [];
    if (!AcExpand && AcExpand_Y) {
      for (var index = 1; index < 13; index++) {
        ViewData === null || ViewData === void 0 ? void 0 : ViewData.push(index);
      }
      setcalendarMonths(ViewData);
    } else {
      setcalendarMonths([selectedMonth]);
    }
  }, [AcExpand, AcExpand_Y]);
  (0, _react.useEffect)(function () {
    var ViewData = [];
    if (!AcExpand_Y) {
      for (var index = selectedYear - limitdown; index < selectedYear + limitupper; index++) {
        ViewData === null || ViewData === void 0 ? void 0 : ViewData.push(index);
      }
      setcalendarYears(ViewData);
    } else {
      setcalendarYears([selectedYear]);
    }
  }, [AcExpand_Y, AcExpand, selectedYear, limitdown, limitupper]);
  var handleItemClick = function handleItemClick(date) {
    onChange(date);
  };
  var handleOutsideClick = function handleOutsideClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  function getDayOfWeek(date, lang) {
    var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var daysOfWeekJp = ["日", "月", "火", "水", "木", "金", "土"];
    var dayIndex = date.getDay();
    var dayOfWeek = daysOfWeek[dayIndex];
    if (lang == "Jp") {
      dayOfWeek = daysOfWeekJp[dayIndex];
    }
    return dayOfWeek;
  }
  (0, _react.useEffect)(function () {
    var handleScroll = function handleScroll() {
      var _drawerContentRef$cur = drawerContentRef.current,
        scrollTop = _drawerContentRef$cur.scrollTop,
        clientHeight = _drawerContentRef$cur.clientHeight,
        scrollHeight = _drawerContentRef$cur.scrollHeight;
      var isAtBottom = Math.abs(scrollTop + clientHeight - scrollHeight) <= 1;
      if (isAtBottom && AcExpand_Y) {
        setlimitupper(function (prevlimit) {
          return prevlimit + 5;
        });
      } else if (scrollTop === 0 && AcExpand_Y) {
        setlimitdown(function (prevlimit) {
          return prevlimit + 5;
        });
      }
    };
    drawerContentRef.current.addEventListener("scroll", handleScroll);
    return function () {
      drawerContentRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: "100vw",
      height: "100vh"
    },
    onClick: handleOutsideClick
  }, /*#__PURE__*/_react.default.createElement(_material.Drawer, {
    anchor: "left",
    onClose: onClose,
    open: open,
    variant: "persistent"
  }, /*#__PURE__*/_react.default.createElement(_material.List, {
    ref: drawerContentRef,
    style: {
      height: "100%",
      overflowY: "auto"
    }
  }, /*#__PURE__*/_react.default.createElement(_material.ListItem, null), calendarYears.map(function (yearvalue) {
    return /*#__PURE__*/_react.default.createElement(_material.Accordion, {
      key: yearvalue,
      expanded: AcExpand_Y && selectedYear == yearvalue ? true : false
    }, /*#__PURE__*/_react.default.createElement(_material.AccordionSummary, null, /*#__PURE__*/_react.default.createElement(_material.ListItemButton, {
      onClick: function onClick() {
        setAcExpand_Y(function (prev) {
          return !prev;
        });
        setAcExpand(false);
        setselectedYear(yearvalue);
        console.log(yearvalue);
      },
      sx: yearvalue == new Date().getFullYear() ? {
        pl: 1,
        bgcolor: "orange",
        width: "100%"
      } : {
        pl: 1
      }
    }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
      sx: {
        textAlign: "center",
        mr: 5
      },
      variant: "h4"
    }, yearvalue), /*#__PURE__*/_react.default.createElement(_material.Typography, {
      variant: "caption",
      sx: {
        ml: 1
      }
    }, "year"))), AcExpand_Y ? /*#__PURE__*/_react.default.createElement(_material.AccordionDetails, null, calendarMonths === null || calendarMonths === void 0 ? void 0 : calendarMonths.map(function (value) {
      return /*#__PURE__*/_react.default.createElement(_material.Accordion, {
        key: value,
        expanded: AcExpand && selectedMonth == value ? true : false,
        onChange: function onChange() {
          setAcExpand(function (prev) {
            return !prev;
          });
          setSelectedMonth(value);
        }
      }, /*#__PURE__*/_react.default.createElement(_material.AccordionSummary, null, /*#__PURE__*/_react.default.createElement(_material.ListItemButton, {
        sx: value - 1 == new Date().getMonth() && yearvalue == new Date().getFullYear() ? {
          pl: 3,
          bgcolor: "orange",
          width: "100%"
        } : {
          pl: 3
        }
      }, /*#__PURE__*/_react.default.createElement(_material.Typography, {
        variant: "h4"
      }, value), /*#__PURE__*/_react.default.createElement(_material.Typography, {
        sx: {
          ml: 1
        },
        variant: "caption"
      }, months[value - 1]))), AcExpand ? /*#__PURE__*/_react.default.createElement(_material.AccordionDetails, null, /*#__PURE__*/_react.default.createElement(_material.List, null, calendarData.map(function (item, index) {
        return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_material.Divider, null), /*#__PURE__*/_react.default.createElement(_material.ListItemButton, {
          sx: new Date(item.date).setHours(0, 0, 0, 0) == new Date().setHours(0, 0, 0, 0) ? {
            pl: 8,
            bgcolor: "orange",
            width: "100%"
          } : {
            pl: 8
          },
          key: index,
          onClick: function onClick() {
            handleItemClick(item.date);
            onClose();
          }
        }, /*#__PURE__*/_react.default.createElement(_material.ListItemText, {
          primary: /*#__PURE__*/_react.default.createElement(_material.Typography, {
            variant: "h6"
          }, item.date, /*#__PURE__*/_react.default.createElement(_material.Typography, {
            sx: {
              ml: 2
            },
            variant: "caption"
          }, "(", getDayOfWeek(new Date(item.date), "Jp"), ")"))
        })));
      }))) : null);
    }), " ") : null);
  }))));
}