import Chart from 'react-apexcharts';

const LineChart = () => {
  const options = {
    series: [
      {
        name: 'Document Count',
        data: [31, 40, 28, 51, 42, 109, 100]
      },
      {
        name: 'Volume',
        data: [11, 32, 45, 32, 34, 52, 41]
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        },
        title: {
          text: 'chart',
          align: 'left',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily: undefined,
            color: '#263238'
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      }
    }
  };

  return (
    <>
      <Chart options={options.options} series={options.series} type="line" height={350} />
    </>
  );
};

export default LineChart;
