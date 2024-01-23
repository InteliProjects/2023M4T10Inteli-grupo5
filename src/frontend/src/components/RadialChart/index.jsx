
import ReactApexChart from 'react-apexcharts'

const getFillColor = (percentage) => {
  if (percentage >= 80) {
    return '#68C055'; // Verde se for 80% ou mais
  } else if (percentage >= 50) {
    return '#FF9800'; // Laranja se for entre 50% e 80%
  } else {
    return '#FF0000'; // Vermelho se for menos de 50%
  }
}

// eslint-disable-next-line react/prop-types
const RadialBarChart = ({ percentage, label }) => {
  const options = {
    chart: {
      type: 'radialBar',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          imageClipped: true,
          position: 'front',
          dropShadow: {
            enabled: false,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5
          }
        },
        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '13px'
          },
          value: {
            formatter: function (val) {
              return parseInt(val) + "%";
            },
            color: '#111',
            fontSize: '30px',
            show: true,
          }
        }
      }
    },
    fill: {
      type: 'solid',
      colors: [getFillColor(percentage)], // Obtém a cor com base na porcentagem
      opacity: 1,
    },
    series: [percentage],
    labels: [`${label} Disponíveis`],
  };

  return (
    <div>
      <ReactApexChart options={options} series={options.series} type="radialBar" height={250} />
    </div>
  );
}

export default RadialBarChart;
