import React, { useState
  // , useEffect 
} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TextField, Button, Box, styled, useTheme } from '@mui/material';
import moment from 'moment';
import PropTypes from 'prop-types';



const DateRangePicker = ({show, handlebuttonclick}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const theme = useTheme()
  
  // const btnPrev = document.getElementsByClassName('.react-datepicker__navigation--previous');
  // const btnNext = document.getElementsByClassName('.react-datepicker__navigation--next');
  // const calendarContainer = document.getElementsByClassName('.react-datepicker');   
  // console.log('calendarContainer ', calendarContainer)
  // console.log('btnPrev ', btnPrev)
  // useEffect(()=> {  
  //   const handleScroll = () => {
  //     const scrolledPixels = calendarContainer.scrollTop;    
  //       if (scrolledPixels > 50) {
  //         btnNext.click();
  //       } else {
  //         btnPrev.click();
  //       }
  //   };
  //   calendarContainer.addEventListener('scroll', handleScroll)
  //   return () => {
  //     calendarContainer.removeEventListener("scroll", handleScroll);
  //   };
  // }, [btnNext, btnPrev, calendarContainer])

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    localStorage.setItem('startDate', 
      moment(start, 'YYYY-MM-DD HH:mm:ss').utc().format()
    );
    localStorage.setItem('endDate', 
      moment(end, 'YYYY-MM-DD HH:mm:ss').utc().format()
    );
  };
  return (
    <Box display="flex" flexDirection="column" alignItems="center" theme={theme} 
          sx={{position: 'absolute', top: '100px', right: '50px', borderRadius: '8px'}}>
      {show && (
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            monthsShown={2}        
            selectsRange
            dateFormat="MM/dd/yyyy"
            customInput={<TextField title="" label="Select Date Range" />}
            popperPlacement="bottom-end"
            calendarContainer={CalendarContainer}
            allowSameDay
            popperModifiers={{
              offset: {
                enabled: true,
                offset: '5px, 10px',
              },
              preventOverflow: {
                enabled: true,
                escapeWithReference: false,
                boundariesElement: 'viewport',
              },
            }}
            open={show}
          >
            <Box sx={{display: 'flex', justifyContent: 'end'}}>
              <Button sx={theme.button.calendar} onClick={() => handlebuttonclick(!show)}>Cancel</Button>
              <Button sx={theme.button.calendar} onClick={() => handlebuttonclick(!show)}>OK</Button>
            </Box>
          </DatePicker>      
      )}
    </Box>
  );
};

export default DateRangePicker;

DateRangePicker.defaultProps = {
  handlebuttonclick: () => {}
};
DateRangePicker.propTypes = {
  handlebuttonclick: PropTypes.func,
};

const CalendarContainer = styled('div')(({theme})=>({
  border: 'none',
  background: 'transparent',
  display: 'flex',
  flexDirection: 'column',  
  color: 'white',
  zIndex: 9999,
  '& .react-datepicker__current-month': {
    color: 'white',
  },
  '& .react-datepicker__day-name': {
    color: 'white',
  },
  '& .react-datepicker__month-container': {    
    background: 'rgba(38, 75, 113, 1)',
    height: 'auto',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    border: 'none',
    borderRadius: '8px 8px 0 0',
    fontSize: '16px',
    lineHeight: '24px',
    color: 'white',
  },
  '& .react-datepicker__month-container:nth-of-type(2)': {
    borderRadius: '0',
  },
  '& .react-datepicker__children-container': {
    background: 'rgba(38, 75, 113, 1)',
    margin: 0,
    padding: '0 10px 10px',
    border: '1px solid rgba(38, 75, 113, 1)',
    borderRadius: '0 0 8px 8px',
    zIndex: 999999
  },
  '& .react-datepicker__header': {
    color: 'white',
    background: 'rgba(38, 75, 113, 1)',
    border: 'none'
  },
  '& .react-datepicker__day': {
    color: 'white',
    borderRadius: '50%',
    '&.react-datepicker__day--selected': {
      background: theme.palette.blue.active,
      color: 'black'
    },
    '&.react-datepicker__day--selected, &.react-datepicker__day--in-range': {
      background: theme.palette.blue.active,
      color: 'black'
    },
    '&.react-datepicker__day--today': {
      background: 'transparent',
      border: `1px solid ${theme.palette.blue.active}`,
      color: theme.palette.blue.active
    },
    '&.react-datepicker__day--in-selecting-range': {
      background: theme.palette.blue.activeLight, 
      color: 'black'
    },
    '&:hover': {
      background: theme.palette.blue.active,
      color: 'black',      
    },
  },
  '& .react-datepicker__day--in-range': {
    color: 'white',
    background: 'rgba(128, 128, 128, 0.5)', // Сірий колір фону між вибраними датами
  },
}));