#include "secrets.h"
#include <WiFiClientSecure.h>
#include <MQTTClient.h>
#include <ArduinoJson.h>
#include <time.h>
#include "WiFi.h"
#include <SPI.h>
#include <MFRC522.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>


// Definição dos tópicos MQTT
#define AWS_IOT_PUBLISH_TOPIC "BioT/Atvos/IoTPublisher"
#define AWS_IOT_SUBSCRIBE_TOPIC "BioT/Atvos/caminhaoOficina1"

// Pinos dos LEDs RGB
#define redLed 2
#define greenLed 4
#define blueLed 5

// Constantes para o display LCD
#define LCDColumnLen 16
#define LCDNColumn 2

// Criação de objetos para o cliente Wi-Fi, cliente MQTT, LEDs RGB, e controlador de LCD
WiFiClientSecure net = WiFiClientSecure();
MQTTClient client = MQTTClient(256);

// Variável para armazenar a data
char data[64];

// Flag para indicar se o programa está esperando por uma mensagem MQTT
bool esperandoMensagem = true;

// Classe para controle de um LED RGB
class RGBLed {
private:
  int pinR, pinG, pinB;
public:
  RGBLed(int R, int G, int B) {
    pinR = R;
    pinG = G;
    pinB = B;
    pinMode(pinR, OUTPUT);
    pinMode(pinG, OUTPUT);
    pinMode(pinB, OUTPUT);
  }
  // Define a cor do LED RGB
  void setColor(int R, int G, int B) {
    analogWrite(pinR, R);
    analogWrite(pinG, G);
    analogWrite(pinB, B);
  }
};

// Classe para controle de um display LCD I2C
class LCDController {
public:
  LCDController(uint8_t lcdAddress, uint8_t columns, uint8_t rows)
    : lcd(lcdAddress, columns, rows) {}

  // Inicializa o display LCD
  void begin() {
    Wire.begin();
    lcd.init();
    lcd.backlight();
  }

  // Limpa o conteúdo do display LCD
  void clear() {
    lcd.clear();
  }

  // Imprime texto em uma posição específica do display LCD
  void print(int column, int row, const char *text) {
    lcd.setCursor(column, row);
    lcd.print(text);
  }

  // Imprime texto centralizado no display LCD
  void printAlinhado(int textLength, int row, const char *text) {
    int centerPosition = (16 - textLength) / 2;
    lcd.setCursor(centerPosition, row);
    lcd.print(text);
  }

private:
  LiquidCrystal_I2C lcd;
};

RGBLed MyLed(redLed, greenLed, blueLed);
LCDController lcdController(0x27, LCDColumnLen, LCDNColumn);

// Classe para leitura de cartões RFID
class RFIDReader {
private:
  MFRC522 mfrc522;
  bool cardDetected;
  bool credentialExist;
  bool newCardDetected;
  bool cardRead;
  String tagUID;
  RGBLed myLed;
  LCDController lcdController;

public:
  RFIDReader(int sdaPin, int rstPin, int redPin, int greenPin, int bluePin, int LCDColumnLen_, int LCDNColumn_)
    : mfrc522(sdaPin, rstPin), cardDetected(false), credentialExist(false), myLed(redPin, greenPin, bluePin), lcdController(0x27, LCDColumnLen_, LCDNColumn_) {}

  // Inicializa o leitor RFID e o display LCD
  void setup() {
    Serial.begin(115200);
    SPI.begin();
    mfrc522.PCD_Init();
    lcdController.begin();
  }

  // Prepara o sistema para executar
  void prontoParaExecutar() {
    lcdController.clear();
    lcdController.printAlinhado(7, 0, "Conecte");
    lcdController.printAlinhado(14, 1, "sua credencial");
    myLed.setColor(0, 255, 0);
    delay(400);
    myLed.setColor(0, 155, 155);
    delay(400);
    myLed.setColor(0, 0, 255);
  }

