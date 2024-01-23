import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import styled from "styled-components";

const MainContainer = styled.div`
  position: relative;
  left: 248px;
  width: calc(100% - 248px);
  padding: 2em;
  box-sizing: border-box;

  .almoxarifado {
    font-size: 30px;
    color: var(--verde-principal);
    margin-bottom: 1rem;
  }
`

// eslint-disable-next-line react/prop-types
export default function Page({almoxarifado}) {
  return (
    <>
      <Sidebar />
      <MainContainer>
        <h1 className="almoxarifado">Almoxarifado: {almoxarifado}</h1>
        <Outlet />
      </MainContainer>
    </>
  );
}