import styled from "styled-components";
import {Form, Input, Radio, Select, Button} from "antd";

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

export default function NovoProduto() {

  const [form] = Form.useForm();

	const handleFormSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        // envia os valores para post /pecas
        api.post('/pecas', values)
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
        Cadastrar Produto
      </h2>
      <Container>
      <Form layout="vertical" style={{ width: "90%" }} form={form}>
        <Form.Item label="RFID" rules={[{ required: true }]} name="rfid">
          <Input placeholder="Tag identificadora acoplada ao produto"/>
        </Form.Item>

        <Form.Item label="Tipo" rules={[{ required: true }]} name="tipo">
          <Radio.Group >
            <Radio value="bateria"> Bateria </Radio>
            <Radio value="pneu"> Pneu </Radio>
            <Radio value="motor"> Motor </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Almoxarifado" rules={[{ required: true }]} name="almoxarifado_id">
          <Select>
            <Select.Option value="1">Base 0657</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Disponível" rules={[{ required: true }]} name="disponivel">
          <Radio.Group >
            <Radio value={true}> Sim </Radio>
            <Radio value={false}> Não </Radio>
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