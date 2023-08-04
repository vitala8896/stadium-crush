import Chart from 'react-apexcharts';
import { Typography, Box, useTheme } from '@mui/material';
import { nanoid } from 'nanoid';

const PieChart = ({ labels, data, type, heading }) => {
  const theme = useTheme();
  debugger;
  // chart options
  const option = {
    series: data,

    options: {
      chart: {
        width: '100%',
        heigh: '100%',
        type
      },
      labels: labels,
      //   theme: {
      //     monochrome: {
      //       enabled: true
      //     }
      //   },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5
          }
        }
      },
      dataLabels: {
        formatter(val, opts) {
          const name = opts.w.globals.labels[opts.seriesIndex];
          return [name, val.toFixed(1) + '%'];
        }
      },
      legend: {
        show: true
      }
    }
  };

  return (
    <Box
      key={nanoid()}
      sx={{
        background: theme.palette.white.dark,
        padding: '20px',
        borderRadius: '10px',
        height: '100%'
      }}>
      <Typography component="h4" variant="h4">
        {heading}
      </Typography>
      <Chart options={option.options} series={option.series} type={type} height={350} />
    </Box>
  );
};

export default PieChart;

PieChart.defaultProps = {
  // labels: ['value1', 'value2', 'value3'],
  // data: [90, 30, 300],
  type: 'pie',
  heading: 'Heading'
};
