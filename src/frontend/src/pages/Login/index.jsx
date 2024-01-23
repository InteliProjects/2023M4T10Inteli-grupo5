import styled from 'styled-components';
import FundoLogin from '../../assets/fundo-login.svg';
import IconeEmail from '../../assets/icone-email.svg';
import IconeCadeado from '../../assets/icone-cadeado.svg';
import Input from '../../components/Input';
import { LinkEstilizado } from '../../components/Link';
import { Button } from '@mui/material';


const LoginContainer = styled.div`
    display: flex;
    margin: 0;
`

const ContainerFigura = styled.figure`
    background-color: #8F6B2C;
    width: 60%;
    height: 100vh;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    @media(max-width: 440px){
        display: none;
    }

    @media(min-width: 440px) and (max-width: 800px){
        width: 40%;
    }
`

const ImagemEstilizada = styled.img`
    width: 50%;
    height: 50%;
`

const ContainerForm = styled.form`
    background-color: #F9F9F9;
    width: 50%;
    height: 100vh;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 30px;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.55);

    @media(max-width: 440px){
        width: 100%;
        padding: 10px;
        background-image: url(${FundoLogin});
        background-repeat: no-repeat;
        background-size: 12em;
        background-position: top;
        
    }

    @media(min-width: 440px) and (max-width: 800px){
        width: 60%;
    }
`

const ContainerLinks = styled.div`
    display: flex;
    width: 85%;
    justify-content: space-between;
    align-items: center;
`

export default function Login(){
    return(
        <LoginContainer>
            <ContainerFigura>
                <ImagemEstilizada src={FundoLogin} alt='Fundo de Login'/>
            </ContainerFigura>
            <ContainerForm>
                <h1 style={{color: '#171717', fontSize: '36px'}}>Bem-Vindo(a)!</h1>
                <Input type='email' placeholder='Email' icone={IconeEmail}/>
                <Input type='password' placeholder='Senha' icone={IconeCadeado}/>
                <ContainerLinks>
                    <LinkEstilizado to='/'>Esqueceu sua senha?</LinkEstilizado>
                </ContainerLinks>
                <Button variant='contained' style={{width: '85%', height: '48px', borderRadius: '14px', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#d98f19'}} type='submit'>Entrar</Button>
            </ContainerForm>
        </LoginContainer>
    )
}