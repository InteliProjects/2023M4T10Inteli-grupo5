import ReactApexChart from 'react-apexcharts'

const options = {
  chart: {
    type: 'bar',
    stacked: true,
    dropShadow: {
      enabled: true,
      blur: 3,
      opacity: 0.3
    }
  },
  xaxis: {
    categories: [],
    labels: {
      show: false,
    },
  },
  colors: [],
  title: {
    text: '',
    align: 'center',
    style: {
      fontSize: '20px',
      color: '#666'
    }
  },
  
  aspectRatio: 4.6,
}

// eslint-disable-next-line react/prop-types
export default function BarChart({title, series, categories, colors}) {
  options.series = series;
  options.title.text = title;
  options.xaxis.categories = categories;
  options.colors = colors;
  return (
    <ReactApexChart options={options} series={options.series} type="bar" height={350} />
  );
}
