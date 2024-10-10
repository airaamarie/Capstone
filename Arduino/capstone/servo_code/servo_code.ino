#include <ESP8266WiFi.h>           // Include the WiFi library
#include <WiFiUdp.h>               // Include the WiFiUDP library
#include <NTPClient.h>             // Include the NTPClient library
#include <Servo.h>                 // Include the Servo library
#include <ESP8266HTTPClient.h>     // Include the HTTP client library

// Wi-Fi credentials
const char* ssid = "KIETH 2462";  // Replace with your WiFi SSID
const char* password = "123456789";     // Replace with your WiFi Password

// API URL for fetching servo timing data
const char* apiUrl = "http://192.168.68.112/Capstone/iot_api/servo_timing.php?servo_uid=123";  // Replace with actual servo UID

// Create a UDP instance
WiFiUDP ntpUDP;

// Create an NTPClient instance for Philippine Time (UTC+8)
NTPClient timeClient(ntpUDP, "pool.ntp.org", 28800, 60000);

// Create a Servo object
Servo myServo;
int servoPin = D4;  // Use D4 (GPIO2) on the WeMos D1

// Variables
String setTime = "";
bool servoActivated = false;  // Flag to track if the servo has been activated
String servo_uid = "123";     // Unique identifier for the servo (varchar-like)
bool apiSet = false;          // Flag to indicate if API time has been set

// Create a WiFiClient instance
WiFiClient client;

void setup() {
  Serial.begin(115200);
  
  // Attempt to connect to Wi-Fi
  Serial.print("Connecting to Wi-Fi");
  WiFi.begin(ssid, password);
  int attempts = 0;  // Track connection attempts
  while (WiFi.status() != WL_CONNECTED && attempts < 20) {  // Limit attempts to prevent an infinite loop
    delay(1000);
    Serial.print(".");
    attempts++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println(" Connected!");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());  // Print the local IP address
    timeClient.begin();  // Initialize the NTP client
  } else {
    Serial.println(" Failed to connect to Wi-Fi! Check credentials.");
  }

  // Attach the servo to the pin
  myServo.attach(servoPin);
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    // Fetch the latest timing data from the server
    HTTPClient http;
    http.begin(client, apiUrl);  // Initialize the HTTP connection with the WiFiClient and API URL
    int httpCode = http.GET();  // Send the GET request

    if (httpCode > 0) {  // Check for successful HTTP response
      String payload = http.getString();
      
      // Print API response only if it hasn't been set yet
      if (!apiSet) {
        Serial.println("API Response: " + payload);  // Print full response for debugging
      }

      // Parse the API response to extract timing data
      if (payload.indexOf("time\":\"") >= 0) {  // Check if the time field exists
        int timeIndex = payload.indexOf("time\":\"") + 7;
        setTime = payload.substring(timeIndex, timeIndex + 8);  // Extract time (HH:MM:SS)
        Serial.println("Set Time from API: " + setTime);
        apiSet = true;  // Set the flag to indicate that the API time has been set
      } else {
        Serial.println("Time not found in API response.");
      }
    } else {
      Serial.println("Error fetching data from API.");
    }
    
    http.end();  // Close the HTTP connection
    
    // Update time from NTP server
    timeClient.update();
    
    // Display the current time in HH:MM:SS format every second
    String currentTime = timeClient.getFormattedTime();
    Serial.print("Current Philippine Time: ");
    Serial.println(currentTime);

    // Debugging: Compare times
    Serial.print("Comparing times. Set Time: ");
    Serial.println(setTime);
    Serial.print("Current Time: ");
    Serial.println(currentTime);

    // Check if the set time matches the current time
    if (currentTime == setTime) {
      // Move the servo to 180 degrees, then return after 5 seconds
      myServo.write(180);
      delay(5000);  // Wait for 5 seconds while the servo is at 180 degrees
      myServo.write(0);  // Move the servo back to 0 degrees
      delay(1000);  // Wait for 1 second
      Serial.println("Servo activated!");
    }
  } else {
    Serial.println("Wi-Fi not connected. Servo action skipped.");
  }

  delay(1000);  // Delay for 1 second before the next loop iteration
}
