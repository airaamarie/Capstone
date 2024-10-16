#include <OneWire.h>
#include <DallasTemperature.h>
#include <NTPClient.h>
#include <ESP8266WiFi.h>
#include <WiFiUdp.h>
#include <Servo.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

// Wi-Fi credentials
const char* ssid = "CREENCIA_2.4"; // Replace with your WiFi SSID
const char* password = "$PAYAMANFAM_2023$"; // Replace with your WiFi Password

// API URL for fetching servo timing data
const char* apiUrl = "http://192.168.1.8/Capstone/iot_api/servo_timing.php?servo_uid=S1"; // Replace with actual servo UID

// Create a UDP instance
WiFiUDP ntpUDP;

// Create an NTPClient instance for Philippine Time (UTC+8)
NTPClient timeClient(ntpUDP, "asia.pool.ntp.org", 28800, 10000);

// Create a Servo object
Servo myServo;
int servoPin = D4; // Use D4 (GPIO2) on the WeMos D1

// OneWire and DallasTemperature setup for DS18B20
#define ONE_WIRE_BUS D2 // Pin for DS18B20
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

// Variables
bool servoActivated = false; // Flag to track if the servo has been activated
bool apiSet = false; // Flag to indicate if API time has been set
String times[10]; // Array to store multiple times
int numTimes = 0; // Number of times fetched from the API

// MQ-137 setup
const int mq137Pin = A0; // Pin for MQ-137
float ammoniaLevel = 0; // Variable to store the ammonia level

// Create a WiFiClient instance
WiFiClient client;

void setup() {
  Serial.begin(115200);
  
  // Attempt to connect to Wi-Fi
  Serial.print("Connecting to Wi-Fi");
  WiFi.begin(ssid, password);
  int attempts = 0; // Track connection attempts
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {
    delay(1000);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println(" Connected!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP()); // Print the local IP address
    timeClient.begin(); // Initialize the NTP client
  } else {
    Serial.println(" Failed to connect to Wi-Fi! Check credentials.");
  }

  // Attach the servo to the pin
  myServo.attach(servoPin);

  // Start the DS18B20 sensor
  sensors.begin();
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    // Fetch the latest timing data from the server
    HTTPClient http;
    http.begin(client, apiUrl);
    int httpCode = http.GET();

    if (httpCode > 0) { // Check for successful HTTP response
      String payload = http.getString();
      DynamicJsonDocument doc(1024);
      deserializeJson(doc, payload);

      if (!apiSet) {
        serializeJson(doc, Serial); // Print full response for debugging
      }

      numTimes = doc["servoTimings"].size();
      for (int i = 0; i < numTimes; i++) {
        times[i] = doc["servoTimings"][i]["time"].as<String>();
        Serial.println("Set Time from API: " + times[i]);
      }

      apiSet = true; // Set the flag to indicate that the API time has been set
    } else {
      Serial.println("Error fetching data from API.");
    }

    http.end(); // Close the HTTP connection

    // Update time from NTP server
    timeClient.update();
    String currentTime = timeClient.getFormattedTime();
    Serial.print("Current Philippine Time: ");
    Serial.println(currentTime);

    // Check if the set time matches the current time
    for (int i = 0; i < numTimes; i++) {
      if (currentTime == times[i] && !servoActivated) {
        // Move the servo to 180 degrees, then return after 5 seconds
        myServo.write(360); // Set to 180 for one direction (e.g., clockwise)
        delay(5000); // Keep rotating for 5 seconds
        Serial.println("Servo activated! Position set to last angle.");
        servoActivated = true; // Set the flag to indicate that the servo has been activated
      } else if (currentTime != times[i]) {
        servoActivated = false; // Reset the flag if the time does not match
      }
    }

    // Read temperature from DS18B20
    sensors.requestTemperatures();
    float temperature = sensors.getTempCByIndex(0);
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.println(" °C");

    // Read ammonia level from MQ-137
    int mq137Value = analogRead(mq137Pin);
    // Convert the analog value to a meaningful ammonia level
    ammoniaLevel = mq137Value * (5.0 / 1023.0); // Assuming 5V reference
    Serial.print("Ammonia Level: ");
    Serial.println(ammoniaLevel);

  } else {
    Serial.println("Wi-Fi not connected. Servo action skipped.");
  }

  delay(1000); // Delay for 1 second before the next loop iteration
}
