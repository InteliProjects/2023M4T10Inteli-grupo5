# Inteli - Instituto de Tecnologia e Liderança 

<p align="center">
<a href= "https://www.inteli.edu.br/"><img src="assets/inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0" width=40% height=40%></a>
</p>

<br>

# BIOT Solutions 1

## BIOT Solutions

## 👨‍🎓 Integrantes: 
- <a href="https://www.linkedin.com/in/eduardo-simonis-ferrari/">Eduardo Simonis Seabra Martins Ferrari</a>
- <a href="https://www.linkedin.com/in/henrique-ottoboni-magalh%C3%A3es-77b950264/">Henrique Ottoboni Magalhães</a>
- <a href="https://www.linkedin.com/in/jo%C3%A3o-paulo-santos-872753264/">João Paulo Santos</a> 
- <a href="https://www.linkedin.com/in/kaylanevasconcelos/">Kaylane de Cássia Vasconcelos de Brito</a> 
- <a href="https://www.linkedin.com/in/marcelomiguelassis/">Marcelo Miguel Pereira de Assis</a>
- <a href="https://www.linkedin.com/in/moyses-birman-anijar-884648231/">Moyses Birman Anijar</a> 
- <a href="https://www.linkedin.com/in/victor-gabriel-marques/">Victor Gabriel Marques</a>

## 👩‍🏫 Professores:
### Orientador(a) 
- <a href="https://www.linkedin.com/in/marcelo-gon%C3%A7alves-phd-a550652/">Marcelo Luiz do Amaral Gonçalves</a>
### Instrutores
- <a href="https://www.linkedin.com/in/andreluizbraga/">André Luiz Braga</a>
- <a href="https://www.linkedin.com/in/profclaudioandre/?originalSubdomain=br">Claudio André</a> 
- <a href="https://www.linkedin.com/in/cristiano-benites-687647a8/">Cristiano da Silva Benites</a>
- <a href="https://www.linkedin.com/in/henrique-mohallem-paiva-6854b460/">Henrique Mohallem Paiva</a> 
- <a href="https://www.linkedin.com/in/juliastateri/">Julia Stateri</a> 
- <a href="https://www.linkedin.com/in/fatima-toledo/">Fatima Toledo</a>


## 📜 Descrição

&nbsp;&nbsp;&nbsp;&nbsp;A Atvos é uma empresa proeminente no agronegócio brasileiro, com forte atuação na produção e comercialização de etanol, açúcar VHP e energia elétrica originados da cana-de-açúcar e sua biomassa. Com sede no Brasil, a empresa se destaca não apenas por sua magnitude operacional, mas também por sua postura inovadora e comprometimento com práticas sustentáveis. Desde sua fundação em 2007, a Atvos consolidou-se como a segunda maior produtora de etanol do país, fortalecendo sua presença e reputação no mercado nacional. A empresa possui uma capacidade impressionante de abastecimento, ilustrada pela sua habilidade de fornecer etanol para 60 milhões de carros compactos, produzir açúcar suficiente para adoçar inúmeras festas e gerar energia elétrica para milhões de pessoas.

&nbsp;&nbsp;&nbsp;&nbsp;Diante deste cenário de produção em larga escala, a Atvos enfrenta desafios significativos na gestão e rastreabilidade de seus insumos, peças e equipamentos rodantes. Estes desafios englobam desde a falta de um controle rigoroso de estoque em trânsito entre o almoxarifado e o campo, até a necessidade de garantir que peças trocadas sejam efetivamente retornadas ao almoxarifado. Além disso, a empresa busca mecanismos eficientes para prevenir possíveis desvios ou roubos de peças e insumos, garantindo assim a integridade e eficácia de suas operações.

&nbsp;&nbsp;&nbsp;&nbsp;Para atender às metas estabelecidas pela Atvos, propomos a implementação da solução. Esta solução busca revolucionar a forma como a Atvos gerencia seus insumos e equipamentos, incorporando tecnologia IoT para proporcionar um monitoramento em tempo real ao longo de todo o ciclo operacional. Uma plataforma em nuvem, parte integrante desta solução, será desenvolvida para processar, armazenar e disponibilizar as informações coletadas de maneira intuitiva para os gestores. Com a capacidade de enviar alertas instantâneos e notificações, a solução identificará rapidamente qualquer atividade incomum ou desvio, garantindo a segurança dos ativos e a continuidade das operações, tudo por um preço acessível que possibilitará uma redução expressiva do prejuízo da empresa. Ao mesmo tempo, as análises e insights gerados pela solução permitirão a otimização de rotas, ações de manutenção preventiva e uma gestão de estoques mais ágil e precisa, cumprindo assim todos os objetivos traçados pela Atvos.

