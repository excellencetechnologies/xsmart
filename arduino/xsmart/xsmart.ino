#define ESP8266
// #define ESP32

#define ISACCESS 1
// #define ISSWITCH 1

#ifdef ESP8266
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>
#include <FS.h>
#include <ESP8266HTTPClient.h>

#define ESP_getChipId() (ESP.getChipId())
#endif

#ifdef ESP32
#include <WiFi.h>
#include <WiFiMulti.h>
#include <WebServer.h>
#include <ESPmDNS.h>
#include <HTTPClient.h>
#define ESP_getChipId() ((uint32_t)ESP.getEfuseMac())
#endif

#include <WebSocketClient.h>
#include <ArduinoJson.h>
#include <xconfig.h>
#include <ota.h>
#include <time.h>

XConfig xconfig = XConfig("/config.json");
OTA update = OTA();
#define WIFI_AP_MODE 1      //acts as access point
#define WIFI_CONNECT_MODE 2 //acts a normal wifi module

#ifdef ISSWITCH
const bool canWorkWithoutWifi = false; //i.e should device work without wifi e.g access control can work offline
#endif

#ifdef ISACCESS
const bool canWorkWithoutWifi = true; //i.e should device work without wifi e.g access control can work offline

#endif
//Compile the sketch (Ctrl+R) and then export the binary. (Ctrl+Alt+S)  Exporting the binary will generate an image file into the same folder
String version = "0.0.3";

//https://github.com/ArnieX/swifitch

#ifdef ESP8266
#define LEDPIN LED_BUILTIN
String webID = "ESP8266"; //this should be some no to identify device type. there should be different between switch/access
#ifdef ISACCESS
#include "MFRC522.h"
#include <access.h>
XAccess access = XAccess("/access.json");
#define RST_PIN D3                // RST-PIN for RC522 - RFID - SPI - Modul GPIO5
#define SS_PIN D0                 // SDA-PIN for RC522 - RFID - SPI - Modul GPIO4
MFRC522 mfrc522(SS_PIN, RST_PIN); // Create MFRC522 instance
const int PINS[] = {};            // these are pins from nodemcu we are using
const int PIN_SIZE = 0;
#define ACCESS_MODE_ADD_EMPLOYEE 0
#define ACCESS_MODE_READ 1
int access_mode = ACCESS_MODE_READ;
int access_mode_timeout = 0;
const int access_mode_timeout_max = 5000;
String emp_id = "";
#endif
#ifdef ISSWITCH
const int PINS[] = {5, 4, 2, 15}; // these are pins from nodemcu we are using
const int PIN_SIZE = 4;
#endif

const byte interruptPin = 19;
#endif

#ifdef ESP32
String webID = "ESP32"; //this should be some no to identify device type. there should be different between switch/access
#define LEDPIN 12
//this pint for lolin32 mini
const int PINS[] = {13, 15, 2, 4, 18, 23, 5}; // these are pins from nodemcu we are using
const int PIN_SIZE = 7;

const byte interruptPin = 19;
#endif

int delay_socket = 0;
const int delay_socket_max = 1000;
int current_wifi_status = WIFI_CONNECT_MODE;
int previous_wifi_status = current_wifi_status; //this used to detect change

char path[] = "/";
char host[] = "5.9.144.226";

WiFiClient client;               //this client is used to make tcp connection
WebSocketClient webSocketClient; // Use WiFiClient class to create TCP connections
#ifdef ESP32
WiFiMulti wifiMulti; // connecting to multiple wifi networks
WebServer server(80);
#endif

#ifdef ESP8266
ESP8266WiFiMulti wifiMulti;
ESP8266WebServer server(80);
#endif

String device_ssid = "xSmart-" + String(ESP_getChipId());

int PINS_STATUS[] = {LOW, LOW, LOW, LOW, LOW, LOW, LOW}; //default status of all pins

int delay_connect_wifi = 0;                                //this is delay after wifi connection, this is a variable because if wifi doesn't connect we try connection again after delay++ so its dynamic
const int max_delay_connect_wifi = delay_connect_wifi * 3; //this is the max time we try to connect.

int ping_packet_count = 0; //ping packet is also variable only after 10 times do we second another package
const int ping_packet_reset = 10;

