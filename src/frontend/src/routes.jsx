import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import {EstilosGlobais} from "./components/Global";
import Page from "./components/page";
import Produtos from "./pages/Produtos";
import NovoProduto from "./pages/NovoProduto";
import Usuarios from "./pages/Usuarios";
import NovoUsuario from "./pages/NovoUsuario";
import MapComponent from "./components/Map";
import Registros from "./pages/Registros";
import NovoRegistro from "./pages/NovoRegistro";

export default function AppRoutes() {

  return (
    <BrowserRouter>
      <EstilosGlobais/>
      <Routes>
        <Route path="/" element={<Page almoxarifado="Base 0657"/>}>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/produtos" element={<Produtos/>}></Route>
          <Route path="/produtos/cadastro" element={<NovoProduto />}></Route>
          <Route path="/usuarios" element={<Usuarios />}> </Route>
          <Route path="/usuarios/cadastro" element={<NovoUsuario />}> </Route>
          <Route path="/teste" element={<MapComponent />}> </Route>
          <Route path="/registros" element={<Registros />}> </Route>
          <Route path="/registros/cadastro" element={<NovoRegistro />}> </Route>
        </Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}