  // Loop principal para verificação do cartão RFID
  void loop() {
    esperandoMensagem = true;
    checkForCard();
    validateCard();
    delay(500);
  }

  // Verifica se um cartão RFID está presente
  void checkForCard() {
    delay(100);
    newCardDetected = mfrc522.PICC_IsNewCardPresent();
    cardRead = mfrc522.PICC_ReadCardSerial();
  }

  // Valida o cartão RFID
  void validateCard() {
    if (cardRead) {
      cardReader();
    } else {
      cardNotDetected();
    }
  }

  // Leitura do cartão RFID
  void cardReader() {
    mfrc522.PICC_ReadCardSerial();
    cardID();
  }

  // Identificação do UID do cartão RFID
  void cardID() {
    if (!cardDetected) {
      myLed.setColor(0, 255, 0);  // Controla o LED com a nova classe
      Serial.print("Cartão Detectado: ");
      tagUID = "";  // Limpa a variável do UID
      for (byte i = 0; i < mfrc522.uid.size; i++) {
        tagUID += String(mfrc522.uid.uidByte[i], HEX);
      }
      //-- Início Publicação MQTT --
      StaticJsonDocument<200> doc;
      doc["Data"] = data;
      doc["TagUID"] = tagUID;
      doc["TopicResposta"] = "caminhaoOficina1";
      if (!credentialExist) {
        doc["Credential"] = "true";
      } else {
        doc["Credential"] = "false";
      }
      char jsonBuffer[512];
      serializeJson(doc, jsonBuffer);  //-- Fim Publicação MQTT --
      client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
      //-- Fim Publicação MQTT --
      Serial.print(tagUID);
      Serial.println();
      cardDetected = true;
      lcdController.clear();
      if (!credentialExist) {
        lcdController.printAlinhado(10, 0, "Credencial");
        lcdController.printAlinhado(7, 1, "Enviada");
      } else {
        lcdController.printAlinhado(13, 0, "Identificador");
        lcdController.printAlinhado(7, 1, "Enviado");
      }
      delay(1000);
      lcdController.clear();
      do {
        myLed.setColor(255, 255, 0);
        lcdController.printAlinhado(10, 0, "Aguardando");
        lcdController.printAlinhado(8, 1, "servidor");
        lcdController.print(12, 1, "   ");
        delay(300);
        lcdController.print(12, 1, ".  ");
        delay(300);
        myLed.setColor(0, 0, 0);
        lcdController.print(12, 1, ".. ");
        delay(300);
        lcdController.print(12, 1, "...");
        client.loop();
        delay(400);
      } while (esperandoMensagem);
    }

    mfrc522.PICC_HaltA();
  }

  // Ação quando nenhum cartão é detectado
  void cardNotDetected() {
    if (cardDetected && esperandoMensagem) {
      if (!credentialExist) {
        lcdController.clear();
        lcdController.printAlinhado(7, 0, "Conecte");
        lcdController.printAlinhado(14, 1, "sua credencial");
        myLed.setColor(0, 0, 255);
      } else {
        lcdController.clear();
        lcdController.printAlinhado(14, 0, "Aproxime a TAG");
        lcdController.printAlinhado(7, 1, "do item");
        myLed.setColor(255, 0, 0);  // Controla o LED com a nova classe
        Serial.println("Nenhum cartão detectado.");
      }
      cardDetected = false;
    }
  }

  // Indica que a credencial foi validada
  void credencialValidada() {
    credentialExist = true;
  }
};

// Pinos SDA e de reset para o leitor RFID
int sdaPin = 32;  // Pino SDA
int rstPin = 33;  // Pino de reset

// Criação de um objeto RFIDReader
RFIDReader rfidReader(sdaPin, rstPin, redLed, greenLed, blueLed, LCDColumnLen, LCDNColumn);