int ok_ping_not_recieved_count = 0; //this is to check if we get back OK response of our ping, if not we do socket connection again.
const int ok_ping_not_recieved_count_max = 20;

volatile byte interruptCounter = 0;
unsigned long interruptMills = 0;
unsigned long interruptMillsMax = 500;

char *esp_ap_password = "123456789";

// IPAddress ip(192, 168, 4, 1);       // where xx is the desired IP Address
// IPAddress gateway(192, 168, 1, 254); // set gateway to match your wifi network
// IPAddress subnet(255, 255, 255, 0);  // set subnet mask to match your wifi network

int AP_STARTED = 0; //this is mainly used to set when AP mode is started because in loop, we cannot start ap again and again

void stopAP()
{
  WiFi.softAPdisconnect();
  delay(100);
  server.close();
  AP_STARTED = 0;
}
void startWifiAP()
{
  if (AP_STARTED == 0)
  {
    WiFi.mode(WIFI_AP_STA);
    AP_STARTED = 1;

    //  WiFi.config(ip, gateway, subnet);

    Serial.println(device_ssid);
    Serial.println("Configuring  access point for wifi network ...");
    char ap_ssid_array[device_ssid.length() + 1];
    device_ssid.toCharArray(ap_ssid_array, device_ssid.length() + 1);
    WiFi.softAP(ap_ssid_array, esp_ap_password);
    WiFi.waitForConnectResult();
    IPAddress accessIP = WiFi.softAPIP();
    Serial.print("ESP AccessPoint IP address: ");
    Serial.println(accessIP);
    if (!MDNS.begin("xsmart"))
    {
      Serial.println("Error setting up MDNS responder!");
    }

    server.on("/", HTTP_GET, []() {
      Serial.println("ping");

      StaticJsonBuffer<512> jsonBuffer;
      JsonObject &root = jsonBuffer.createObject();
      root["webid"] = webID;
      root["chip"] = device_ssid;
      root["version"] = version;
#ifdef ISACCESS
      root["type"] = "access";
#endif
#ifdef ISSWITCH
      root["type"] = "switch";
#endif

      JsonArray &pins = root.createNestedArray("pins");
      for (int i = 0; i < PIN_SIZE; i++)
      {
        JsonObject &pin = jsonBuffer.createObject();
        pin["pin"] = PINS[i];
        pin["status"] = PINS_STATUS[i];
        pins.add(pin);
      }

      String response = "";
      root.printTo(response);
      Serial.println(response);
      server.sendHeader("Access-Control-Allow-Origin", "*");
      server.sendHeader("Access-Control-Allow-Methods", "*");
      server.send(200, "application/json", response);
    });

    server.on("/wifi", HTTP_GET, []() {
      Serial.println("scan start");

      // WiFi.scanNetworks will return the number of networks found
      int n = WiFi.scanNetworks();
      Serial.println("scan done");
      StaticJsonBuffer<2000> jsonBuffer;
      JsonArray &root = jsonBuffer.createArray();
      if (n == 0)
      {
        Serial.println("no networks found");
      }
      else
      {
        Serial.print(n);
        Serial.println(" networks found");

        int max = 15;
        for (int i = 0; i < n; ++i)
        {
          JsonObject &wifi = jsonBuffer.createObject();
#ifdef ESP32
          String auth = (WiFi.encryptionType(i) == WIFI_AUTH_OPEN) ? "OPEN" : "AUTH";
#endif

#ifdef ESP8266
          String auth = (WiFi.encryptionType(i) == ENC_TYPE_NONE) ? "OPEN" : "AUTH";
#endif

          wifi["SSID"] = WiFi.SSID(i);
          wifi["RSSI"] = WiFi.RSSI(i);
          wifi["auth"] = auth;
          root.add(wifi);
          if (i > max)
          {
            break;
          }
          delay(10);
        }
      }
      String json = "";
      root.printTo(json);
      root.prettyPrintTo(Serial);
      server.sendHeader("Access-Control-Allow-Origin", "*");
      server.sendHeader("Access-Control-Allow-Methods", "*");
      server.send(200, "application/json", json);
    });

    server.on("/wifisave", HTTP_GET, []() {
      if (server.args() == 0)
        return server.send(500, "text/plain", "BAD ARGS");

      String ssid = server.arg("ssid");
      String password = server.arg("password");
      if (ssid.length() == 0)
        return server.send(500, "text/plain", "ssid empty");
      if (password.length() == 0)
        return server.send(500, "text/plain", "password empty");
      Serial.println("wifi save called");

      char ssid_array[ssid.length() + 1];
      char passsword_array[password.length() + 1];
      ssid.toCharArray(ssid_array, ssid.length() + 1);
      password.toCharArray(passsword_array, password.length() + 1);

      //check if wifi password valid
      StaticJsonBuffer<200> jsonBuffer;
      JsonObject &root = jsonBuffer.createObject();
      root["ssid"] = ssid;
      root["password"] = password;
      String response = "";
      root.printTo(response);
      server.sendHeader("Access-Control-Allow-Origin", "*");
      server.sendHeader("Access-Control-Allow-Methods", "*");
      server.send(200, "application/json", response);
      delay(1000);
      stopAP();
      WiFi.mode(WIFI_STA);
      delay(100);
      Serial.print(String(ssid_array));
      Serial.print(passsword_array);
      WiFi.begin(ssid_array, passsword_array);
      WiFi.waitForConnectResult();
      if (WiFi.status() == WL_CONNECTED)
      {
        Serial.println("connected");
        current_wifi_status = WIFI_CONNECT_MODE;
        xconfig.addWifiSSID(ssid, password);
        connectWifi();
      }
      else
      {
        Serial.println("non connected");
      }
    });
    server.onNotFound(handleNotFound);

    server.begin();
    Serial.println("HTTP server started");
    MDNS.addService("http", "tcp", 80);
  }
  else
  {
    Serial.print(WiFi.localIP());
    Serial.println("webserver..");
    int ledToggle = 0;
    int ledPinVal = HIGH;
    while (AP_STARTED == 1)
    {
      server.handleClient();
      yield();
      ledToggle++;
      if (ledToggle > 4000)
      {
        // Serial.print(".");

        if (ledPinVal == HIGH)
        {
          ledPinVal = LOW;
        }
        else
        {
          ledPinVal = HIGH;
        }
        // Serial.print(LEDPIN);
        // Serial.print(ledPinVal);
        digitalWrite(LEDPIN, ledPinVal);
        ledToggle = 0;
      }
      // delay(1);
    }
    Serial.println("ap while loop stopped");
  }
}

