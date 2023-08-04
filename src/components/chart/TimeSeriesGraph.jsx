import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Typography, Box, useTheme, Select, MenuItem } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';

import { timeSeriesGraph } from '../../redux/facet';

const TimeSeriesChart = ({ height, type, heading, value, setValue }) => {
  const theme = useTheme();

  const { timeSeriesData } = useSelector((state) => state.facet);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];

  const newData =
    timeSeriesData &&
    Object.keys(timeSeriesData).map((item) => {
      return {
        data: {
          count: timeSeriesData[item].count,
          volume: timeSeriesData[item].volume
        },
        time: item
      };
    });

  let result = [
    { name: 'count', data: [] },
    { name: 'volume', data: [] }
  ];

  let label = [];

  newData &&
    newData.forEach((item) => {
      // debugger;
      result[0]['data'].push(item.data.count);
      result[1]['data'].push(item.data.volume);

      label.push(
        `${new Date(item.time).getDate()} ${monthNames[new Date(item.time).getMonth()]} ${new Date(
          item.time
        ).getFullYear()}`
      );
    });

  const options = {
    chart: {
      height: height,
      type: 'line',
      stacked: false
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#FF1654', '#247BA0'],
    series: [...result],
    stroke: {
      width: [4, 4]
    },
    plotOptions: {
      bar: {
        columnWidth: '20%'
      }
    },
    xaxis: {
      categories: [...label]
    },
    yaxis: [
      {
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: '#FF1654'
        },
        labels: {
          style: {
            colors: '#FF1654'
          }
        },
        title: {
          text: 'Series A',
          style: {
            color: '#FF1654'
          }
        }
      },
      {
        opposite: true,
        axisTicks: {
          show: true
        },
        axisBorder: {
          show: true,
          color: '#247BA0'
        },
        labels: {
          style: {
            colors: '#247BA0'
          }
        },
        title: {
          text: 'Series B',
          style: {
            color: '#247BA0'
          }
        }
      }
    ],
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        show: false
      }
    },
    legend: {
      horizontalAlign: 'left',
      offsetX: 40
    }
  };

  return (
    result && (
      <Box
        sx={{
          background: theme.palette.white.dark,
          padding: '20px',
          borderRadius: '10px',
          height: '100%',
          width: '100%'
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography component="h4" variant="h4">
            {heading}
          </Typography>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <p style={{ marginRight: '15px' }}>
              <b> Time Period:</b>{' '}
            </p>

            <Select
              size="small"
              value={value}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="week">Week</MenuItem>
              <MenuItem value="month">Month</MenuItem>
              <MenuItem value="year">Year</MenuItem>
            </Select>
          </div>
        </div>

        <Chart options={options} series={options.series} type={type} height={350} />
      </Box>
    )
  );
};

export default TimeSeriesChart;

TimeSeriesChart.defaultProps = {
  type: 'area',
  heading: 'Chart heading',
  labels: [1, 2, 3, 4, 5, 6, 7],
  height: 200
};
