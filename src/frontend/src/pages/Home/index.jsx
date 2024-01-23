import BarChart from "../../components/BarChart"
import RadialBarChart from "../../components/RadialChart"
import styled from "styled-components"
import StackedBarChart from "../../components/StackedBarChart"

import api from '../../api'

const ContainerCharts = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-wrap: wrap;
  box-sizing: border-box;

  .radial {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    flex-direction: row;
    width: 100%;
  }

  .bar {
    width: 100%;
    box-sizing: border-box;
  }

  h1 {
    font-size: 30px;
    color: var(--verde-principal);
    margin-bottom: 1rem;
  }
`

// envia requisição para receber todas as peças
// em seguida, pega quantas estão com disponivel true, quantas com false
// e quantas com returned_at preenchido
const fetchData = async () => {
  try {
    const response = await api.get('/pecas');
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log('Erro ao carregar peças');
  }
}

const rows = await fetchData();

const disponiveis = rows.filter((row) => row.disponivel === true).length
const emUso = rows.filter((row) => row.disponivel === false && row.returned_at == null).length
const retornadas = rows.filter((row) => row.returned_at !== null && row.returned_at !== '' ).length

const series = [
  {
    name: 'Peças disponíveis',
    data: [disponiveis, 0, 0]
  },
  {
    name: 'Peças em uso',
    data: [0, emUso, 0]
  },
  {
    name: 'Peças retornadas',
    data: [0, 0, retornadas]
  }
]

// aqui, com base nas peças acima, calcula-se quantos % das baterias estão disponíveis,
// quantos % dos pneus estão disponíveis e quantos % dos motores estão disponíveis
const getPercentage = (tipo) => {
  const disponiveis = rows.filter((row) => row.tipo === tipo && row.disponivel === true).length;
  const total = rows.filter((row) => row.tipo === tipo).length;
  return (disponiveis / total) * 100;
};

const percentBaterias = getPercentage('Bateria');
const percentPneus = getPercentage('Pneu');
const percentMotores = getPercentage('Motor');

const categories = ['Peças disponíveis', 'Peças em uso', 'Peças retornadas']

const cores = ['#68C055', '#D57D13', '#1B4142']

export default function Home() {
  return (
    <ContainerCharts>
      <div className="bar">
        <BarChart title="Peças" series={series} categories={categories} colors={cores}/>
      </div>
      <div className="radial">
        <RadialBarChart percentage={percentBaterias} label='Baterias'/>
        <RadialBarChart percentage={percentPneus} label='Pneus'/>
        <RadialBarChart percentage={percentMotores} label='Motores'/>
      </div>
      <div className="bar">
        <StackedBarChart/>
      </div>
    </ContainerCharts>
  )
}