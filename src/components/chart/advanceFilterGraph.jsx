// import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Typography, Box, useTheme, styled
  // , Select, MenuItem
 } from '@mui/material';
import { useSelector
  // , useDispatch 
} from 'react-redux';
import EllipseBlue from './../../assets/img/Icons/EllipseBlue.svg'
import EllipseRed from './../../assets/img/Icons/EllipseRed.svg'
// import { timeSeriesGraph } from '../../redux/facet';

const TimeSeriesChart = ({ height, type, heading, value, setValue }) => {
  const theme = useTheme();
  const { timeSeriesData } = useSelector((state) => state.facet);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
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
  let result = [{ name: 'count', data: [] }];
  let label = [];
  newData &&
    newData.forEach((item) => {
      // debugger;
      result[0]['data'].push(item.data.count);

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
    colors: ['rgba(19, 161, 232, 1)', '#247BA0'], 
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
          color: 'rgba(67, 100, 132, 1)'
        },
        labels: {
          style: {
            colors: 'rgba(67, 100, 132, 1)'
          }
        },
        title: {
          text: '',
          style: {
            color: '#FF1654'
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

  return result[0].data.length > 0 ? (
    <Box
      sx={{
        background: theme.palette.white.dark,
        padding: '20px',
        borderRadius: '10px',
        height: '100%',
        width: '100%'
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography component="h4" variant="h4" sx={theme.typography.title}>
          {heading}
        </Typography>

        {/* <div style={{ display: 'flex', alignItems: 'center' }}>
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
        </div> */}
      </div>

      <Chart options={options} series={options.series} type={type} height={300} />
      <Box sx={theme.position.center}>
        <Dot src={EllipseBlue} alt="Elipse" />
        <Typography mr={2} sx={theme.typography.regular}>Team players</Typography>
        <Dot src={EllipseRed} alt="Elipse" />
        <Typography sx={theme.typography.regular}>Stadium capacity</Typography>
      </Box> 
    </Box>
  ) : (
    <Typography sx={{ margin: '50px 0 0', textAlign: 'center', width: '100%' }} variant="h6">
      Find 0 Record Against This Query
    </Typography>
  );
};

export default TimeSeriesChart;

TimeSeriesChart.defaultProps = {
  type: 'area',
  heading: 'Chart heading',
  labels: [1, 2, 3, 4, 5, 6, 7],
  data: [
    {
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    },
    {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41]
    }
  ],
  height: 200
};

const Dot = styled('img')(() => ({
  marginRight: '8px',
  width: '8px',
  height: '8px'
}));