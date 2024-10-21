#include <NTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <Servo.h>
#include <ESP8266HTTPClient.h>
#include <WiFiClientSecure.h>
#include <ArduinoJson.h>
#include <OneWire.h>
#include <DallasTemperature.h>

// Wi-Fi credentials
const char* ssid = "CREENCIA_2.4";  
const char* password = "$PAYAMANFAM_2023$";  

// API URLs
const char* servoApiUrl = "https://sba-com.preview-domain.com/iot_api/servo_timing.php?servo_uid=S1";  
const char* sensorUidApiUrl = "https://sba-com.preview-domain.com/iot_api/fetchSensorUid.php"; // New API for fetching temperature sensor UID
const char* dataApiUrl = "https://sba-com.preview-domain.com/iot_api/send_sensor_data.php";  // New API for sending data

// Create a UDP instance
WiFiUDP ntpUDP;

// Create an NTPClient instance for Philippine Time (UTC+8)
NTPClient timeClient(ntpUDP, "asia.pool.ntp.org", 28800, 10000);

// Create a Servo object
Servo myServo;
const int servoPin = D4;  // Use D4 (GPIO2) on the WeMos D1

// MQ-137 sensor pin
const int mq137Pin = A0;  // Analog pin for the MQ-137 sensor

// DS18B20 Sensor Setup
const int oneWirePin = D2; // Use D2 (GPIO4) for DS18B20
OneWire oneWire(oneWirePin);
DallasTemperature sensors(&oneWire);

// Variables
String activeTimes[10];  
int activeTimeCount = 0;  
bool servoActivated = false;  
String tankId = "";  
int mq137Value = 0;  // Variable to store the ammonia value
float temperatureValue = 0.0; // Variable to store the temperature

// Create a secure WiFiClient instance
WiFiClientSecure client;

// Timing variables
const long apiInterval = 10000;  
const long displayInterval = 1000;  
unsigned long lastApiCall = 0;
unsigned long lastDisplay = 0; 

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");
  }
  Serial.println(" Connected!");
  
  timeClient.begin();
  myServo.attach(servoPin);
  sensors.begin(); // Initialize the DS18B20 sensor
}

void loop() {
  unsigned long currentMillis = millis();

  if (currentMillis - lastApiCall >= apiInterval) {
    lastApiCall = currentMillis;  
    activeTimeCount = 0;  

    if (WiFi.status() == WL_CONNECTED) {
      fetchServoTimingData();
      fetchTankId();
    }
  }

  timeClient.update();
  String currentTime = timeClient.getFormattedTime();
  bool matchFound = false; 

  for (int i = 0; i < activeTimeCount; i++) {
    if (activeTimes[i] == currentTime) {
      matchFound = true; 
      if (!servoActivated) {
        myServo.write(180);  
        delay(5000);         
        myServo.write(0);    
        servoActivated = true;  
      }
      break;  
    }
  }

  if (!matchFound) {
    servoActivated = false;
  }

  if (currentMillis - lastDisplay >= displayInterval) {
    lastDisplay = currentMillis;  
    mq137Value = analogRead(mq137Pin);  
    Serial.print("Ammonia Value: ");
    Serial.println(mq137Value);  
    Serial.print("Tank ID: "); 
    Serial.println(tankId);
    
    // Read temperature from DS18B20
    sensors.requestTemperatures(); // Request temperature readings
    temperatureValue = sensors.getTempCByIndex(0); // Get temperature in Celsius
    Serial.print("Water Temperature: ");
    Serial.println(temperatureValue); // Print temperature

    // Send both ammonia and temperature sensor data to the database
    sendSensorData(tankId, "A1", mq137Value); // Sending ammonia data with UID A1
    sendSensorData(tankId, "T1", temperatureValue); // Sending temperature data with UID T1
  }
}

void fetchServoTimingData() {
  HTTPClient http;
  client.setInsecure();  
  http.begin(client, servoApiUrl);
  int httpCode = http.GET();

  if (httpCode > 0) {
    String payload = http.getString();
    DynamicJsonDocument doc(2048);
    DeserializationError error = deserializeJson(doc, payload);

    if (!error) {
      for (JsonObject timing : doc["servoTimings"].as<JsonArray>()) {
        String uid = timing["servo_uid"];
        String status = timing["status"];
        String time = timing["time"];
        if (uid == "S1" && status == "Active" && activeTimeCount < 10) {
          activeTimes[activeTimeCount] = time;
          activeTimeCount++;  
        }
      }
    }
  }
  http.end();
}

void fetchTankId() {
    // Create the tank API URL dynamically using both sensor UIDs
    String tankApiUrl = "https://sba-com.preview-domain.com/iot_api/fetchTankId.php?sensor_uid=A1&temperature_sensor_uid=T1"; 

    HTTPClient http;
    client.setInsecure();  
    http.begin(client, tankApiUrl);
    int httpCode = http.GET();

    if (httpCode > 0) {
        String payload = http.getString();
        DynamicJsonDocument doc(1024);
        DeserializationError error = deserializeJson(doc, payload);

        if (!error) {
            if (doc.containsKey("tank_id")) {
                tankId = doc["tank_id"].as<String>();
            } else {
                Serial.println("Error: No tank found.");
            }
        }
    }
    http.end();
}

// Function to send sensor data to the database
void sendSensorData(String tankId, String sensorUid, float dataValue) {
  HTTPClient http;
  client.setInsecure();  
  http.begin(client, dataApiUrl);

  // Prepare data to send
  unsigned long epochTime = timeClient.getEpochTime();
  String postData = "tank_id=" + tankId + "&sensor_uid=" + sensorUid + "&data_value=" + String(dataValue) + "&timestamp=" + String(epochTime);

  // Specify content type
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  // Send POST request
  int httpResponseCode = http.POST(postData);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.println("Data sent successfully: " + response);
  } else {
    Serial.print("Error sending data: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}