void stopWifi()
{
  WiFi.disconnect();
  //  WiFi.config(IPAddress(0, 0, 0, 0), IPAddress(0,0,0,0), IPAddress(0,0,0,0));
}
void connectWifi()
{
  WiFi.mode(WIFI_STA);
  delay(100);
  Serial.println();
  Serial.println();
  Serial.print("Connecting to wifi");

  //  WiFi.begin(ssid, password);

  Serial.println("saved wifi details in config");
  JsonObject &savedwifi = xconfig.getWifiSSID();
  Serial.print("found wifi saved");
  Serial.println(savedwifi.size());
  if (savedwifi.size() == 0)
  {
    Serial.println("switching to ap mode, since no wifi details found");
    current_wifi_status = WIFI_AP_MODE;
    return;
  }
  else
  {
    for (auto kv : savedwifi)
    {
      wifiMulti.addAP(kv.key, kv.value.as<char *>());
    }
  }

  int tries = 0;
  while (wifiMulti.run() != WL_CONNECTED && !canWorkWithoutWifi)
  {
    delay(500);
    Serial.print(".");
    //to handle interrupt here, because it gets stuck in loop for a long time
    if (current_wifi_status != WIFI_CONNECT_MODE)
    {
      Serial.print("stopped connecting to wifi due to interrupt");
      break;
    }
    tries++;
    if (tries > 100)
    {
      Serial.print("some issue with wifi");
      break;
    }
  }
  if (WiFi.status() == WL_CONNECTED)
  {
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
    // if(config.getDeviceTimezone() != 0){
    // configTime(xconfig.getDeviceTimezone(), 0, "pool.ntp.org", "time.nist.gov");
    // }else{
    configTime(5.5 * 60 * 60, 0, "pool.ntp.org", "time.nist.gov");
    // }
  }
  delay_connect_wifi = 5000;
  delay(delay_connect_wifi);
}

void handleNotFound()
{
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++)
  {
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
}

