import { Box } from "@mui/material"
import ReactApexChart from "react-apexcharts"

const Awards = () => {
  const state = {
    series: [{
      name: 'Traded',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      color: '#13A1E8'
    }, {
      name: 'Redeemed',
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
      color: '#6529E7',
    }, {
      name: 'Gifted',
      data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
      color: '#E55858'
    }, {
      name: 'Donated',
      data: [45, 51, 26, 46, 75, 98, 22, 13, 81],
      color: '#D3EC6D'
    }, {
      name: 'Award Vault',
      data: [45, 51, 26, 46, 75, 98, 22, 13, 81],
      color: '#B2B2B2'
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          columnWidth: '75%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: false,
        width: 3,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Big Mac', 'McNuggets', 'CheeseBurger', 'Medium Fries', 'Big Fanta'],
      },
      yaxis: {
        title: {
          text: '$ (thousands)'
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return "$ " + val + " thousands"
          }
        }
      }
    },
  };
  return (
    <Box sx={{width: "90%", minWidth: '500px'}}>
      <ReactApexChart options={state.options} series={state.series} type="bar" height={350} width={"100%"} />
    </Box>
  )
}
export default Awards