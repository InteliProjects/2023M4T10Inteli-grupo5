import styled from "styled-components";
import { RiAddCircleFill } from "react-icons/ri";
import { Link } from "react-router-dom"

const ContainerBotao = styled(Link)`
  display: flex;
  align-items: center;
  gap: .5em;
  width: 30px;
  padding: .3em;
  height: 30px;
  outline: none;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  div {
    display: none;
  }

  &:hover {
    width: 12%;
    margin: 0;
    background-color: var(--verde-principal);
    border-radius: 15px;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.55);

    div {
      display: block;
      cursor: pointer;
      color: #fff;
    }

    p {
      font-size: 16px;
    }
  }
`

// eslint-disable-next-line react/prop-types
export default function Button({title, link}) {
  return (
    <ContainerBotao to={link}>
      <RiAddCircleFill size={30} color="#D57D13" title={title} className="button"/>
      <div>
        <p>{title}</p>
      </div>
    </ContainerBotao>
  )
  }