import styled from 'styled-components';
import Logo from '../../assets/logo-site.png';
import ItemSidebar from './ItemSidebar';
import { TbTruckLoading, TbUserCog, TbHeartRateMonitor, TbDashboard, TbUserCircle  } from "react-icons/tb";
import { GrStakeholder } from "react-icons/gr";
import UsuarioSidebar from './UsuarioSidebar';


const SidebarContainer = styled.aside`
  top: 0;
  left: 0;
  background-color: #F9F9F9;
  width: 200px;
  display: flex;
  padding: 1.5em;
  flex-direction: column;
  gap: 30px;
  box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.55);
  height: 100%;
  position: fixed;
`

const TituloSidebar = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  img {
      width: 25%;
  }
  h1 {
      font-size: 30px;
      font-weight: 500;
      color: var(--verde-principal);
  }
  hr {
      width: 100%;
      border: 1px solid var(--verde-principal);
      opacity: 0.5;
      margin: 0 0 1rem 0;
  }
`

const ListaSidebar = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 10px;
  padding: 0;
  margin: 0;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 70%;
`

export default function Sidebar() {
  return (
    <SidebarContainer>
      <TituloSidebar>
        <img src={Logo} alt="Fundo Login"/>
        <h1>BIOT</h1>
        <hr></hr>
      </TituloSidebar>
      <Container>    
        <ListaSidebar>
          <ItemSidebar icon={<TbDashboard/>} title="Dashboard" link="/"/>
          <ItemSidebar icon={<TbTruckLoading/>} title="Produtos" link="/produtos"/>
          <ItemSidebar icon={<TbUserCog/>} title="Usuários" link="/usuarios"/>
          <ItemSidebar icon={<GrStakeholder />} title="Registros" link="/registros"/>
          <ItemSidebar icon={<TbHeartRateMonitor/>} title="Tickets"/>
        </ListaSidebar>
        <UsuarioSidebar name='Victor' icon={<TbUserCircle />}/>
      </Container>
    </SidebarContainer>
  )
}