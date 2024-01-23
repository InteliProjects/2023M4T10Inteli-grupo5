import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';

const options = {
  chart: {
    type: 'bar',
    stacked: true,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
    }
  },
  xaxis: {
    categories: Array.from({ length: 10 }, (_, i) => `Caminhão ${i + 1}`),
  },
  colors: ['#006400', '#333333', '#C0C0C0'], // Cores para baterias, pneus e motores
  series: [
    {
      name: 'Baterias',
      data: [15, 12, 18, 20, 14, 22, 25, 17, 19, 21], // Quantidade de baterias em cada caminhão
    },
    {
      name: 'Pneus',
      data: [25, 20, 15, 10, 30, 18, 23, 15, 22, 28], // Quantidade de pneus em cada caminhão
    },
    {
      name: 'Motores',
      data: [10, 15, 12, 25, 18, 14, 20, 13, 16, 19], // Quantidade de motores em cada caminhão
    }
  ],
  title: {
    text: 'Quantidade de peças por caminhão',
    align: 'center',
    style: {
      fontSize: '20px',
      color: '#666'
    }
  }
}

const StackedBarChart = () => {
  const [clickedBar, setClickedBar] = useState(null);

  const handleBarClick = (event, chartContext, config) => {
    setClickedBar(config.dataPointIndex);
  };

  return (
    <>
    <ReactApexChart
      options={{
        ...options,
        plotOptions: {
          ...options.plotOptions,
          bar: {
            ...options.plotOptions.bar,
            distributed: false,
          },
        },
        chart: {
          ...options.chart,
          events: {
            dataPointSelection: handleBarClick,
          },
        },
      }}
      series={options.series}
      type="bar"
      height={450}
    />
    {clickedBar !== null && (
      <div>
        <Link to="/teste">Acessar localização</Link>
      </div>
    )}
    </>
  );
}

export default StackedBarChart;
