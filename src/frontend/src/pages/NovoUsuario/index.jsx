import styled from "styled-components";
import {Form, Input, Button, Select, Radio} from "antd";

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

export default function NovoUsuario() {

  const [form] = Form.useForm();

	const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        // envia os dados para post /responsaveis
        api
          .post("/responsaveis", values)
          .then((response) => {
            console.log(response);
            form.resetFields();
          })
          .catch((error) => {
            console.log("Erro ao cadastrar usuário:", error);
          });
      })
      .catch((errorInfo) => {
        console.log("Erro ao validar campos:", errorInfo);
      });
  };

  return (
    <>
      <h2 style={{color: "var(--cinza-titulo)", textAlign: "center"}}>
        Cadastrar Usuário
      </h2>
      <Container>
      <Form layout="vertical" style={{ width: "90%" }} form={form}>
        <Form.Item label="RFID" rules={[{ required: true }]} name="rfid">
          <Input placeholder="Tag identificadora do cartão do usuário"/>
        </Form.Item>
        <Form.Item label="Nome" rules={[{ required: true }]} name="nome">
          <Input placeholder="Nome do usuário"/>
        </Form.Item>
        <Form.Item label="Perfil" rules={[{ required: true }]} name="perfil">
          <Select placeholder="Função do usuário">
            <Select.Option value="Almoxarife">Almoxarife</Select.Option>
            <Select.Option value="Motorista Operação">Motorista (frente de operação)</Select.Option>
            <Select.Option value="Motorista">Motorista (caminhão oficina)</Select.Option>
            <Select.Option value="Lider">Líder de Operação</Select.Option>
            <Select.Option value="Técnico">Técnico (Cubo)</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Status" rules={[{ required: true }]} name="status">
          <Radio.Group>
            <Radio value={true}>Ativo</Radio>
            <Radio value={false}>Inativo</Radio>
          </Radio.Group>
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