void forcePingPacket()
{
  ping_packet_count = 0;
  pingPacket();
}
void sendNamePack(String name)
{
  ping_packet_count = 0;
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();
  root["type"] = "device_set_name";
  root["stage"] = "success";
  root["WEBID"] = webID;
  root["version"] = version;
  root["chip"] = device_ssid;
  root["name"] = name;
  String json = "";
  root.printTo(json);
  Serial.println(json);
  webSocketClient.sendData(json);
  delay(10);
  ping_packet_count++;
}
void sendDeviceTime(char *time, String type)
{
  ping_packet_count = 0;
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();
  root["type"] = type;
  root["stage"] = "success";
  root["WEBID"] = webID;
  root["version"] = version;
  root["chip"] = device_ssid;
  root["data"] = time;
  String json = "";
  root.printTo(json);
  Serial.println(json);
  webSocketClient.sendData(json);
  delay(10);
  ping_packet_count++;
}
#ifdef ISACCESS
void sendAccessData(JsonObject &accessData)
{
  ping_packet_count = 0;
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();
  root["type"] = "device_set_list_employee";
  root["stage"] = "success";
  root["WEBID"] = webID;
  root["chip"] = device_ssid;
  String data = "";
  accessData.printTo(data);
  root["data"] = data;

  String json = "";
  root.printTo(json);
  Serial.println(json);
  webSocketClient.sendData(json);
  delay(10);
  ping_packet_count++;
}
void sendDisableAccess()
{
  ping_packet_count = 0;
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();
  root["type"] = "device_set_disable_employee";
  root["stage"] = "success";
  root["WEBID"] = webID;
  root["chip"] = device_ssid;

  String json = "";
  root.printTo(json);
  Serial.println(json);
  webSocketClient.sendData(json);
  delay(10);
  ping_packet_count++;
}
void sendEnableAccess()
{
  ping_packet_count = 0;
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();
  root["type"] = "device_set_enable_employee";
  root["stage"] = "success";
  root["WEBID"] = webID;
  root["chip"] = device_ssid;

  String json = "";
  root.printTo(json);
  Serial.println(json);
  webSocketClient.sendData(json);
  delay(10);
  ping_packet_count++;
}
void sendDeleteAccess()
{
  ping_packet_count = 0;
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();
  root["type"] = "device_set_delete_employee";
  root["stage"] = "success";
  root["WEBID"] = webID;
  root["chip"] = device_ssid;

  String json = "";
  root.printTo(json);
  Serial.println(json);
  webSocketClient.sendData(json);
  delay(10);
  ping_packet_count++;
}
void sendAccessMode()
{
  ping_packet_count = 0;
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();
  root["type"] = "device_set_add_employee";
  root["stage"] = "success";
  root["WEBID"] = webID;
  root["chip"] = device_ssid;

  String json = "";
  root.printTo(json);
  Serial.println(json);
  webSocketClient.sendData(json);
  delay(10);
  ping_packet_count++;
}
void sendCardDataAddEmployee(String rfid)
{
  access.addUID(rfid, emp_id);
  ping_packet_count = 0;
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();
  root["type"] = "device_set_add_employee";
  root["stage"] = "employee_add_success";
  root["WEBID"] = webID;
  root["chip"] = device_ssid;
  root["uid"] = rfid;
  root["emp_id"] = emp_id;

  String json = "";
  root.printTo(json);
  Serial.println(json);
  webSocketClient.sendData(json);
  delay(10);
  ping_packet_count++;
}
void sendCardDataAddEmployeeFailed(String message)
{
  ping_packet_count = 0;
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();
  root["type"] = "device_set_add_employee";
  root["stage"] = "employee_add_failed";
  root["WEBID"] = webID;
  root["chip"] = device_ssid;
  root["data"] = "-1";
  root["message"] = message;

  String json = "";
  root.printTo(json);
  Serial.println(json);
  webSocketClient.sendData(json);
  delay(10);
  ping_packet_count++;
}
void checkCardEmployee(String uid)
{
  String emp_id = access.checkUID(uid);
  if (emp_id.length() > 0)
  {
    bool is_disabled = access.isDisabled(emp_id);
    Serial.print("emp id");
    Serial.println(emp_id);
    Serial.println("emplyee disabled");
    Serial.print(is_disabled);
    ping_packet_count = 0;
    StaticJsonBuffer<200> jsonBuffer;
    JsonObject &root = jsonBuffer.createObject();
    root["type"] = "device_card_read";
    root["WEBID"] = webID;
    root["chip"] = device_ssid;
    root["uid"] = uid;
    root["emp_id"] = emp_id;

    time_t now = time(nullptr);
    struct tm *p = localtime(&now);
    char s[1000];
    strftime(s, 1000, "%X-%x", p);
    Serial.print(s);
    root["time"] = s;

    access.writeTimeData(device_ssid + "=" + uid + "=" + emp_id + "=" + s);

    String json = "";
    root.printTo(json);
    Serial.println(json);
    webSocketClient.sendData(json);
    delay(10);
    ping_packet_count++;
  }
  else
  {
    Serial.println("not match found");
  }
}
#endif
#ifdef ISSWITCH
// void sendPinNamePack()
// {
//   ping_packet_count = 0;
//   StaticJsonBuffer<500> jsonBuffer;
//   JsonObject &root = jsonBuffer.createObject();
//   root["type"] = "device_set_pin_name";
//   root["stage"] = "success";
//   root["WEBID"] = webID;
//   root["chip"] = device_ssid;

