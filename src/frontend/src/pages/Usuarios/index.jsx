import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonPrincipal from "../../components/Button";

import api from '../../api';

function createData(rfid, nome, perfil, status) {
  return { rfid, nome, perfil, status };
}

// busca os usuários cadastrados na api (/responsaveis)
const fetchData = async () => {
  try {
    const response = await api.get('/responsaveis');
    const data = response.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log('Erro ao carregar responsáveis');
  }
};

const rows = await fetchData();

const dados = rows.map(
  (row) => createData(row.rfid, row.nome, row.perfil, row.status)
);

export default function BasicTable() {
  return (
    <>
        <ButtonPrincipal title="Adicionar" link="/usuarios/cadastro"/>
        <h2 style={{color: "var(--cinza-titulo)", textAlign: "center"}}>Usuários</h2>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell><strong>RFID</strong></TableCell>
                    <TableCell align="right"><strong>Nome do Usuário</strong></TableCell>
                    <TableCell align="right"><strong>Perfil</strong></TableCell>
                    <TableCell align="right"><strong>Status</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {dados.map((row) => (
                <TableRow
                    key={row.nome}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    <TableCell component="th" scope="row">
                    {row.rfid}
                    </TableCell>
                    <TableCell align="right">
                    {row.nome}
                    </TableCell>
                    <TableCell align="right">
                    {row.perfil}
                    </TableCell>
                    <TableCell align="right">
                    {(row.status === true && <Button size="small" color="success">Ativo</Button>) || 
                    (row.status === false && <Button size="small" color="error">Inativo</Button>)
                    }
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        </TableContainer>
    </>
  );
}