&nbsp;&nbsp;&nbsp;&nbsp;[Este vídeo](https://youtu.be/kgizoHEILio) demonstra o funcionamento do protótipo final do projeto.

## 📁 Estrutura de pastas

Dentre os arquivos e pastas presentes na raiz do projeto, definem-se:

- <b>assets</b>: aqui estão os arquivos relacionados a parte gráfica do projeto, ou seja, as imagens e vídeos que os representam.

- <b>document</b>: aqui estão todos os documentos do projeto, incluindo o manual de instruções (se aplicável). Há também uma pasta denominada <b>outros</b> onde estão presentes outros documentos complementares.

- <b>src</b>: Todo o código fonte criado para o desenvolvimento do projeto, incluindo firmware, notebooks, backend e frontend, se aplicáveis.

- <b>README.md</b>: arquivo que serve como guia e explicação geral sobre o projeto (o mesmo que você está lendo agora).

## 🔧 Instalação

Para a utilização desta solução são necessárias as seguintes ferramentas e/ou tecnologias:

- [Python 3.8 (cliente MQTT)](https://www.python.org/downloads/release/python-380/)
- [Node.js (back-end e front-end)](https://nodejs.org/en/download/)
- [PostgreSQL (banco de dados)](https://www.postgresql.org/download/)
- [Arduino IDE (firmware)](https://www.arduino.cc/en/software)
- [Visual Studio Code (IDE)](https://code.visualstudio.com/download)
- [Git (controle de versão)](https://git-scm.com/downloads)
- [Broker MQTT na AWS IoT Core](https://aws.amazon.com/pt/iot-core/)

### 🚀 Executando o back-end

Para executar o back-end, siga os passos abaixo:

1. Abra o terminal na pasta `src/backend`.
2. Execute o comando `npm i` para instalar as dependências.
3. Em seguida, execute o comando `npm run dev` para iniciar o servidor.

### 🚀 Executando o front-end

Para executar o front-end, siga os passos abaixo:

1. Abra o terminal na pasta `src/frontend`.
2. Execute o comando `npm i` para instalar as dependências.
3. Em seguida, execute o comando `npm run dev` para iniciar o servidor.

É possível acessar o manual de instrução completo deste projeto através [deste link](https://docs.google.com/document/d/1d2_wpLK4oKYa9g7esfHs5y_FxKGdDm1T/edit), ou através da pasta `documents`.


## 🗃 Histórico de lançamentos

* 0.5.0 - 21/12/2023
    * Lógica de registro de responsabilidade das peças, incluindo vínculo com veículos, tanto no módulo físico quanto no sistema web.

* 0.4.0 - 08/12/2023
    * Back-end com AdonisJS + Typescript para registro de peças e de usuários no sistema. Integração completa do sistema web com os módulos físicos e com o banco de dados. Melhoria da *case* 3D.
    
* 0.3.0 - 24/11/2023
    * *Case* 3D para disposição dos componentes do módulo físico. Construção da página de login e da home do sistema web.
    
* 0.2.0 - 10/11/2023
    * *Broker* MQTT na AWS IoT Core. Cliente MQTT em Python. Integração com o módulo físico para registro de peças no banco de dados PostgreSQL.
    
* 0.1.0 - 27/10/2023
    * **Protótipo inicial** com ESP32, LEDS e sensor RFID. Realiza leitura da TAG e acende a luz verde em caso de identificação e a luz vermelha em caso de erro.


## 📋 Licença/License

<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"><p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://github.com/2023M4T10Inteli/grupo5">BIOT Solutions</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName">Inteli, - <a href="https://www.linkedin.com/in/eduardo-simonis-ferrari/">Eduardo Simonis Seabra Martins Ferrari</a>, <a href="https://www.linkedin.com/in/henrique-ottoboni-magalh%C3%A3es-77b950264/">Henrique Ottoboni Magalhães</a>, <a href="https://www.linkedin.com/in/jo%C3%A3o-paulo-santos-872753264/">João Paulo Santos</a>, <a href="https://www.linkedin.com/in/kaylanevasconcelos/">Kaylane de Cássia Vasconcelos de Brito</a>, <a href="https://www.linkedin.com/in/marcelomiguelassis/">Marcelo Miguel Pereira de Assis</a>, <a href="https://www.linkedin.com/in/moyses-birman-anijar-884648231/">Moyses Birman Anijar</a>, <a href="https://www.linkedin.com/in/victor-gabriel-marques/">Victor Gabriel Marques</a> </a> is licensed under <a href="http://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">Attribution 4.0 International</a>.</p>