//   JsonArray &pins = root.createNestedArray("PINS");

//   StaticJsonBuffer<200> jsonBuffer5;
//   for (int i = 0; i < PIN_SIZE; i++)
//   {
//     // String pin_name = xconfig.getPinName(PINS[i]);
//     if (pin_name.length() > 0)
//     {
//       JsonObject &pin = jsonBuffer5.createObject();
//       pin["pin"] = PINS[i];
//       pin["status"] = PINS_STATUS[i];
//       // pin["name"] = pin_name;
//       pins.add(pin);
//     }
//   }

//   String json = "";
//   root.printTo(json);
//   Serial.println(json);
//   webSocketClient.sendData(json);
//   delay(10);
//   ping_packet_count++;
// }
void sendBulkIOPack()
{
  ping_packet_count = 0;
  StaticJsonBuffer<500> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();
  root["type"] = "device_bulk_pin_oper";
  root["stage"] = "success";
  root["WEBID"] = webID;
  root["chip"] = device_ssid;

  JsonArray &pins = root.createNestedArray("PINS");

  StaticJsonBuffer<200> jsonBuffer5;
  for (int i = 0; i < PIN_SIZE; i++)
  {
    JsonObject &pin = jsonBuffer5.createObject();
    pin["pin"] = PINS[i];
    pin["status"] = PINS_STATUS[i];
    pins.add(pin);
  }

  String json = "";
  root.printTo(json);
  Serial.println(json);
  webSocketClient.sendData(json);
  delay(10);
  ping_packet_count++;
}
void sendIOPack(int pin, int status)
{
  ping_packet_count = 0;
  StaticJsonBuffer<200> jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();
  root["type"] = "device_pin_oper";
  root["stage"] = "success";
  root["WEBID"] = webID;
  root["version"] = version;
  root["chip"] = device_ssid;
  root["pin"] = pin;
  root["status"] = status;
  String json = "";
  root.printTo(json);
  Serial.println(json);
  webSocketClient.sendData(json);
  delay(10);
  ping_packet_count++;
}
#endif
void pingPacket()
{
  if (ping_packet_count == 0)
  {
    StaticJsonBuffer<500> jsonBuffer;
    JsonObject &root = jsonBuffer.createObject();
    root["type"] = "device_ping";
    root["WEBID"] = webID;
    root["version"] = version;
    root["chip"] = device_ssid;
    time_t now = time(nullptr);
    struct tm *p = localtime(&now);
    char s[1000];
    strftime(s, 1000, "%c", p);
    root["deviceTime"] = s;
#ifdef ISACCESS
    root["device_type"] = "access";
#endif
#ifdef ISSWITCH
    root["device_type"] = "switch";
#endif
    JsonArray &pins = root.createNestedArray("PINS");

    StaticJsonBuffer<512> jsonBuffer5;
    for (int i = 0; i < PIN_SIZE; i++)
    {
      JsonObject &pin = jsonBuffer5.createObject();
      pin["pin"] = PINS[i];
      pin["status"] = PINS_STATUS[i];
      // pin["name"] = xconfig.getPinName(PINS[i]);
      pins.add(pin);
    }

    String response = "";
    root.printTo(response);
    Serial.println(response);
    webSocketClient.sendData(response);
    delay(10);
    ping_packet_count++;
  }
  else
  {
    ping_packet_count++;
    if (ping_packet_count > ping_packet_reset)
    {
      ping_packet_count = 0;
    }
  }
}
void connectSocket()
{

  // Connect to the websocket server
  if (client.connect(host, 9030))
  {
    Serial.println("Connected");
    // Handshake with the server
    webSocketClient.path = path;
    webSocketClient.host = host;
    if (webSocketClient.handshake(client))
    {
      Serial.println("Handshake successful");
      pingPacket();
    }
    else
    {
      Serial.println("Handshake failed.");
    }
  }
  else
  {
    Serial.println("Connection failed.");
  }
}

