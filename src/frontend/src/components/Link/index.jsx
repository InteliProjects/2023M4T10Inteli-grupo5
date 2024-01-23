import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LinkEstilizado = styled(Link)`
    text-decoration: none;
    font-size: 16px;
    color: #0000FF;

    &:hover{
        text-decoration: underline;
    }
`