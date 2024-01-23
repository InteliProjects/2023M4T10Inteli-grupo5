/* eslint-disable react/prop-types */
import styled from "styled-components";

const InputEstilizado = styled.input`
    width: 80%;
    height: 48px;
    border-radius: 14px;
    border: .5px solid rgba(0,0,0,0.15);
    padding: 5px;
    outline: none;
    font-size: 16px;
    background-color: #ffffff;
    font-family: 'Roboto', sans-serif;
    padding-left: 3em;

    // a imagem precisa ficar antes do placeholder
    background-image: url(${props => props.icone ? props.icone : ''});
    background-repeat: no-repeat;
    background-position: 1em center;
    background-size: 24px;

    &::placeholder{
        color: rgba(0,0,0,0.35);
    }

    &:focus{
        border: .5px solid rgba(0,0,0,0.35);
    }
`

export default function Input(props) {
    return (
        <>
            <label htmlFor={props.placeholder} style={{display: 'none'}}>{props.placeholder}</label>
            <InputEstilizado type={props.type} id={props.placeholder} placeholder={props.placeholder} icone={props.icone}/>
        </>
    )
}