void pinWrite(int pin_no, int pin_mode)
{
  digitalWrite(pin_no, pin_mode);
  delay(50);
  StaticJsonBuffer<1000> jsonBuffer;
  JsonArray &root = jsonBuffer.createArray();
  for (int i = 0; i < PIN_SIZE; i++)
  {
    if (PINS[i] == pin_no)
    {
      PINS_STATUS[i] = pin_mode;
    }
    JsonObject &pin = jsonBuffer.createObject();
    pin["pin"] = PINS[i];
    pin["status"] = PINS_STATUS[i];
    root.add(pin);
  }

  xconfig.setPinConfig(root);
}
void initIOPins()
{
  for (int i = 0; i < PIN_SIZE; i++)
  {
    pinMode(PINS[i], OUTPUT);
  }

  JsonArray &pins = xconfig.getPinConfig();
  if (pins.size() > 0)
  {
    for (int i = 0; i < pins.size(); i++)
    {
      JsonObject &obj = pins[i].as<JsonObject>();
      PINS_STATUS[i] = obj.get<int>("status");
      digitalWrite(obj.get<int>("pin"), obj.get<int>("status"));
    }
  }
  else
  {
    //one new device no pins will be set
    for (int i = 0; i < PIN_SIZE; i++)
    {
      pinWrite(PINS[i], PINS_STATUS[i]); // on new device setting all pins to low
    }
  }
}

void highIOPins()
{
  for (int i = 0; i < PIN_SIZE; i++)
  {
    pinWrite(PINS[i], HIGH);
  }
}
void lowIOPins()
{
  for (int i = 0; i < PIN_SIZE; i++)
  {
    pinWrite(PINS[i], LOW);
  }
}

void handleInterrupt()
{
  if (interruptCounter == 0)
  {
    interruptCounter = 1;
    interruptMills = millis();
    Serial.println("interrupt");
    Serial.println(interruptMills);
    Serial.println("***");
  }
  else
  {
    interruptCounter = 0;
    Serial.println("interrupt end");
    Serial.println(millis() - interruptMills);
    if (millis() - interruptMills > interruptMillsMax)
    {
      if (current_wifi_status == WIFI_CONNECT_MODE)
      {
        Serial.println("set ap mode");
        current_wifi_status = WIFI_AP_MODE;
      }
      else
      {
        current_wifi_status = WIFI_CONNECT_MODE;
        Serial.println("set wifi mode");
        AP_STARTED = 0; // so that it comes out of the while loop
      }
    }
    else if (millis() - interruptMills > 5000)
    {
      ESP.restart();
    }
  }
}

void detectInterruptChange()
{
  if (previous_wifi_status != current_wifi_status)
  {
    if (current_wifi_status == WIFI_AP_MODE)
    {
      Serial.println("detect ap mode");
      previous_wifi_status = WIFI_AP_MODE;
      stopWifi();
    }
    else
    {
      current_wifi_status = WIFI_CONNECT_MODE;
      previous_wifi_status = WIFI_CONNECT_MODE;
      Serial.println("detect connect mode");
      stopAP();
    }
  }
}
void setup()
{
  Serial.begin(115200);
  delay(10);

#ifdef ISACCESS
  SPI.begin();        // Init SPI bus
  mfrc522.PCD_Init(); // Init MFRC522
  mfrc522.PCD_SetAntennaGain(mfrc522.RxGain_max);
  access.initConfig();
#endif
  pinMode(LEDPIN, OUTPUT);
  digitalWrite(LEDPIN, LOW);
  xconfig.initConfig();
  // xconfig.deletePinConfig(); //only if we change pins

  // Serial.println(xconfig.getPinName(5));

  // Serial.println("device name");
  // Serial.println(xconfig.getNickName());

  pinMode(interruptPin, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(interruptPin), handleInterrupt, CHANGE);

  initIOPins();
  // playIOPins(); //not used anymore
}

