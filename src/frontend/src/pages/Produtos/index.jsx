import BarChart from "../../components/BarChart";
import styled from "styled-components";
import Button from "../../components/Button";

import api from '../../api';

const ContainerProdutos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  width: 100%;
`

const ContainerCharts = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex-wrap: wrap;
  gap: 1em;
`

// função para acessar API na rota /pecas que lista todas as peças
const fetchData = async () => {
  try {
    const response = await api.get('/pecas');
    const data = response.data;
    return data;
  } catch (error) {
    console.log('Erro ao carregar peças');
  }
}

const rows = await fetchData();

const baterias = rows.filter((row) => row.tipo === "Bateria").length
const motores = rows.filter((row) => row.tipo === "Motor").length
const pneus = rows.filter((row) => row.tipo === "Pneu").length

const series = [
  {
    name: 'Baterias',
    data: [baterias, 0, 0]
  },
  {
    name: 'Pneus',
    data: [0, pneus, 0]
  },
  {
    name: 'Motores',
    data: [0, 0, motores]
  }
]

const categories = ['Baterias', 'Pneus', 'Motores']

const cores = ['#006400', '#333333', '#C0C0C0']

export default function Produtos() {
  return (
    <ContainerProdutos>
      <ContainerCharts>
        <Button title="Adicionar" link="/produtos/cadastro"/>
        <BarChart title="Produtos cadastrados" series={series} categories={categories} colors={cores}/>
      </ContainerCharts>
    </ContainerProdutos>
  )
}