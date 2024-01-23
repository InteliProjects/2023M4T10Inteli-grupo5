// import styles from "./styles.module.css";
import Button from "../../components/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import api from '../../api';

function createData(rfidPeca, rfidUsuario, topicoCaminhao, data) {
  return { rfidPeca, rfidUsuario, topicoCaminhao, data };
}

// busca os usuários cadastrados na api (/responsaveis)
const fetchData = async () => {
  try {
    const response = await api.get('/responsabilidades');
    const data = response.data;
    return data;
  } catch (error) {
    console.log('Erro ao carregar responsáveis');
  }
};

const rows = await fetchData();

const dados = rows.map(
  (row) => createData(row.peca_rfid, row.responsavel_rfid, row.topico_caminhao, row.created_at)
);


export default function Registros() {
  return(
    <>
      <Button title="Registrar" link="/registros/cadastro"/>
      <h2 style={{color: "var(--cinza-titulo)", textAlign: "center"}}>
        Registros de Responsabilidade
      </h2>
      <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell><strong>Peça</strong></TableCell>
                    <TableCell><strong>Responsável</strong></TableCell>
                    <TableCell><strong>Caminhão</strong></TableCell>
                    <TableCell><strong>Data</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {dados.map((row) => (
                <TableRow
                    key={row.nome}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                    {row.rfidPeca}
                    </TableCell>
                    <TableCell component="th" scope="row">
                    {row.rfidUsuario}
                    </TableCell>
                    <TableCell>
                    {row.topicoCaminhao}
                    </TableCell>
                    <TableCell>
                      {new Date(row.data).toLocaleDateString()
                    }
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    </>
  )
}