void loop()
{
  detectInterruptChange();
#ifdef ISACCESS
  // Look for new cards
  if (access_mode == ACCESS_MODE_READ)
  {
    if (mfrc522.PICC_IsNewCardPresent())
    {
      if (mfrc522.PICC_ReadCardSerial())
      {
        // Show some details of the PICC (that is: the tag/card)
        Serial.print(F("read Card UID:"));
        String rfid = dump_byte_array(mfrc522.uid.uidByte, mfrc522.uid.size);
        checkCardEmployee(rfid);
        delay(1000); //wait after card is found. to remove repeated
      }
    }
  }
  else if (access_mode == ACCESS_MODE_ADD_EMPLOYEE)
  {
    Serial.println("access model waiting for add employee");
    if (mfrc522.PICC_IsNewCardPresent())
    {
      if (mfrc522.PICC_ReadCardSerial())
      {
        // Show some details of the PICC (that is: the tag/card)
        Serial.print(F("adding new  Card UID:"));
        String rfid = dump_byte_array(mfrc522.uid.uidByte, mfrc522.uid.size);
        String emp_id = access.checkUID(rfid);
        if (emp_id.length() > 0)
        {
          sendCardDataAddEmployeeFailed("card already assigned to employee" + emp_id);
          Serial.println("card already assigned to employeee: " + emp_id);
          access_mode = ACCESS_MODE_READ;
        }
        else
        {
          sendCardDataAddEmployee(rfid);
        }

        access_mode = ACCESS_MODE_READ;
      }
    }
    if (access_mode_timeout < access_mode_timeout_max)
    {
      access_mode_timeout++;
      // delay(1);
    }
    else
    {
      sendCardDataAddEmployeeFailed("timeout");
      access_mode = ACCESS_MODE_READ;
    }
  }
  else
  {
    Serial.print("invalid access code status");
  }

#endif

  if (current_wifi_status == WIFI_CONNECT_MODE)
  {
    String data;
    if (WiFi.status() != WL_CONNECTED)
    {

      digitalWrite(LEDPIN, LOW);

      if (canWorkWithoutWifi)
      {
        if (delay_socket < max_delay_connect_wifi * 10)
        {
          delay_socket++;
          // delay(1);
          return;
        }
        else
        {
          Serial.println("wifi disconnected, connecting again.");
          connectWifi();
        }
      }
      else
      {
        Serial.println("wifi disconnected, connecting again.");

        if (delay_connect_wifi < max_delay_connect_wifi)
        {
          delay_connect_wifi += delay_connect_wifi;
        }
        Serial.print("some issue with wifi trying again in ");
        Serial.println(delay_connect_wifi);
        delay(delay_connect_wifi);
        connectWifi();
      }
    }
    else
    {

      digitalWrite(LEDPIN, HIGH);
      if (client.connected())
      {

#ifdef ISACCESS
        //in access card mode, we want to keep checking for access instantly
        //but socket io should only work every 1sec
        if (delay_socket < delay_socket_max / 10)
        {
          delay_socket++;
          // delay(1);
          // Serial.print(delay_socket);
          // Serial.print(" ");
          return;
        }
        else
        {
          delay_socket = 0;
        }
#endif

#ifdef ISACCESS

        String access_data = access.readTimeData();
        if (access_data.length() > 0)
        {
          Serial.println(access_data);

          HTTPClient http; //Declare object of class HTTPClient

          http.begin("http://5.9.144.226:9030/card/addTime"); //Specify request destination
          http.addHeader("Content-Type", "application/x-www-form-urlencoded");

          int httpCode = http.POST(access_data); //Send the request
          String payload = http.getString();     //Get the response payload

          Serial.println(httpCode); //Print HTTP return code
          Serial.println(payload);  //Print request response payload
          if (httpCode == 200)
          {
            access.deleteTimeData();
          }
          access_data = "";
          http.end(); //Close connection
        }

#endif

        webSocketClient.getData(data);

        if (data.length() > 0)
        {
          StaticJsonBuffer<512> jsonBuffer;
          JsonObject &root = jsonBuffer.parseObject(data);
          Serial.println("data from socket");
          root.printTo(Serial);
          String type = root["type"];

          if (type == "device_set_time")
          {
            int diff = root.get<int>("diff");
            xconfig.setDeviceTimezone(diff);
            configTime(xconfig.getDeviceTimezone(), 0, "pool.ntp.org", "time.nist.gov");
            time_t now = time(nullptr);
            Serial.println(ctime(&now));
            sendDeviceTime(ctime(&now), "device_set_time");
          }
          else if (type == "device_get_time")
          {
            time_t now = time(nullptr);
            Serial.println(ctime(&now));
            configTime(0, 0, "pool.ntp.org", "time.nist.gov");
            sendDeviceTime(ctime(&now), "device_get_time");
          }
          else if (type == "OK")
          {
            // if(root.get<String>("ota").length() > 0){
            //   update.checkUpdate(root.get<String>("ota"));
            // }
            ok_ping_not_recieved_count = 0;
          }

#ifdef ISSWITCH
          if (type == "device_pin_oper")
          {
            if (root["status"] == "HIGH")
            {
              int pin = root["pin"];
              Serial.println("setting hight");
              pinWrite(pin, HIGH);
              delay(10);
              sendIOPack(pin, 1);
            }
            else if (root["status"] == "LOW")
            {
              int pin = root["pin"];
              Serial.println("setting low");
              pinWrite(pin, LOW);
              delay(10);
              sendIOPack(pin, 0);
            }
          }

          else if (type == "device_bulk_pin_oper")
          {
            JsonArray &pins = root["switches"].as<JsonArray>();
            for (int i = 0; i < pins.size(); i++)
            {
              JsonObject &obj = pins[i].as<JsonObject>();
              pinWrite(obj.get<int>("pin"), obj.get<int>("status"));
            }
            sendBulkIOPack();
          }
          // else if (type == "device_set_pin_name")
          // {
          //   xconfig.setPinName(root.get<int>("pin"), root.get<String>("name"));
          //   sendPinNamePack();
          // }
#endif
#ifdef ISACCESS
          if (type == "device_set_add_employee")
          {
            access_mode = ACCESS_MODE_ADD_EMPLOYEE;
            emp_id = root.get<String>("emp_id");
            sendAccessMode();
          }
          else if (type == "device_set_delete_employee")
          {
            emp_id = root.get<String>("emp_id");
            access.deleteUID(emp_id);
            sendDeleteAccess();
          }
          else if (type == "device_set_disable_employee")
          {
            emp_id = root.get<String>("emp_id");
            access.disableUID(emp_id);
            sendDisableAccess();
          }
          else if (type == "device_set_enable_employee")
          {
            emp_id = root.get<String>("emp_id");
            access.enableUID(emp_id);
            sendEnableAccess();
          }
          else if (type == "device_set_list_employee")
          {
            JsonObject &root = access.listData();
            sendAccessData(root);
          }
#endif
          data = "";
        }
        else
        {
          pingPacket();
          ok_ping_not_recieved_count++;

          if (ok_ping_not_recieved_count > ok_ping_not_recieved_count_max)
          {
            Serial.println("websocket not responding.");
            ok_ping_not_recieved_count = 0;
            connectSocket();
          }
        }
      }
      else
      {
        Serial.println("websocket disconnected.");
        connectSocket();
      }
    }

    // wait to fully let the client disconnect
  }
  else
  {

    startWifiAP();
  }
#ifdef ISSWITCH
  delay(1000);
#endif
}

// Helper routine to dump a byte array as hex values to Serial
String dump_byte_array(byte *buffer, byte bufferSize)
{
  String rfid = "";
  for (byte i = 0; i < bufferSize; i++)
  {
    rfid += buffer[i] < 0x10 ? " 0" : "";
    rfid += String(buffer[i], HEX);
  }
  Serial.println(rfid);
  return rfid;
}
