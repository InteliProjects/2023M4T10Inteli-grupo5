import styled from "styled-components";
import {Form, Input, Button, DatePicker} from "antd";

import api from "../../api";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: 100%;
  max-width: 80%;
  margin: 0 auto;
  padding: 1em;
  box-sizing: border-box;
  border: .5px solid rgba(0,0,0,0.1);
  border-radius: 5px;
  box-shadow: 3px 3px rgba(0,0,0,0.08);
  justify-content: center;
  align-items: center;

  textarea {
    resize: vertical;
  }

  button {
    background-color: var(--laranja-principal);
  }

  button:hover {
    &:hover {
      background-color: var(--laranja-principal) !important;

      box-shadow: 3px 3px rgba(0,0,0,0.15);
    }
  }
`;

export default function NovoRegistro() {

  const [form] = Form.useForm();

	const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        // envia os valores para post /pecas
        api.post('/responsabilidades', values)
          .then((response) => {
            console.log(response);
            form.resetFields();
          })
          .catch((error) => {
            alert('Erro: ', error)
          })
      })
      .catch((errorInfo) => {
        console.log("Erro ao validar campos:", errorInfo);
      });
  };

  return (
    <>
      <h2 style={{color: "var(--cinza-titulo)", textAlign: "center"}}>
        Registrar Responsabilidade
      </h2>
      <Container>
      <Form layout="vertical" style={{ width: "90%" }} form={form}>
        <Form.Item label="RFID da Peça" rules={[{ required: true }]} name="peca_rfid">
          <Input placeholder="Tag identificadora acoplada ao produto"/>
        </Form.Item>

        <Form.Item label="RFID do Responsável" rules={[{ required: true }]} name="responsavel_rfid">
          <Input placeholder="Tag identificadora acoplada ao cartão do usuário"/>
        </Form.Item>

        <Form.Item label="Tópico do Módulo IoT" rules={[{ required: true }]} name="topico_caminhao">
            <Input placeholder="Tópico do módulo IoT"/>
        </Form.Item>

        <Form.Item label="Data" rules={[{ required: true }]} name="created_at">
          <DatePicker />
        </Form.Item>
      </Form>
      <div style={{display: "flex", justifyContent: "center"}}>
        <Button type="primary" onClick={handleFormSubmit}>
          Finalizar cadastro
        </Button>
      </div>
      </Container>
    </>
  )
}