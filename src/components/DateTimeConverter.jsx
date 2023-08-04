import React from 'react';
import { Box, useTheme } from '@mui/material'

const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const formattedDate = `${date.getDate()} ${months[date.getMonth()]} - ${formatTime(date)}`;
  return formattedDate;
};

const formatTime = (date) => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  return formattedTime;
};

const DateTimeConverter = ({ dateString, venue, venueName }) => {
  const theme = useTheme()
  const formattedDate = formatDate(dateString);
  return (
    <Box sx={{display: 'flex', justifyContent: 'start'}}>
      <Box sx={theme.position.centerCol}>
        <span>{formattedDate}</span>
        <span><span>{venue} / </span><span>{venueName}</span></span>
      </Box> 
    </Box>
  );
};

export default DateTimeConverter;
