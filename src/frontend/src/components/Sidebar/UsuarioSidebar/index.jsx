import styled from 'styled-components';

const UsuarioSidebarContainer = styled.div`
    display: flex;
    cursor: pointer;
    transition: 0.3s;
    gap: 10px;
    svg {
        font-size: 25px;
    }
    div {
        font-size: 20px;
        color: #000
    }
`

export default function UsuarioSidebar({ icon, name }) {
    return (
        <UsuarioSidebarContainer>
            {icon}
            <div to={'h'}>
                Bem-vindo, {name}!
            </div>
        </UsuarioSidebarContainer>
    )
}