// Função para conectar ao AWS IoT
void connectAWS() {
  // Configuração do modo e início da conexão Wi-Fi
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.println("Connecting to Wi-Fi");
  lcdController.print(0, 0, "Acessando a rede");
  lcdController.print(0, 1, "Aguarde");

  // Aguarda a conexão Wi-Fi
  while (WiFi.status() != WL_CONNECTED) {
    esperaWifiUX();
    Serial.print(".");
  }

  // Configura o WiFiClientSecure para usar as credenciais do dispositivo AWS IoT
  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);

  // Conecta ao broker MQTT na extremidade AWS IoT definida anteriormente
  client.begin(AWS_IOT_ENDPOINT, 8883, net);

  // Cria um manipulador de mensagens
  client.onMessage(messageHandler);

  Serial.print("Connecting to AWS IOT");

  // Aguarda a conexão ao AWS IoT
  while (!client.connect(THINGNAME)) {
    Serial.print(".");
    delay(100);
  }

  if (!client.connected()) {
    Serial.println("AWS IoT Timeout!");
    return;
  }

  // Inscreve-se em um tópico
  client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);

  Serial.println("AWS IoT Connected!");
}

// Função de UX para esperar a conexão Wi-Fi
void esperaWifiUX() {
  MyLed.setColor(255, 255, 0);
  lcdController.print(8, 1, "   ");
  delay(400);
  lcdController.print(8, 1, ".  ");
  delay(400);
  MyLed.setColor(0, 0, 0);
  lcdController.print(8, 1, ".. ");
  delay(400);
  lcdController.print(8, 1, "...");
  delay(500);
}

// Manipulador de mensagens MQTT
void messageHandler(String &topic, String &payload) {
  Serial.println("incoming: " + topic + " - " + payload);
  // Processamento da mensagem MQTT recebida
  StaticJsonDocument<200> doc;
  deserializeJson(doc, payload);
  const int id = doc["id"];
  const char *nome = doc["nome"];
  lcdController.clear();
  // Atualização da interface com base no conteúdo da mensagem
  if (id == 0) {
    lcdController.printAlinhado(8, 0, "Item sem");
    lcdController.printAlinhado(8, 1, "registro");
    MyLed.setColor(254, 109, 3);
  } else if (id == 1) {
    lcdController.print(0, 0, nome);
    lcdController.print(0, 1, "Registrado(a)");
    MyLed.setColor(0, 255, 0);
  } else if (id == 9) {
    lcdController.printAlinhado(10, 0, "Credencial");
    lcdController.printAlinhado(12, 1, "sem registro");
    MyLed.setColor(254, 109, 3);
  } else if (id == 10) {
    lcdController.print(0, 0, "Bem Vindo");
    lcdController.print(0, 1, nome);
    rfidReader.credencialValidada();
    MyLed.setColor(0, 255, 0);
  } else {
    lcdController.printAlinhado(14, 0, "Banco de Dados");
    lcdController.printAlinhado(6, 0, "Falhou");
    MyLed.setColor(254, 109, 3);
  }
  delay(2500);
  esperandoMensagem = false;
}

// Função de inicialização
void setup() {
  lcdController.begin();
  Serial.begin(115200);
  connectAWS();

  // Configura o fuso horário para o de Brasília
  configTime(-3 * 3600, 0, "pool.ntp.org", "time.nist.gov");

  uint32_t start = millis();
  while (!time(nullptr)) {
    delay(1000);
    if (millis() - start > 5000) {
      return;
    }
  }
  Serial.println("Horário sincronizado!");

  rfidReader.setup();
  rfidReader.prontoParaExecutar();
}

void sincronizando_data() {
  struct tm timeinfo;
  if (!getLocalTime(&timeinfo)) {
    Serial.println("Falha ao obter tempo");
    return;
  }
  strftime(data, sizeof(data), "%d/%m/%Y %H:%M:%S", &timeinfo);
}

// Função principal de loop
void loop() {
  sincronizando_data();
  rfidReader.loop();
  client.loop();
}