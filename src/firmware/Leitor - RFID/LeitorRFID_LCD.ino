#include <Wire.h>
#include <LiquidCrystal_I2C.h>
#include <MFRC522.h>
#include <SPI.h>

#define redLed 2
#define greenLed 4
#define blueLed 5

#define LCDColumnLen 16
#define LCDNColumn 2

#define sdaPin 32  // Define o pino de seleção (SDA) do MFRC522
#define rstPin 33 // Define o pino de reset do MFRC522

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
  void setColor(int R, int G, int B) {
    analogWrite(pinR, R);
    analogWrite(pinG, G);
    analogWrite(pinB, B);
  }
};

class LCDController {
public:
  LCDController(uint8_t lcdAddress, uint8_t columns, uint8_t rows)
    : lcd(lcdAddress, columns, rows) {}

  void begin() {
    Wire.begin();
    lcd.init();
    lcd.backlight();
  }

  void clear() {
    lcd.clear();
  }

  void print(int column, int row, const char *text) {
    lcd.setCursor(column, row);
    lcd.print(text);
  }

  void print(int column, int row, String text) {
    lcd.setCursor(column, row);
    lcd.print(text);
  }

  void printAlinhado(int textLength, int row, const char *text) {
    int centerPosition = (16 - textLength) / 2;
    lcd.setCursor(centerPosition, row);
    lcd.print(text);
  }

  void printAlinhado(int textLength, int row, String text) {
    int centerPosition = (16 - textLength) / 2;
    lcd.setCursor(centerPosition, row);
    lcd.print(text);
  }

private:
  LiquidCrystal_I2C lcd;
};

class RFIDReader {
private:
  MFRC522 mfrc522;
  bool cardDetected;
  bool newCardDetected;
  bool cardRead;
  String tagUID;
  RGBLed myLed;
  LCDController lcdController;

public:
  RFIDReader(int sdaPin_, int rstPin_, int redPin, int greenPin, int bluePin, int LCDColumnLen_, int LCDNColumn_)
    : mfrc522(sdaPin_, rstPin_), cardDetected(false), myLed(redPin, greenPin, bluePin), lcdController(0x27, LCDColumnLen_, LCDNColumn_) {}

  void setup() {
    Serial.begin(115200);
    SPI.begin();
    mfrc522.PCD_Init();
    lcdController.begin();
  }

  void prontoParaExecutar() {
    myLed.setColor(0, 0, 255);
    lcdController.clear();
    lcdController.printAlinhado(7, 0, "sistema");
    lcdController.printAlinhado(12, 1, "inicializado");
    delay(1000);
    myLed.setColor(255, 100, 0);
    lcdController.clear();
    lcdController.printAlinhado(14, 0, "Aproxime a TAG");
    lcdController.printAlinhado(4, 1, "RFID");
  }

  void loop() {
    checkForCard();
    validateCard();
    delay(500);
  }

  void checkForCard() {
    delay(100);
    newCardDetected = mfrc522.PICC_IsNewCardPresent();
    cardRead = mfrc522.PICC_ReadCardSerial();
  }

  void validateCard() {
    if (cardRead) {
      cardReader();
    } else {
      cardNotDetected();
    }
  }

  void cardReader() {
    mfrc522.PICC_ReadCardSerial();
    cardID();
  }

  void cardID() {
    if (!cardDetected) {
      myLed.setColor(0, 255, 0);
      Serial.print("Cartão Detectado: ");
      tagUID = "";  // Limpa a variável do UID
      for (byte i = 0; i < mfrc522.uid.size; i++) {
        tagUID += String(mfrc522.uid.uidByte[i], HEX);
      }
      lcdController.clear();
      lcdController.printAlinhado(14, 0, "Sua Tag indica");
      lcdController.printAlinhado(8, 1, tagUID);
      Serial.print(tagUID);
      Serial.println();
      cardDetected = true;
    }

    mfrc522.PICC_HaltA();
  }

  void cardNotDetected() {
    if (cardDetected) {
      myLed.setColor(255, 100, 0);
      lcdController.clear();
      lcdController.printAlinhado(14, 0, "Aproxime a TAG");
      lcdController.printAlinhado(4, 1, "RFID");

      cardDetected = false;
    }
  }
};

RFIDReader rfidReader(sdaPin, rstPin, redLed, greenLed, blueLed, LCDColumnLen, LCDNColumn);

void setup() {
  Serial.begin(115200);

  rfidReader.setup();
  rfidReader.prontoParaExecutar();
}

void loop() {
  rfidReader.loop();
}
