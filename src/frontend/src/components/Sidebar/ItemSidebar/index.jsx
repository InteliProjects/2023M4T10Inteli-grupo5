import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ItemSidebarContainer = styled.li`
  display: flex;
  gap: 10px;
  cursor: pointer;
  transition: 0.3s;
  padding: 0.5em;
  &:hover {
    background-color: var(--verde-principal);
    color: var(--branco);
    border-radius: 5px;
  }
  &:hover > a {
    color: var(--branco);
  }
  svg {
    font-size: 25px;
  }
  a {
    font-size: 20px;
    text-decoration: none;
    color: #000
  }
`

export default function ItemSidebar({ icon, title, link }) {
  return (
    <ItemSidebarContainer>
      {icon}
      <Link to={link}>
        {title}
      </Link>
    </ItemSidebarContainer>
  )
}