import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import {Box, Typography, styled, useTheme} from '@mui/material';
import EllipseBlue from './../assets/img/Icons/EllipseBlue.svg'
import EllipseRed from './../assets/img/Icons/EllipseRed.svg'

const RingDiagram = ({ progress }) => {
  const theme = useTheme();
  const data = [
    { title: 'Progress', value: progress, color: 'rgba(101, 41, 231, 1)'},
    { title: 'Remaining', value: 100 - progress, color: 'rgba(229, 88, 88, 1)'},
  ];

  const labelStyle = {
    fontSize: '3px',
    fontWeight: 'bold',
    textAnchor: 'middle',
    dominantBaseline: 'central',
    textColor: 'white'
  };

  return (
    <Box sx={[theme.position.centerCol, { width: '300px', height: '300px', position: 'relative' }]}>
      <Typography sx={[theme.typography.title, {mb: 3}]}>Platforms</Typography>
      <PieChart
        data={data}
        lineWidth={40}
        rounded
        startAngle={-90}
        lengthAngle={-360}
      />
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 42 42"
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <text x="20%" y="50%" style={labelStyle}>
          {progress}%
        </text>
        <text x="75%" y="35%" style={labelStyle}>
          {100-progress}%
        </text>
      </svg>  
      <Box sx={theme.position.center} mt={2}>
        <Dot src={EllipseBlue} alt="Elipse" />
        <Typography mr={2} sx={theme.typography.regular}>Android</Typography>
        <Dot src={EllipseRed} alt="Elipse" />
        <Typography sx={theme.typography.regular}>IOS</Typography>
      </Box>    
    </Box>
  );
};

export default RingDiagram;

const Dot = styled('img')(() => ({
  marginRight: '8px',
  width: '8px',
  height: '8px'
}));